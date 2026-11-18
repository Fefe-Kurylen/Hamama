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
// Par défaut Hamama reste actif en arrière-plan (icône dans la zone de notification) et démarre avec Windows, discrètement
let PREF = { notify: true, sound: true, tray: true, startup: true, startMin: true };
const pending = [];
const prefFile = () => path.join(app.getPath('userData'), 'prefs.json');
try { Object.assign(PREF, JSON.parse(fs.readFileSync(prefFile(), 'utf8'))); } catch {}
if (!PREF.bg2) { Object.assign(PREF, { tray: true, startup: true, startMin: true, bg2: 1 }); try { fs.mkdirSync(path.dirname(prefFile()), { recursive: true }); fs.writeFileSync(prefFile(), JSON.stringify(PREF)); } catch {} }
const loginItem = () => { if (app.isPackaged && !process.env.HAMAMA_DATA) try { app.setLoginItemSettings({ openAtLogin: !!PREF.startup, args: ['--hidden'] }); } catch {} };
// Textes du processus principal (menus, fenêtres) dans la langue de l’appli
const MT = {
  fr: { cut:'Couper', copy:'Copier', paste:'Coller', all:'Tout sélectionner', dict:'Ajouter au dictionnaire', link:'Copier le lien', open:'Ouvrir Hamama', compose:'Nouveau message', quit:'Quitter', saveAtt:'Enregistrer la pièce jointe', saveIn:'Enregistrer les pièces jointes dans…', attach:'Joindre des fichiers', risky:'Ce type de fichier peut être dangereux.', riskyD:'« {0} » est un programme ou un script. Hamama ne l’ouvre pas directement.', saveInstead:'Enregistrer plutôt', cancel:'Annuler', big:'« {0} » dépasse 35 Mo', bg:'Hamama continue en arrière-plan : les nouveaux messages arrivent toujours. Il est dans la zone de notification (près de l’horloge).' },
  en: { cut:'Cut', copy:'Copy', paste:'Paste', all:'Select all', dict:'Add to dictionary', link:'Copy link', open:'Open Hamama', compose:'New message', quit:'Quit', saveAtt:'Save attachment', saveIn:'Save attachments to…', attach:'Attach files', risky:'This type of file can be dangerous.', riskyD:'“{0}” is a program or script. Hamama won’t open it directly.', saveInstead:'Save instead', cancel:'Cancel', big:'“{0}” exceeds 35 MB', bg:'Hamama keeps running in the background: new messages still arrive. It’s in the notification area (next to the clock).' },
  es: { cut:'Cortar', copy:'Copiar', paste:'Pegar', all:'Seleccionar todo', dict:'Añadir al diccionario', link:'Copiar enlace', open:'Abrir Hamama', compose:'Nuevo mensaje', quit:'Salir', saveAtt:'Guardar adjunto', saveIn:'Guardar adjuntos en…', attach:'Adjuntar archivos', risky:'Este tipo de archivo puede ser peligroso.', riskyD:'«{0}» es un programa o script. Hamama no lo abre directamente.', saveInstead:'Guardar en su lugar', cancel:'Cancelar', big:'«{0}» supera los 35 MB', bg:'Hamama sigue funcionando en segundo plano: los mensajes nuevos siguen llegando. Está en el área de notificación (junto al reloj).' },
  de: { cut:'Ausschneiden', copy:'Kopieren', paste:'Einfügen', all:'Alles auswählen', dict:'Zum Wörterbuch hinzufügen', link:'Link kopieren', open:'Hamama öffnen', compose:'Neue Nachricht', quit:'Beenden', saveAtt:'Anhang speichern', saveIn:'Anhänge speichern in…', attach:'Dateien anhängen', risky:'Dieser Dateityp kann gefährlich sein.', riskyD:'„{0}“ ist ein Programm oder Skript. Hamama öffnet es nicht direkt.', saveInstead:'Stattdessen speichern', cancel:'Abbrechen', big:'„{0}“ überschreitet 35 MB', bg:'Hamama läuft im Hintergrund weiter: Neue Nachrichten kommen weiterhin an. Es befindet sich im Infobereich (neben der Uhr).' },
  it: { cut:'Taglia', copy:'Copia', paste:'Incolla', all:'Seleziona tutto', dict:'Aggiungi al dizionario', link:'Copia link', open:'Apri Hamama', compose:'Nuovo messaggio', quit:'Esci', saveAtt:'Salva allegato', saveIn:'Salva allegati in…', attach:'Allega file', risky:'Questo tipo di file può essere pericoloso.', riskyD:'«{0}» è un programma o uno script. Hamama non lo apre direttamente.', saveInstead:'Salva invece', cancel:'Annulla', big:'«{0}» supera i 35 MB', bg:'Hamama continua in background: i nuovi messaggi arrivano comunque. Si trova nell’area di notifica (vicino all’orologio).' },
  pt: { cut:'Cortar', copy:'Copiar', paste:'Colar', all:'Selecionar tudo', dict:'Adicionar ao dicionário', link:'Copiar ligação', open:'Abrir o Hamama', compose:'Nova mensagem', quit:'Sair', saveAtt:'Guardar anexo', saveIn:'Guardar anexos em…', attach:'Anexar ficheiros', risky:'Este tipo de ficheiro pode ser perigoso.', riskyD:'«{0}» é um programa ou script. O Hamama não o abre diretamente.', saveInstead:'Guardar em vez disso', cancel:'Cancelar', big:'«{0}» excede 35 MB', bg:'O Hamama continua em segundo plano: as novas mensagens continuam a chegar. Está na área de notificação (junto ao relógio).' },
  ar: { cut:'قص', copy:'نسخ', paste:'لصق', all:'تحديد الكل', dict:'إضافة إلى القاموس', link:'نسخ الرابط', open:'فتح حمامة', compose:'رسالة جديدة', quit:'خروج', saveAtt:'حفظ المرفق', saveIn:'حفظ المرفقات في…', attach:'إرفاق ملفات', risky:'قد يكون هذا النوع من الملفات خطيرًا.', riskyD:'«{0}» برنامج أو نص برمجي. لا يفتحه حمامة مباشرة.', saveInstead:'الحفظ بدلًا من ذلك', cancel:'إلغاء', big:'«{0}» يتجاوز 35 ميغابايت', bg:'يواصل Hamama العمل في الخلفية: تستمر الرسائل الجديدة في الوصول. ستجده في منطقة الإشعارات (بجانب الساعة).' }
};
const L = (k, a) => { const d = MT[PREF.lang] || MT[(app.getLocale() || 'fr').slice(0, 2)] || MT.en; return String(d[k] || MT.fr[k]).replace('{0}', a == null ? '' : a); };
const mailtoArgs = argv => argv.filter(a => /^mailto:/i.test(a));

