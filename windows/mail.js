'use strict';
/* ============================================================
   Hamama — moteur mail (processus principal)
   IMAP : imapflow · SMTP : nodemailer · analyse : mailparser
   ============================================================ */
const fs = require('fs');
const path = require('path');
const dns = require('dns').promises;
const crypto = require('crypto');
const { ImapFlow } = require('imapflow');
const nodemailer = require('nodemailer');
const MailComposer = require('nodemailer/lib/mail-composer');
const { simpleParser } = require('mailparser');
const iconv = require('iconv-lite');

let DIR = null, SAFE = null, NET = null, OAUTH = null;
let ACCOUNTS = [];
const conns = new Map();      // id -> ImapFlow (opérations)
const watchers = new Map();   // id -> { client, timer }
const attCache = new Map();   // clé -> { filename, contentType, content }
let onEvent = () => {};

/* ---------------- Fournisseurs connus ---------------- */
const P = (ih, ip, is, sh, sp, ss, extra = {}) => ({ imap: { host: ih, port: ip, secure: is }, smtp: { host: sh, port: sp, secure: ss }, ...extra });
const PROVIDERS = {
  gmail:   { label: 'Gmail', ...P('imap.gmail.com', 993, true, 'smtp.gmail.com', 465, true, { saveSent: false, appPassword: 'https://myaccount.google.com/apppasswords', oauth: 'google' }) },
  outlook: { label: 'Outlook / Hotmail', ...P('outlook.office365.com', 993, true, 'smtp-mail.outlook.com', 587, false, { saveSent: false, oauth: 'microsoft' }) },
  icloud:  { label: 'iCloud', ...P('imap.mail.me.com', 993, true, 'smtp.mail.me.com', 587, false, { appPassword: 'https://account.apple.com/account/manage', userLocal: false }) },
  yahoo:   { label: 'Yahoo', ...P('imap.mail.yahoo.com', 993, true, 'smtp.mail.yahoo.com', 465, true, { appPassword: 'https://login.yahoo.com/account/security' }) },
  orange:  { label: 'Orange', ...P('imap.orange.fr', 993, true, 'smtp.orange.fr', 465, true) },
  free:    { label: 'Free', ...P('imap.free.fr', 993, true, 'smtp.free.fr', 465, true) },
  sfr:     { label: 'SFR', ...P('imap.sfr.fr', 993, true, 'smtp.sfr.fr', 465, true) },
  laposte: { label: 'La Poste', ...P('imap.laposte.net', 993, true, 'smtp.laposte.net', 465, true) },
  gmx:     { label: 'GMX', ...P('imap.gmx.com', 993, true, 'mail.gmx.com', 587, false) },
  ovh:     { label: 'OVH', ...P('ssl0.ovh.net', 993, true, 'ssl0.ovh.net', 465, true) },
  proton:  { label: 'Proton Mail (Bridge)', ...P('127.0.0.1', 1143, false, '127.0.0.1', 1025, false) },
};
const DOMAINS = {
  gmail: ['gmail.com', 'googlemail.com'],
  outlook: ['outlook.com', 'outlook.fr', 'hotmail.com', 'hotmail.fr', 'live.com', 'live.fr', 'msn.com'],
  icloud: ['icloud.com', 'me.com', 'mac.com'],
  yahoo: ['yahoo.com', 'yahoo.fr', 'ymail.com'],
  orange: ['orange.fr', 'wanadoo.fr'],
  free: ['free.fr'],
  sfr: ['sfr.fr', 'neuf.fr', 'club-internet.fr'],
  laposte: ['laposte.net'],
  gmx: ['gmx.com', 'gmx.fr', 'gmx.net'],
};

