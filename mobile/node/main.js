'use strict';
/* ============================================================
   Hamama — moteur mail sur iPhone / Android
   Tourne dans le Node.js embarqué (@capawesome/capacitor-nodejs) et réutilise
   exactement le moteur de l'appli Windows (windows/mail.js).
   Communication avec l'interface : module « bridge » (channel.on / channel.post).
   ============================================================ */
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { app, channel } = require('bridge');
const mail = require('../../windows/mail.js');

const DIR = path.join(app.datadir(), 'hamama');
fs.mkdirSync(DIR, { recursive: true });

/* Chiffrement des mots de passe : AES-256-GCM avec une clé propre à l'appareil,
   rangée dans le dossier privé de l'appli (inaccessible aux autres applis). */
const keyFile = path.join(DIR, '.cle');
let KEY;
try { KEY = fs.readFileSync(keyFile); if (KEY.length !== 32) throw 0; }
catch { KEY = crypto.randomBytes(32); fs.writeFileSync(keyFile, KEY, { mode: 0o600 }); }
const SAFE = {
  isEncryptionAvailable: () => true,
  encryptString(s) {
    const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', KEY, iv);
    const e = Buffer.concat([c.update(String(s), 'utf8'), c.final()]);
    return Buffer.concat([iv, c.getAuthTag(), e]);
  },
  decryptString(b) {
    const d = crypto.createDecipheriv('aes-256-gcm', KEY, b.subarray(0, 12));
    d.setAuthTag(b.subarray(12, 28));
    return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString('utf8');
  }
};

const emit = (ch, data) => { try { channel.post('event', ch, data); } catch {} };
mail.init({ dir: DIR, safeStorage: SAFE, netFetch: (u, o) => fetch(u, o), emit, oauth: null });

// Les octets voyagent en base64 entre l'interface et le moteur : { __b64: '…' } ⇄ Buffer
const dec = v => {
  if (Array.isArray(v)) return v.map(dec);
  if (v && typeof v === 'object') { if (typeof v.__b64 === 'string') return Buffer.from(v.__b64, 'base64'); const o = {}; for (const k in v) o[k] = dec(v[k]); return o; }
  return v;
};

const API = {
  'acc:list': () => ({ accounts: mail.accounts(), providers: mail.PROVIDERS, oauth: {} }),
  'acc:detect': e => mail.detect(e),
  'acc:test': c => mail.test(c),
  'acc:add': c => mail.add(c),
  'acc:update': (id, p) => mail.update(id, p),
  'acc:remove': id => mail.remove(id),
  'acc:oauth': () => { throw new Error('Connexion sécurisée pas encore disponible sur téléphone.'); },
  'mail:folders': id => mail.folders(id),
  'mail:cached': (id, box) => mail.cached(id, box),
  'mail:list': (id, box, o) => mail.list(id, box, o),
  'mail:unified': o => mail.unified(o),
  'mail:search': (id, box, q) => mail.search(id, box, q),
  'mail:searchAll': q => mail.searchAll(q),
  'mail:get': (id, box, uid, o) => mail.get(id, box, uid, o),
  'mail:source': (id, box, uid) => mail.source(id, box, uid),
  'mail:flags': (id, box, uids, f) => mail.flags(id, box, uids, f),
  'mail:move': (id, box, uids, dest) => mail.move(id, box, uids, dest),
  'mail:role': (id, box, uids, role) => mail.toRole(id, box, uids, role),
  'mail:destroy': (id, box, uids) => mail.destroy(id, box, uids),
  'mail:empty': (id, box) => mail.emptyBox(id, box),
  'mail:allread': (id, box) => mail.markAllRead(id, box),
  'mail:mkdir': (id, n) => mail.createFolder(id, n),
  'mail:rename': (id, a, b) => mail.renameFolder(id, a, b),
  'mail:rmdir': (id, p) => mail.deleteFolder(id, p),
  'mail:send': (id, m) => mail.send(id, m),
  'mail:draft': (id, m) => mail.saveDraft(id, m),
  'block:list': () => mail.blockedList(),
  'block:add': e => mail.block(e),
  'block:remove': e => mail.unblock(e),
  'att:get': k => { const a = mail.attachment(k); return a ? { filename: a.filename, contentType: a.contentType, data: Buffer.from(a.content).toString('base64') } : null; },
  'wake': () => { mail.wake(); return true; }
};

channel.on('call', async (id, ch, args) => {
  try {
    if (!API[ch]) throw new Error('Commande inconnue : ' + ch);
    const r = await API[ch](...dec(args || []));
    channel.post('reply', id, true, r === undefined ? null : r);
  } catch (e) {
    channel.post('reply', id, false, String((e && e.message) || e));
  }
});

// Retour au premier plan : le système a pu couper les connexions → on les recrée
app.on('resume', () => { try { mail.wake(); } catch {} emit('resume', {}); });
app.on('pause', lock => { try { lock.release(); } catch {} });