function send(ch, data) { if (win && ready) win.webContents.send(ch, data); else pending.push([ch, data]); }

function createWindow() {
  win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 760, minHeight: 520,
    backgroundColor: '#262624', title: 'Hamama', show: !(PREF.startMin && process.argv.includes('--hidden')),
    icon: path.join(__dirname, 'app', 'icon.png'),
    titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
    ...(isMac ? { trafficLightPosition: { x: 16, y: 19 } } : { titleBarOverlay: { color: '#262624', symbolColor: '#f2f1ec', height: 52 } }),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true, spellcheck: true, v8CacheOptions: 'bypassHeatCheck', webviewTag: false, backgroundThrottling: false }
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
    if (p.misspelledWord) t.push({ label: L('dict'), click: () => win.webContents.session.addWordToSpellCheckerDictionary(p.misspelledWord) }, { type: 'separator' });
    if (p.linkURL && /^https?:/i.test(p.linkURL)) t.push({ label: L('link'), click: () => require('electron').clipboard.writeText(p.linkURL) }, { type: 'separator' });
    if (p.isEditable) t.push({ role: 'cut', label: L('cut') }, { role: 'copy', label: L('copy') }, { role: 'paste', label: L('paste') }, { role: 'selectAll', label: L('all') });
    else if (p.selectionText) t.push({ role: 'copy', label: L('copy') });
    if (t.length) Menu.buildFromTemplate(t).popup({ window: win });
  });
  win.on('close', e => {
    if (!PREF.tray || quitting) return;
    e.preventDefault(); win.hide();
    if (!PREF.bgTold && Notification.isSupported()) {          // une seule fois : expliquer où est passée l'appli
      PREF.bgTold = 1; try { fs.writeFileSync(prefFile(), JSON.stringify(PREF)); } catch {}
      const n = new Notification({ title: 'Hamama', body: L('bg'), icon: path.join(__dirname, 'app', 'icon.png'), silent: true });
      n.on('click', () => { if (win) { win.show(); win.focus(); } }); n.show();
    }
  });
  win.on('closed', () => { win = null; ready = false; });
  win.on('focus', () => { if (win) win.flashFrame(false); updater.onFocus(); });
}