async function detect(email) {
  const domain = String(email || '').split('@')[1];
  if (!domain) throw new Error('Adresse invalide');
  const d = domain.toLowerCase();
  for (const [k, list] of Object.entries(DOMAINS)) if (list.includes(d)) return { provider: k, ...PROVIDERS[k], source: 'connu' };
  // 1) Base Mozilla (ISPDB) — la même que Thunderbird
  try {
    const r = await (NET || fetch)(`https://autoconfig.thunderbird.net/v1.1/${encodeURIComponent(d)}`);
    if (r.ok) { const x = parseAutoconfig(await r.text(), email); if (x) return { provider: 'auto', ...x, source: 'Mozilla' }; }
  } catch {}
  // 2) Serveurs MX : domaine hébergé chez Google / Microsoft / OVH…
  try {
    const mx = (await dns.resolveMx(d)).map(m => m.exchange.toLowerCase()).join(' ');
    if (/google|googlemail/.test(mx)) return { provider: 'gmail', ...PROVIDERS.gmail, source: 'MX' };
    if (/outlook|protection\.outlook/.test(mx)) return { provider: 'outlook', ...PROVIDERS.outlook, source: 'MX' };
    if (/ovh\.net/.test(mx)) return { provider: 'ovh', ...PROVIDERS.ovh, source: 'MX' };
    if (/icloud|me\.com/.test(mx)) return { provider: 'icloud', ...PROVIDERS.icloud, source: 'MX' };
  } catch {}
  // 3) Devinette classique
  return { provider: 'autre', ...P('imap.' + d, 993, true, 'smtp.' + d, 465, true), source: 'devinette' };
}
function parseAutoconfig(xml, email) {
  const block = (tag, type) => { const m = xml.match(new RegExp(`<${tag}[^>]*type="${type}"[^>]*>([\\s\\S]*?)</${tag}>`, 'i')); return m && m[1]; };
  const val = (b, t) => { const m = b && b.match(new RegExp(`<${t}>([^<]*)</${t}>`, 'i')); return m ? m[1].trim() : ''; };
  const i = block('incomingServer', 'imap'), o = block('outgoingServer', 'smtp');
  if (!i || !o) return null;
  const [local, dom] = email.split('@');
  const sub = s => s.replace('%EMAILADDRESS%', email).replace('%EMAILLOCALPART%', local).replace('%EMAILDOMAIN%', dom);
  const ip = +val(i, 'port') || 993, op = +val(o, 'port') || 465;
  return {
    imap: { host: sub(val(i, 'hostname')), port: ip, secure: val(i, 'socketType').toUpperCase() === 'SSL' },
    smtp: { host: sub(val(o, 'hostname')), port: op, secure: val(o, 'socketType').toUpperCase() === 'SSL' },
    userName: sub(val(i, 'username') || '%EMAILADDRESS%'),
  };
}

/* ---------------- Stockage chiffré des comptes ---------------- */
const accFile = () => path.join(DIR, 'accounts.json');
const enc = s => SAFE && SAFE.isEncryptionAvailable() ? 'v1:' + SAFE.encryptString(String(s)).toString('base64') : 'v0:' + Buffer.from(String(s)).toString('base64');
const dec = s => { if (!s) return ''; if (s.startsWith('v1:')) return SAFE.decryptString(Buffer.from(s.slice(3), 'base64')); if (s.startsWith('v0:')) return Buffer.from(s.slice(3), 'base64').toString(); return ''; };
function load() { try { ACCOUNTS = JSON.parse(fs.readFileSync(accFile(), 'utf8')); } catch { ACCOUNTS = []; } }
function save() { fs.mkdirSync(DIR, { recursive: true }); fs.writeFileSync(accFile() + '.tmp', JSON.stringify(ACCOUNTS, null, 1)); fs.renameSync(accFile() + '.tmp', accFile()); }
const pub = a => ({ id: a.id, email: a.email, name: a.name, label: a.label, color: a.color, provider: a.provider, signature: a.signature || '', imap: a.imap, smtp: a.smtp, user: a.user, saveSent: a.saveSent !== false, oauth: !!a.oauth });
const acc = id => { const a = ACCOUNTS.find(x => x.id === id); if (!a) throw new Error('Compte introuvable'); return a; };

async function authOf(a) {
  if (a.oauth) { const t = await OAUTH.token(a); return { imap: { user: a.user, accessToken: t }, smtp: { type: 'OAuth2', user: a.user, accessToken: t } }; }
  const pass = dec(a.passEnc);
  return { imap: { user: a.user, pass }, smtp: { user: a.user, pass } };
}
const imapOpts = (cfg, auth) => ({
  host: cfg.imap.host, port: +cfg.imap.port, secure: !!cfg.imap.secure, auth,
  logger: false, emitLogs: false, connectionTimeout: 20000, greetingTimeout: 15000, socketTimeout: 5 * 60000,
  tls: { rejectUnauthorized: !cfg.insecure }, clientInfo: { name: 'Hamama', vendor: 'Kurylen' }
});
const smtpOpts = (cfg, auth) => ({
  host: cfg.smtp.host, port: +cfg.smtp.port, secure: !!cfg.smtp.secure, auth,
  requireTLS: !cfg.smtp.secure && !cfg.insecure, connectionTimeout: 20000, tls: { rejectUnauthorized: !cfg.insecure }
});

function frErr(e) {
  const m = String(e && (e.responseText || e.response || e.message) || e);
  if (/AUTHENTICATIONFAILED|Invalid credentials|authentication failed|535|LOGIN failed|Username and Password not accepted|AUTH/i.test(m)) return 'Identifiant ou mot de passe refusé. Pour Gmail, iCloud et Yahoo il faut un « mot de passe d’application ».';
  if (/ENOTFOUND|EAI_AGAIN/.test(m)) return 'Serveur introuvable (vérifie l’adresse du serveur ou ta connexion Internet).';
  if (/ECONNREFUSED/.test(m)) return 'Le serveur refuse la connexion (port incorrect ?).';
  if (/ETIMEDOUT|timeout/i.test(m)) return 'Le serveur ne répond pas (délai dépassé).';
  if (/certificate|self.signed|CERT_/i.test(m)) return 'Certificat de sécurité du serveur invalide.';
  if (/BasicAuthBlocked|basic auth/i.test(m)) return 'Ce fournisseur exige la connexion sécurisée (OAuth).';
  return m.slice(0, 300);
}

