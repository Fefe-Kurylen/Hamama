'use strict';
const { app, BrowserWindow, ipcMain, dialog, nativeTheme, Menu, shell, net, safeStorage, Notification, Tray, nativeImage } = require('electron');
const os = require('os');
const path = require('path');
const fs = require('fs');
const mail = require('./mail');
const oauth = require('./oauth');
const updater = require('./updater');

app.setPath('userData', path.join(app.getPath('appData'), 'Hamama'));
if (process.env.HAMAMA_DATA) app.setPath('userData', process.env.HAMAMA_DATA); // tests
app.setAppUserModelId('Kurylen.Hamama');
const isMac = process.platform === 'darwin';
if (isMac) {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { role: 'appMenu', label: 'Hamama' }, { role: 'fileMenu', label: 'Fichier' }, { role: 'editMenu', label: 'Édition' },
    { role: 'viewMenu', label: 'Affichage' }, { role: 'windowMenu', label: 'Fenêtre' }
  ]));
} else Menu.setApplicationMenu(null);
nativeTheme.themeSource = 'dark';

let win = null, ready = false, tray = null, quitting = false;
let PREF = { notify: true, sound: true, tray: false, startMin: false };
const pending = [];
const prefFile = () => path.join(app.getPath('userData'), 'prefs.json');
try { Object.assign(PREF, JSON.parse(fs.readFileSync(prefFile(), 'utf8'))); } catch {}
const mailtoArgs = argv => argv.filter(a => /^mailto:/i.test(a));

function send(ch, data) { if (win && ready) win.webContents.send(ch, data); else pending.push([ch, data]); }

function createWindow() {
  win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 760, minHeight: 520,
    backgroundColor: '#1e2026', title: 'Hamama', show: !(PREF.startMin && process.argv.includes('--hidden')),
    icon: path.join(__dirname, 'app', 'icon.png'),
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    ...(isMac ? { trafficLightPosition: { x: 16, y: 19 } } : { titleBarOverlay: { color: '#262930', symbolColor: '#e8eaf0', height: 52 } }),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true, spellcheck: true, v8CacheOptions: 'bypassHeatCheck', webviewTag: false }
  });
  try { win.webContents.session.setSpellCheckerLanguages(['fr', 'en-US']); } catch {}
  win.loadFile(path.join(__dirname, 'app', 'index.html'), process.env.HAMAMA_DEBUG ? { query: { debug: '1' } } : undefined);
  const home = require('url').pathToFileURL(path.join(__dirname, 'app', 'index.html')).href;
  // Liens des mails → navigateur ; mailto: → fenêtre de rédaction de Hamama
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^mailto:/i.test(url)) send('mailto', url);
    else if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => { if (url.split('#')[0].split('?')[0] !== home) e.preventDefault(); });
  win.webContents.on('will-frame-navigate', e => {
    if (e.isMainFrame) return;
    const u = String(e.url || '');
    if (u === 'about:srcdoc' || u.startsWith('about:blank')) return;
    e.preventDefault();
    if (/^https?:/i.test(u)) shell.openExternal(u); else if (/^mailto:/i.test(u)) send('mailto', u);
  });
  // Clic droit : correcteur orthographique + copier/coller
  win.webContents.on('context-menu', (e, p) => {
    const t = [];
    for (const s of (p.dictionarySuggestions || []).slice(0, 5)) t.push({ label: s, click: () => win.webContents.replaceMisspelling(s) });
    if (p.misspelledWord) t.push({ label: 'Ajouter au dictionnaire', click: () => win.webContents.session.addWordToSpellCheckerDictionary(p.misspelledWord) }, { type: 'separator' });
    if (p.linkURL && /^https?:/i.test(p.linkURL)) t.push({ label: 'Copier le lien', click: () => require('electron').clipboard.writeText(p.linkURL) }, { type: 'separator' });
    if (p.isEditable) t.push({ role: 'cut', label: 'Couper' }, { role: 'copy', label: 'Copier' }, { role: 'paste', label: 'Coller' }, { role: 'selectAll', label: 'Tout sélectionner' });
    else if (p.selectionText) t.push({ role: 'copy', label: 'Copier' });
    if (t.length) Menu.buildFromTemplate(t).popup({ window: win });
  });
  win.on('close', e => { if (PREF.tray && !quitting) { e.preventDefault(); win.hide(); } });
  win.on('closed', () => { win = null; ready = false; });
  win.on('focus', () => { if (win) win.flashFrame(false); });
}