function setupTray() {
  if (!PREF.tray) { if (tray) { tray.destroy(); tray = null; } return; }
  if (tray) return;
  tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'app', 'icon.png')).resize({ width: 16, height: 16 }));
  tray.setToolTip('Hamama');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: L('open'), click: () => { if (!win) createWindow(); win.show(); win.focus(); } },
    { label: L('compose'), click: () => { if (!win) createWindow(); win.show(); win.focus(); send('mailto', 'mailto:'); } },
    { type: 'separator' },
    { label: L('quit'), click: () => { quitting = true; app.quit(); } }
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
H('block:list', () => mail.blockedList());
H('block:add', e => mail.block(e));
H('block:remove', e => mail.unblock(e));
H('mail:draft', (id, m) => mail.saveDraft(id, m));
H('att:save', async keys => {
  keys = [].concat(keys); const list = keys.map(k => mail.attachment(k)).filter(Boolean);
  if (!list.length) throw new Error('Pièce jointe expirée : rouvre le message.');
  if (list.length === 1) {
    const a = list[0];
    const r = await dialog.showSaveDialog(win, { title: L('saveAtt'), defaultPath: path.join(app.getPath('downloads'), a.filename.replace(/[\\/:*?"<>|]/g, '_')) });
    if (r.canceled || !r.filePath) return null;
    await fs.promises.writeFile(r.filePath, a.content); return r.filePath;
  }
  const r = await dialog.showOpenDialog(win, { title: L('saveIn'), defaultPath: app.getPath('downloads'), properties: ['openDirectory', 'createDirectory'] });
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
    const c = dialog.showMessageBoxSync(win, { type: 'warning', title: 'Hamama', buttons: [L('saveInstead'), L('cancel')], defaultId: 1, cancelId: 1, message: L('risky'), detail: L('riskyD', a.filename) });
    return c === 0 ? { save: true } : null; // le renderer propose alors l’enregistrement
  }
  const dir = path.join(os.tmpdir(), 'hamama-pj'); fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, Date.now() + '-' + a.filename.replace(/[\\/:*?"<>|]/g, '_'));
  await fs.promises.writeFile(f, a.content);
  const err = await shell.openPath(f); if (err) throw new Error(err);
  return f;
});
H('file:pick', async () => {
  const r = await dialog.showOpenDialog(win, { title: L('attach'), properties: ['openFile', 'multiSelections'] });
  if (r.canceled) return [];
  const out = [];
  for (const f of r.filePaths) { const st = fs.statSync(f); if (st.size > 35 * 1024 * 1024) throw new Error(L('big', path.basename(f))); out.push({ name: path.basename(f), size: st.size, data: new Uint8Array(fs.readFileSync(f)) }); }
  return out;
});
H('prefs', p => { if (p && typeof p === 'object') { const oldLang = PREF.lang; Object.assign(PREF, p); fs.writeFileSync(prefFile(), JSON.stringify(PREF)); if (PREF.lang !== oldLang && tray) { tray.destroy(); tray = null; } setupTray(); loginItem(); } return PREF; });
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
    createWindow(); setupTray(); loginItem(); updater.init(send);
    for (const m of mailtoArgs(process.argv)) send('mailto', m);
  });
  app.on('before-quit', () => { quitting = true; mail.shutdown(); });
  app.on('window-all-closed', () => { if (!PREF.tray) app.quit(); });
  app.on('activate', () => { if (!win) createWindow(); });
}