async function test(cfg) {
  const auth = cfg.oauth ? await authOf(cfg) : { imap: { user: cfg.user, pass: cfg.pass }, smtp: { user: cfg.user, pass: cfg.pass } };
  const c = new ImapFlow(imapOpts(cfg, auth.imap));
  c.on('error', () => {});
  try { await c.connect(); await c.logout(); }
  catch (e) { try { c.close(); } catch {} return { ok: false, step: 'imap', err: frErr(e) }; }
  const t = nodemailer.createTransport(smtpOpts(cfg, auth.smtp));
  try { await t.verify(); } catch (e) { return { ok: false, step: 'smtp', err: frErr(e) }; } finally { t.close(); }
  return { ok: true };
}
async function add(cfg) {
  const a = {
    id: 'a' + crypto.randomBytes(5).toString('hex'), email: cfg.email.trim(), name: (cfg.name || '').trim(), label: (cfg.label || '').trim(),
    color: cfg.color || null, provider: cfg.provider || 'autre', imap: cfg.imap, smtp: cfg.smtp, user: (cfg.user || cfg.email).trim(),
    passEnc: cfg.pass ? enc(cfg.pass) : '', oauth: cfg.oauth || null, signature: cfg.signature || '', saveSent: cfg.saveSent !== false, insecure: !!cfg.insecure
  };
  if (a.oauth && a.oauth.refresh) a.oauth = { provider: a.oauth.provider, refreshEnc: enc(a.oauth.refresh) };
  ACCOUNTS.push(a); save(); startWatch(a);
  return pub(a);
}
function update(id, patch) {
  const a = acc(id);
  for (const k of ['name', 'label', 'color', 'signature', 'saveSent', 'imap', 'smtp', 'user']) if (k in patch) a[k] = patch[k];
  if (patch.pass) a.passEnc = enc(patch.pass);
  if (patch.order != null) { ACCOUNTS.splice(ACCOUNTS.indexOf(a), 1); ACCOUNTS.splice(Math.max(0, Math.min(ACCOUNTS.length, patch.order)), 0, a); }
  save();
  if (patch.pass || patch.imap || patch.user) { dropConn(id); stopWatch(id); startWatch(a); }
  return pub(a);
}
function remove(id) {
  dropConn(id); stopWatch(id);
  ACCOUNTS = ACCOUNTS.filter(a => a.id !== id); save();
  try { fs.rmSync(path.join(DIR, 'cache', id + '.json'), { force: true }); } catch {}
  return true;
}

/* ---------------- Connexions IMAP ---------------- */
function dropConn(id) { const c = conns.get(id); conns.delete(id); if (c) { c.then(x => { try { x.logout().catch(() => x.close()); } catch {} }).catch(() => {}); } }
function client(id) {
  const ex = conns.get(id);
  if (ex) return ex.then(c => c.usable ? c : (conns.delete(id), client(id)));
  const a = acc(id);
  const p = (async () => {
    const c = new ImapFlow(imapOpts(a, (await authOf(a)).imap));
    c.on('error', () => {});
    c.on('close', () => { if (conns.get(id) === p) conns.delete(id); });
    await c.connect();
    return c;
  })();
  conns.set(id, p);
  p.catch(() => { if (conns.get(id) === p) conns.delete(id); });
  return p;
}
async function withBox(id, box, fn, retry = true) {
  let c;
  try { c = await client(id); } catch (e) { throw new Error(frErr(e)); }
  let lock;
  try { lock = await c.getMailboxLock(box); }
  catch (e) {
    if (retry && !c.usable) { conns.delete(id); return withBox(id, box, fn, false); }
    throw new Error(frErr(e));
  }
  try { return await fn(c); }
  catch (e) { if (retry && !c.usable) { lock.release(); lock = null; conns.delete(id); return withBox(id, box, fn, false); } throw e; }
  finally { if (lock) lock.release(); }
}