function setupTray() {
  if (!PREF.tray) { if (tray) { tray.destroy(); tray = null; } return; }
  if (tray) return;
  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'app', 'icon.png')).resize({ width: 16, height: 16 }));
  tray.setToolTip('Hamama');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Ouvrir Hamama', click: () => { if (!win) createWindow(); win.show(); win.focus(); } },
    { label: 'Nouveau message', click: () => { if (!win) createWindow(); win.show(); win.focus(); send('mailto', 'mailto:'); } },
    { type: 'separator' },
    { label: 'Quitter', click: () => { quitting = true; app.quit(); } }
  ]));
  tray.on('click', () => { if (!win) createWindow(); win.show(); win.focus(); });
}

/* ---------------- IPC ---------------- */
const fromApp = e => { try { return !!win && e.sender === win.webContents && String(e.senderFrame && e.senderFrame.url || '').startsWith('file:'); } catch { return false; } };
const H = (ch, fn) => ipcMain.handle(ch, async (e, ...a) => {
  if (!fromApp(e)) throw new Error('refusé');
  try { return await fn(...a); } catch (err) { throw new Error(String(err && err.message || err)); }
});

H('acc:list', () => ({ accounts: mail.accounts(), providers: mail.PROVIDERS, oauth: oauth.available() }));
H('acc:detect', email => mail.detect(email));
H('acc:test', cfg => mail.test(cfg));
H('acc:add', cfg => mail.add(cfg));
H('acc:update', (id, patch) => mail.update(id, patch));
H('acc:remove', id => mail.remove(id));
H('acc:oauth', async (provider, hint) => {
  const r = await oauth.signIn(provider, hint);
  if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  return r;
});
H('mail:folders', id => mail.folders(id));
H('mail:cached', (id, box) => mail.cached(id, box));
H('mail:list', (id, box, o) => mail.list(id, box, o));
H('mail:unified', o => mail.unified(o));
H('mail:search', (id, box, q) => mail.search(id, box, q));
H('mail:searchAll', q => mail.searchAll(q));
H('mail:get', (id, box, uid, o) => mail.get(id, box, uid, o));
H('mail:source', (id, box, uid) => mail.source(id, box, uid));
H('mail:flags', (id, box, uids, f) => mail.flags(id, box, uids, f));
H('mail:move', (id, box, uids, dest) => mail.move(id, box, uids, dest));
H('mail:role', (id, box, uids, role) => mail.toRole(id, box, uids, role));
H('mail:destroy', (id, box, uids) => mail.destroy(id, box, uids));
H('mail:empty', (id, box) => mail.emptyBox(id, box));
H('mail:allread', (id, box) => mail.markAllRead(id, box));
H('mail:mkdir', (id, name) => mail.createFolder(id, name));
H('mail:rename', (id, from, to) => mail.renameFolder(id, from, to));
H('mail:rmdir', (id, p) => mail.deleteFolder(id, p));
H('mail:send', (id, m) => mail.send(id, m));
H('mail:draft', (id, m) => mail.saveDraft(id, m));
H('att:save', async keys => {
  keys = [].concat(keys); const list = keys.map(k => mail.attachment(k)).filter(Boolean);
  if (!list.length) throw new Error('Pièce jointe expirée : rouvre le message.');
  if (list.length === 1) {
    const a = list[0];
    const r = await dialog.showSaveDialog(win, { title: 'Enregistrer la pièce jointe', defaultPath: path.join(app.getPath('downloads'), a.filename.replace(/[\\/:*?"<>|]/g, '_')) });
    if (r.canceled || !r.filePath) return null;
    await fs.promises.writeFile(r.filePath, a.content); return r.filePath;
  }
  const r = await dialog.showOpenDialog(win, { title: 'Enregistrer les pièces jointes dans…', defaultPath: app.getPath('downloads'), properties: ['openDirectory', 'createDirectory'] });
  if (r.canceled || !r.filePaths[0]) return null;
  for (const a of list) {
    let f = path.join(r.filePaths[0], a.filename.replace(/[\\/:*?"<>|]/g, '_')), n = 1;
    while (fs.existsSync(f)) { const p = path.parse(f); f = path.join(p.dir, `${p.name.replace(/ \(\d+\)$/, '')} (${n++})${p.ext}`); }
    await fs.promises.writeFile(f, a.content);
  }
  return r.filePaths[0];
});
const RISKY = /\.(exe|bat|cmd|com|scr|pif|vbs|vbe|js|jse|wsf|wsh|ps1|msi|msp|hta|cpl|jar|lnk|reg|iso|img|vhd)$/i;
H('att:open', async key => {
  const a = mail.attachment(key); if (!a) throw new Error('Pièce jointe expirée : rouvre le message.');
  if (RISKY.test(a.filename)) {
    const c = dialog.showMessageBoxSync(win, { type: 'warning', title: 'Hamama', buttons: ['Enregistrer plutôt', 'Annuler'], defaultId: 1, cancelId: 1, message: 'Ce type de fichier peut être dangereux.', detail: `« ${a.filename} » est un programme ou un script. Hamama ne l’ouvre pas directement.` });
    return c === 0 ? { save: true } : null; // le renderer propose alors l’enregistrement
  }
  const dir = path.join(os.tmpdir(), 'hamama-pj'); fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, Date.now() + '-' + a.filename.replace(/[\\/:*?"<>|]/g, '_'));
  await fs.promises.writeFile(f, a.content);
  const err = await shell.openPath(f); if (err) throw new Error(err);
  return f;
});
H('file:pick', async () => {
  const r = await dialog.showOpenDialog(win, { title: 'Joindre des fichiers', properties: ['openFile', 'multiSelections'] });
  if (r.canceled) return [];
  const out = [];
  for (const f of r.filePaths) { const st = fs.statSync(f); if (st.size > 35 * 1024 * 1024) throw new Error(`« ${path.basename(f)} » dépasse 35 Mo`); out.push({ name: path.basename(f), size: st.size, data: new Uint8Array(fs.readFileSync(f)) }); }
  return out;
});
H('prefs', p => { if (p && typeof p === 'object') { Object.assign(PREF, p); fs.writeFileSync(prefFile(), JSON.stringify(PREF)); setupTray(); app.setLoginItemSettings({ openAtLogin: !!PREF.startup, args: ['--hidden'] }); } return PREF; });
H('notify', ({ title, body, key, silent }) => {
  if (!PREF.notify || !Notification.isSupported()) return false;
  const n = new Notification({ title: String(title || 'Hamama').slice(0, 120), body: String(body || '').slice(0, 240), silent: !PREF.sound || !!silent, icon: path.join(__dirname, 'app', 'icon.png') });
  n.on('click', () => { if (!win) createWindow(); if (win.isMinimized()) win.restore(); win.show(); win.focus(); if (key) send('open-key', key); });
  n.show(); return true;
});
H('badge', n => { n = n | 0; try { app.setBadgeCount(n); } catch {} if (win && !isMac) { if (n > 0 && !win.isFocused()) win.flashFrame(true); } if (tray) tray.setToolTip(n ? `Hamama — ${n} non lu${n > 1 ? 's' : ''}` : 'Hamama'); return true; });
H('default-mail', () => { const ok = app.setAsDefaultProtocolClient('mailto'); if (process.platform === 'win32') shell.openExternal('ms-settings:defaultapps'); return ok; });
H('print', async html => {
  const f = path.join(os.tmpdir(), `hamama-print-${Date.now()}.html`); fs.writeFileSync(f, String(html || ''), 'utf8');
  const w = new BrowserWindow({ show: false, webPreferences: { javascript: false, sandbox: true } });
  try { await w.loadFile(f); return await new Promise(res => w.webContents.print({ printBackground: true }, ok => res(!!ok))); }
  finally { w.destroy(); fs.promises.unlink(f).catch(() => {}); }
});
H('app-version', () => app.getVersion());
H('upd:state', () => updater.get());
H('upd:check', () => updater.check());
H('upd:install', () => updater.install());
ipcMain.on('titlebar', (e, o) => {
  if (!win || !fromApp(e) || !o) return;
  try {
    const light = /^#?([0-9a-f]{6})$/i.test(o.color) && parseInt(o.color.replace('#', '').slice(0, 2), 16) > 200;
    nativeTheme.themeSource = light ? 'light' : 'dark';
    if (!isMac && win.setTitleBarOverlay) win.setTitleBarOverlay({ color: o.color, symbolColor: o.symbolColor, height: Math.max(28, Math.min(80, o.height | 0)) });
  } catch {}
});
ipcMain.on('ready', e => { if (!fromApp(e)) return; ready = true; for (const [ch, d] of pending.splice(0)) win.webContents.send(ch, d); });

/* ---------------- Démarrage ---------------- */
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', (e, argv) => {
    if (!win) createWindow();
    if (win.isMinimized()) win.restore();
    win.show(); win.focus();
    for (const m of mailtoArgs(argv)) send('mailto', m);
  });
  app.on('open-url', (e, url) => { e.preventDefault(); if (/^mailto:/i.test(url)) send('mailto', url); });
  app.whenReady().then(() => {
    mail.init({ dir: app.getPath('userData'), safeStorage, netFetch: (u, o) => net.fetch(u, o), emit: send, oauth });
    oauth.init({ netFetch: (u, o) => net.fetch(u, o), openExternal: u => shell.openExternal(u), mail });
    createWindow(); setupTray(); updater.init(send);
    for (const m of mailtoArgs(process.argv)) send('mailto', m);
  });
  app.on('before-quit', () => { quitting = true; mail.shutdown(); });
  app.on('window-all-closed', () => { if (!PREF.tray) app.quit(); });
  app.on('activate', () => { if (!win) createWindow(); });
}