/* ---------------- Dossiers ---------------- */
const SPECIAL = { '\\Inbox': ['inbox', 'Boîte de réception', 0], '\\Drafts': ['drafts', 'Brouillons', 2], '\\Sent': ['sent', 'Envoyés', 3], '\\Archive': ['archive', 'Archives', 4], '\\All': ['all', 'Tous les messages', 5], '\\Flagged': ['flagged', 'Suivis', 1], '\\Junk': ['junk', 'Indésirables', 6], '\\Trash': ['trash', 'Corbeille', 7] };
const GUESS = [[/^(inbox)$/i, '\\Inbox'], [/^(sent|sent items|sent messages|envoy[ée]s|[ée]l[ée]ments envoy[ée]s|messages envoy[ée]s|outbox)$/i, '\\Sent'], [/^(drafts?|brouillons?)$/i, '\\Drafts'], [/^(trash|deleted|deleted items|deleted messages|corbeille|[ée]l[ée]ments supprim[ée]s|bin)$/i, '\\Trash'], [/^(junk|spam|junk e-?mail|courrier ind[ée]sirable|ind[ée]sirables|bulk mail)$/i, '\\Junk'], [/^(archives?)$/i, '\\Archive']];
async function folders(id) {
  const c = await client(id).catch(e => { throw new Error(frErr(e)); });
  const list = await c.list({ statusQuery: { unseen: true, messages: true } });
  const used = new Set();
  const out = list.filter(f => !f.flags.has('\\Noselect') && !f.flags.has('\\NonExistent')).map(f => {
    let su = f.specialUse;
    if (!su) { const leaf = f.name; for (const [re, s] of GUESS) if (re.test(leaf) && !used.has(s)) { su = s; break; } }
    if (su && used.has(su)) su = null;
    if (su) used.add(su);
    const sp = SPECIAL[su];
    const depth = f.path.split(f.delimiter || '/').length - 1 - (/^\[(gmail|google mail)\]/i.test(f.path) ? 1 : 0) - (/^INBOX[./]/i.test(f.path) ? 1 : 0);
    return { path: f.path, name: sp ? sp[1] : f.name, role: sp ? sp[0] : null, order: sp ? sp[2] : 50, depth: sp ? 0 : Math.max(0, depth), unseen: f.status ? f.status.unseen || 0 : 0, total: f.status ? f.status.messages || 0 : 0, delimiter: f.delimiter };
  });
  out.sort((a, b) => a.order - b.order || a.path.localeCompare(b.path, 'fr', { sensitivity: 'base' }));
  writeCache(id, { folders: out });
  return out;
}
async function roleBox(id, role) {
  let fl = readCache(id).folders;
  if (!fl || !fl.find(f => f.role === role)) fl = await folders(id);
  const f = fl.find(x => x.role === role);
  return f ? f.path : null;
}

/* ---------------- Aperçu (début du texte) ---------------- */
function qpDecode(s) { return Buffer.from(s.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/gi, (m, h) => String.fromCharCode(parseInt(h, 16))), 'binary'); }
function findText(node, out = { plain: null, html: null, att: false }) {
  if (!node) return out;
  const t = (node.type || '').toLowerCase();
  if (node.childNodes && node.childNodes.length) { node.childNodes.forEach(n => findText(n, out)); return out; }
  const isAtt = (node.disposition || '').toLowerCase() === 'attachment' || (node.dispositionParameters && node.dispositionParameters.filename) || (node.parameters && node.parameters.name && !t.startsWith('text/'));
  if (isAtt) { out.att = true; return out; }
  if (t === 'text/plain' && !out.plain) out.plain = node;
  else if (t === 'text/html' && !out.html) out.html = node;
  return out;
}
function decodePart(buf, node) {
  let raw = buf.toString('binary');
  const encd = (node.encoding || '').toLowerCase();
  let b = encd === 'base64' ? Buffer.from(raw.replace(/[^A-Za-z0-9+/=]/g, ''), 'base64') : encd === 'quoted-printable' ? qpDecode(raw) : buf;
  const cs = (node.parameters && node.parameters.charset || 'utf-8').toLowerCase();
  try { return iconv.encodingExists(cs) ? iconv.decode(b, cs) : b.toString('utf8'); } catch { return b.toString('utf8'); }
}
const htmlToText = h => h.replace(/<(style|script|head)[\s\S]*?<\/\1>/gi, ' ').replace(/<br\s*\/?>|<\/p>|<\/div>|<\/tr>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n));
const clean = s => s.replace(/‌|​|͏|­|﻿/g, '').replace(/\s+/g, ' ').trim().slice(0, 220);

/* ---------------- Liste des messages ---------------- */
const addr = l => (l || []).map(x => ({ name: x.name || '', address: x.address || '' }));
function item(m, id, box, pv) {
  const e = m.envelope || {};
  const tx = findText(m.bodyStructure);
  return {
    key: `${id}|${box}|${m.uid}`, acc: id, box, uid: m.uid, seq: m.seq,
    subject: e.subject || '', from: addr(e.from), to: addr(e.to), cc: addr(e.cc), date: (e.date || m.internalDate || new Date()).toISOString ? new Date(e.date || m.internalDate).toISOString() : String(e.date),
    messageId: e.messageId || '', inReplyTo: e.inReplyTo || '',
    seen: m.flags ? m.flags.has('\\Seen') : false, flagged: m.flags ? m.flags.has('\\Flagged') : false, answered: m.flags ? m.flags.has('\\Answered') : false,
    draft: m.flags ? m.flags.has('\\Draft') : false, att: tx.att, size: m.size || 0, preview: pv || ''
  };
}
async function fetchItems(c, id, box, range, byUid) {
  const msgs = [];
  for await (const m of c.fetch(range, { uid: true, flags: true, envelope: true, internalDate: true, size: true, bodyStructure: true }, { uid: !!byUid })) msgs.push(m);
  // aperçu : on lit seulement la petite partie texte de chaque message
  const want = [];
  for (const m of msgs) { const t = findText(m.bodyStructure); const n = t.plain || t.html; if (n && (n.size || 0) < 80000) want.push([m, n]); }
  const pv = new Map();
  const groups = new Map();
  for (const [m, n] of want) { const part = n.part || '1'; if (!groups.has(part)) groups.set(part, []); groups.get(part).push([m, n]); }
  for (const [part, arr] of groups) {
    try {
      const uids = arr.map(([m]) => m.uid).join(',');
      for await (const r of c.fetch(uids, { uid: true, bodyParts: [part] }, { uid: true })) {
        const node = arr.find(([m]) => m.uid === r.uid);
        const buf = r.bodyParts && (r.bodyParts.get(part) || r.bodyParts.get(part.toLowerCase()));
        if (node && buf) { let s = decodePart(buf, node[1]); if ((node[1].type || '').toLowerCase() === 'text/html') s = htmlToText(s); pv.set(r.uid, clean(s)); }
      }
    } catch {}
  }
  return msgs.map(m => item(m, id, box, pv.get(m.uid))).sort((a, b) => b.uid - a.uid);
}
async function list(id, box, { offset = 0, limit = 50 } = {}) {
  return withBox(id, box, async c => {
    const total = c.mailbox.exists || 0;
    if (!total) { if (!offset) writeList(id, box, []); return { items: [], total: 0, more: false }; }
    const end = total - offset; if (end < 1) return { items: [], total, more: false };
    const start = Math.max(1, end - limit + 1);
    const items = (await fetchItems(c, id, box, `${start}:${end}`, false)).sort((a, b) => b.seq - a.seq);
    if (!offset) writeList(id, box, items);
    return { items, total, more: start > 1 };
  });
}
async function unified({ limit = 40 } = {}) {
  const res = await Promise.allSettled(ACCOUNTS.map(a => list(a.id, 'INBOX', { limit })));
  const items = [], errors = [];
  res.forEach((r, i) => r.status === 'fulfilled' ? items.push(...r.value.items) : errors.push({ acc: ACCOUNTS[i].id, err: String(r.reason && r.reason.message || r.reason) }));
  items.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { items, errors, more: res.some(r => r.status === 'fulfilled' && r.value.more) };
}
async function search(id, box, q, { limit = 80 } = {}) {
  q = String(q || '').trim(); if (!q) return { items: [] };
  return withBox(id, box, async c => {
    let uids = [];
    try { uids = await c.search({ or: [{ subject: q }, { from: q }, { to: q }, { body: q }] }, { uid: true }); }
    catch { uids = await c.search({ text: q }, { uid: true }).catch(() => []); }
    uids = (uids || []).sort((a, b) => b - a).slice(0, limit);
    if (!uids.length) return { items: [] };
    return { items: await fetchItems(c, id, box, uids.join(','), true) };
  });
}
async function searchAll(q) {
  const res = await Promise.allSettled(ACCOUNTS.map(async a => {
    const fl = readCache(a.id).folders || await folders(a.id);
    const boxes = fl.filter(f => !['trash', 'junk', 'drafts'].includes(f.role) && (f.role || f.total)).map(f => f.path).slice(0, 12);
    const all = [];
    for (const b of boxes) { try { all.push(...(await search(a.id, b, q, { limit: 40 })).items); } catch {} }
    return all;
  }));
  const seen = new Set(), items = [];
  for (const r of res) if (r.status === 'fulfilled') for (const it of r.value) { const k = it.acc + (it.messageId || it.key); if (!seen.has(k)) { seen.add(k); items.push(it); } }
  items.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { items: items.slice(0, 150) };
}

/* ---------------- Lecture d’un message ---------------- */
async function get(id, box, uid, { markSeen = true } = {}) {
  return withBox(id, box, async c => {
    const m = await c.fetchOne(String(uid), { uid: true, source: true, flags: true }, { uid: true });
    if (!m || !m.source) throw new Error('Message introuvable (il a peut-être été déplacé).');
    const p = await simpleParser(m.source, { skipTextToHtml: true });
    if (markSeen && !m.flags.has('\\Seen')) await c.messageFlagsAdd(String(uid), ['\\Seen'], { uid: true }).catch(() => {});
    const atts = (p.attachments || []).filter(x => !(x.related && x.contentId && p.html && p.html.includes('data:'))).map((x, i) => {
      const k = `${id}|${box}|${uid}|${i}`;
      attCache.set(k, { filename: x.filename || `piece-jointe-${i + 1}`, contentType: x.contentType, content: x.content });
      return { key: k, filename: x.filename || `piece-jointe-${i + 1}`, contentType: x.contentType, size: x.size || (x.content && x.content.length) || 0, inline: !!x.related };
    });
    while (attCache.size > 300) attCache.delete(attCache.keys().next().value);
    const ad = a => a && a.value ? a.value.map(v => ({ name: v.name || '', address: v.address || '' })) : [];
    const lst = p.headers.get('list'), lu = lst && lst.unsubscribe, listUnsub = lu ? (Array.isArray(lu) ? lu[0] : lu) : null;
    return {
      key: `${id}|${box}|${uid}`, acc: id, box, uid,
      subject: p.subject || '', from: ad(p.from), to: ad(p.to), cc: ad(p.cc), bcc: ad(p.bcc), replyTo: ad(p.replyTo),
      date: (p.date || new Date()).toISOString(), messageId: p.messageId || '', inReplyTo: p.inReplyTo || '',
      references: Array.isArray(p.references) ? p.references : (p.references ? [p.references] : []),
      html: p.html || '', text: p.text || '', attachments: atts.filter(a => !a.inline || !p.html),
      flagged: m.flags.has('\\Flagged'), seen: true,
      unsubscribe: listUnsub ? (listUnsub.url || (listUnsub.mail ? 'mailto:' + listUnsub.mail : '')) : ''
    };
  });
}
async function source(id, box, uid) {
  return withBox(id, box, async c => { const m = await c.fetchOne(String(uid), { uid: true, source: true }, { uid: true }); return m && m.source ? m.source.toString('utf8') : ''; });
}
const attachment = k => attCache.get(k) || null;

/* ---------------- Actions ---------------- */
const U = uids => (Array.isArray(uids) ? uids : [uids]).join(',');
async function flags(id, box, uids, f) {
  return withBox(id, box, async c => {
    for (const [k, flag] of [['seen', '\\Seen'], ['flagged', '\\Flagged'], ['answered', '\\Answered']]) {
      if (f[k] === true) await c.messageFlagsAdd(U(uids), [flag], { uid: true });
      if (f[k] === false) await c.messageFlagsRemove(U(uids), [flag], { uid: true });
    }
    return true;
  });
}
async function move(id, box, uids, dest) {
  if (!dest || dest === box) return false;
  return withBox(id, box, async c => {
    const r = await c.messageMove(U(uids), dest, { uid: true });
    const map = {}; if (r && r.uidMap) for (const [a, b] of r.uidMap) map[a] = b;
    return { dest, uidMap: map };
  });
}
async function toRole(id, box, uids, role) {
  const dest = await roleBox(id, role);
  if (role === 'trash' && (!dest || dest === box)) return withBox(id, box, async c => { await c.messageDelete(U(uids), { uid: true }); return { deleted: true }; });
  if (role === 'archive' && !dest) {
    // pas de dossier Archives : on le crée
    const c = await client(id); await c.mailboxCreate('Archives').catch(() => {}); await folders(id);
    return move(id, box, uids, 'Archives');
  }
  if (!dest) throw new Error('Dossier introuvable');
  return move(id, box, uids, dest);
}
async function destroy(id, box, uids) { return withBox(id, box, async c => { await c.messageDelete(U(uids), { uid: true }); return true; }); }
async function emptyBox(id, box) { return withBox(id, box, async c => { if (c.mailbox.exists) await c.messageDelete('1:*'); return true; }); }
async function createFolder(id, name) { const c = await client(id); await c.mailboxCreate(name); return folders(id); }
async function renameFolder(id, from, to) { const c = await client(id); await c.mailboxRename(from, to); return folders(id); }
async function deleteFolder(id, p) { const c = await client(id); await c.mailboxDelete(p); return folders(id); }
async function markAllRead(id, box) { return withBox(id, box, async c => { if (c.mailbox.exists) await c.messageFlagsAdd('1:*', ['\\Seen']); return true; }); }

/* ---------------- Envoi + brouillons ---------------- */
function buildMail(a, m) {
  const from = { name: a.name || '', address: a.email };
  const atts = [];
  for (const x of m.attachments || []) {
    if (x.key) { const c = attCache.get(x.key); if (c) atts.push({ filename: c.filename, content: c.content, contentType: c.contentType }); }
    else if (x.data) atts.push({ filename: x.name, content: Buffer.from(x.data), contentType: x.type || undefined });
  }
  for (const x of m.inline || []) atts.push({ filename: x.name, content: Buffer.from(x.data), cid: x.cid, contentType: x.type || undefined });
  const domain = a.email.split('@')[1] || 'hamama.local';
  return {
    from, to: m.to, cc: m.cc || undefined, bcc: m.bcc || undefined, subject: m.subject || '',
    html: m.html, text: m.text, attachments: atts,
    inReplyTo: m.inReplyTo || undefined, references: m.references && m.references.length ? m.references : undefined,
    messageId: m.messageId || `<${crypto.randomUUID()}@${domain}>`, date: new Date(),
    headers: { 'X-Mailer': 'Hamama' }
  };
}
const raw = mail => new Promise((res, rej) => new MailComposer({ ...mail, bcc: undefined }).compile().build((e, b) => e ? rej(e) : res(b)));
async function send(id, m) {
  const a = acc(id);
  if (!(m.to || m.cc || m.bcc)) throw new Error('Ajoute au moins un destinataire.');
  const mail = buildMail(a, m);
  const t = nodemailer.createTransport(smtpOpts(a, (await authOf(a)).smtp));
  try { await t.sendMail(mail); } catch (e) { throw new Error(frErr(e)); } finally { t.close(); }
  // copie dans « Envoyés » (Gmail et Outlook le font eux-mêmes)
  // (en arrière-plan : « Message envoyé » s'affiche dès que le serveur SMTP a accepté le message)
  if (a.saveSent !== false) {
    (async () => { const sent = await roleBox(id, 'sent'); if (sent) { const c = await client(id); await c.append(sent, await raw(mail), ['\\Seen']); onEvent('new-mail', { acc: id, items: [] }); } })().catch(() => {});
  }
  if (m.replyTo && m.replyTo.uid) flags(id, m.replyTo.box, [m.replyTo.uid], { answered: true }).catch(() => {});
  if (m.draftUid && m.draftBox) destroy(id, m.draftBox, [m.draftUid]).catch(() => {});
  return { ok: true, messageId: mail.messageId };
}
async function saveDraft(id, m) {
  const a = acc(id);
  const box = await roleBox(id, 'drafts');
  if (!box) throw new Error('Pas de dossier Brouillons sur ce compte');
  const c = await client(id);
  const r = await c.append(box, await raw(buildMail(a, m)), ['\\Draft', '\\Seen']);
  if (m.draftUid && m.draftBox) destroy(id, m.draftBox, [m.draftUid]).catch(() => {});
  return { box, uid: r && r.uid };
}

/* ---------------- Cache disque (ouverture instantanée) ---------------- */
const cacheMem = new Map();
function readCache(id) {
  if (cacheMem.has(id)) return cacheMem.get(id);
  let c = {}; try { c = JSON.parse(fs.readFileSync(path.join(DIR, 'cache', id + '.json'), 'utf8')); } catch {}
  cacheMem.set(id, c); return c;
}
function writeCache(id, patch) {
  const c = Object.assign(readCache(id), patch);
  clearTimeout(writeCache[id]);
  writeCache[id] = setTimeout(() => { try { fs.mkdirSync(path.join(DIR, 'cache'), { recursive: true }); fs.writeFileSync(path.join(DIR, 'cache', id + '.json'), JSON.stringify(c)); } catch {} }, 800);
}
function writeList(id, box, items) { const c = readCache(id); const lists = c.lists || {}; lists[box] = items.slice(0, 60); writeCache(id, { lists }); }
function cached(id, box) { const c = readCache(id); return { folders: c.folders || null, items: box && c.lists ? c.lists[box] || null : null }; }

/* ---------------- Expéditeurs bloqués → Indésirables ---------------- */
let BLOCKED = [];   // 'adresse@domaine.fr' ou '@domaine.fr' (tout le domaine)
const blockFile = () => path.join(DIR, 'blocked.json');
function loadBlocked() { try { BLOCKED = JSON.parse(fs.readFileSync(blockFile(), 'utf8')).filter(x => typeof x === 'string'); } catch { BLOCKED = []; } }
function saveBlocked() { fs.mkdirSync(DIR, { recursive: true }); fs.writeFileSync(blockFile(), JSON.stringify(BLOCKED, null, 1)); }
const normEntry = e => { e = String(e || '').trim().toLowerCase().replace(/^<|>$/g, ''); if (/^@?[a-z0-9.-]+\.[a-z]{2,}$/.test(e) && !e.includes('@', 1)) return e.startsWith('@') ? e : (e.includes('@') ? e : '@' + e); return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(e) ? e : null; };
const matchIn = (addr, list) => { addr = String(addr || '').toLowerCase(); if (!addr.includes('@')) return false; return list.includes(addr) || list.includes('@' + addr.split('@').pop()); };
const isBlocked = addr => matchIn(addr, BLOCKED);
/** Déplace dans Indésirables les messages de la boîte de réception venant des expéditeurs indiqués */
async function sweep(id, entries = BLOCKED) {
  if (!entries.length) return 0;
  const junk = await roleBox(id, 'junk').catch(() => null);
  if (!junk) return 0;
  return withBox(id, 'INBOX', async c => {
    const uids = new Set();
    for (const e of entries) { const r = await c.search({ from: e.replace(/^@/, '') }, { uid: true }).catch(() => []); (r || []).forEach(u => uids.add(u)); }
    if (!uids.size) return 0;
    const ok = [];   // la recherche FROM est approximative : on vérifie l’adresse exacte
    for await (const m of c.fetch([...uids].join(','), { uid: true, envelope: true }, { uid: true })) { const a = ((m.envelope && m.envelope.from) || [])[0]; if (a && matchIn(a.address, entries)) ok.push(m.uid); }
    if (ok.length) await c.messageMove(ok.join(','), junk, { uid: true });
    return ok.length;
  });
}
async function block(entry) {
  const e = normEntry(entry); if (!e) throw new Error('Adresse ou domaine invalide.');
  if (!BLOCKED.includes(e)) { BLOCKED.push(e); BLOCKED.sort(); saveBlocked(); }
  const res = await Promise.allSettled(ACCOUNTS.map(a => sweep(a.id, [e])));
  const moved = res.reduce((n, r) => n + (r.status === 'fulfilled' ? r.value : 0), 0);
  return { entry: e, blocked: BLOCKED.slice(), moved };
}
function unblock(entry) { const e = String(entry || '').toLowerCase(); BLOCKED = BLOCKED.filter(x => x !== e); saveBlocked(); return BLOCKED.slice(); }

/* ---------------- Surveillance (IDLE) : nouveaux messages ---------------- */
async function startWatch(a) {
  stopWatch(a.id);
  const w = { client: null, timer: null, stop: false, retry: 0 };
  watchers.set(a.id, w);
  const run = async () => {
    if (w.stop) return;
    try {
      const c = new ImapFlow({ ...imapOpts(a, (await authOf(a)).imap), maxIdleTime: 9 * 60000, autoIdleDelay: 1000 });
      w.client = c;
      c.on('error', () => {});
      c.on('exists', async ev => {
        if (ev.count <= ev.prevCount) return;
        try {
          const news = [], spam = [];
          for await (const m of c.fetch(`${ev.prevCount + 1}:${ev.count}`, { uid: true, flags: true, envelope: true })) {
            const from = ((m.envelope && m.envelope.from) || [])[0];
            if (from && isBlocked(from.address)) spam.push(m.uid);
            else if (!m.flags.has('\\Seen')) news.push(item(m, a.id, 'INBOX'));
          }
          if (spam.length) { const junk = await roleBox(a.id, 'junk').catch(() => null); if (junk) await c.messageMove(spam.join(','), junk, { uid: true }).catch(() => {}); }
          onEvent('new-mail', { acc: a.id, items: news, blocked: spam.length });
        } catch { onEvent('new-mail', { acc: a.id, items: [] }); }
      });
      c.on('close', () => { if (!w.stop) w.timer = setTimeout(run, Math.min(5 * 60000, 15000 * (++w.retry))); });
      await c.connect();
      await c.mailboxOpen('INBOX');
      w.retry = 0;
      // messages bloqués arrivés pendant que Hamama était fermé
      if (BLOCKED.length && !w.swept) { w.swept = true; sweep(a.id).then(n => { if (n) onEvent('new-mail', { acc: a.id, items: [], blocked: n }); }).catch(() => {}); }
    } catch { if (!w.stop) w.timer = setTimeout(run, Math.min(5 * 60000, 20000 * (++w.retry))); }
  };
  run();
}
function stopWatch(id) {
  const w = watchers.get(id); if (!w) return;
  w.stop = true; clearTimeout(w.timer); watchers.delete(id);
  if (w.client) { try { w.client.logout().catch(() => w.client.close()); } catch {} }
}

/* ---------------- Initialisation ---------------- */
function init({ dir, safeStorage, netFetch, emit, oauth }) {
  DIR = dir; SAFE = safeStorage; NET = netFetch; OAUTH = oauth; onEvent = emit || onEvent;
  load(); loadBlocked();
  for (const a of ACCOUNTS) startWatch(a);
}
/** Téléphone : au retour au premier plan, les connexions mises en veille par le système sont recréées */
function wake() { for (const id of [...conns.keys()]) dropConn(id); for (const a of ACCOUNTS) startWatch(a); }
function shutdown() { for (const id of [...watchers.keys()]) stopWatch(id); for (const id of [...conns.keys()]) dropConn(id); }
const accounts = () => ACCOUNTS.map(pub);
const raw_ = id => acc(id);

module.exports = {
  init, shutdown, wake, PROVIDERS, detect, test, add, update, remove, accounts, folders, list, unified, search, searchAll, get, source, attachment,
  flags, move, toRole, destroy, block, unblock, blockedList: () => BLOCKED.slice(), isBlocked, emptyBox, createFolder, renameFolder, deleteFolder, markAllRead, send, saveDraft, cached, enc, dec, _acc: raw_, save
};
