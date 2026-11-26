// Test de l'appli téléphone : interface mobile/www (écran de téléphone, tactile) + vrai moteur
// Node (www/nodejs/main.js) branché via un faux plugin Capacitor, contre le serveur de test.
// Prérequis : node server.js & ; cd ../mobile && python make-mobile.py
const path = require('path'), fs = require('fs'), os = require('os'), Module = require('module');
const PW = require('playwright');
const ENGINE = process.env.BROWSER || 'chromium', PLAT = process.env.PLAT || 'android';   // BROWSER=webkit PLAT=ios = comme sur iPhone
const WWW = path.join(__dirname, '..', 'mobile', 'www');

// --- faux module « bridge » (celui du Node.js embarqué) ---
const EE = require('events'); const channel = new EE(); const app = new EE();
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'hamama-mob-'));
app.datadir = () => DATA;
let toPage = () => {};
channel.post = (eventName, ...args) => toPage({ eventName, args });
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (r, ...a) { return r === 'bridge' ? 'bridge' : origResolve.call(this, r, ...a); };
require.cache.bridge = { id: 'bridge', filename: 'bridge', loaded: true, exports: { channel, app } };
require(path.join(WWW, 'nodejs', 'main.js'));

let ok = 0, ko = 0;
const check = (c, m) => { if (c) { ok++; console.log('✅', m); } else { ko++; console.log('❌', m); } };

(async () => {
  const browser = await PW[ENGINE].launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR' });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('ERREUR PAGE', e.message));
  await page.exposeBinding('__nodeSend', (_s, m) => { channel.emit(m.eventName, ...m.args); });
  toPage = msg => page.evaluate(m => window.__nodeMsg && window.__nodeMsg(m), msg).catch(() => {});
  await page.addInitScript(p => { window.__plat = p; }, PLAT);
  await page.addInitScript(() => {
    const L = {};
    window.__nodeMsg = m => (L.message || []).forEach(f => f(m));
    window.__back = () => { const ev = new CustomEvent('hamama-back', { cancelable: true }); return window.dispatchEvent(ev); };
    window.Capacitor = { isNativePlatform: () => true, getPlatform: () => window.__plat, Plugins: {
      Nodejs: { addListener: (n, f) => { (L[n] = L[n] || []).push(f); }, isReady: async () => ({ ready: true }), send: async m => window.__nodeSend(m) },
      Filesystem: { writeFile: async o => { window.__written = o; return { uri: 'file:///cache/' + o.path }; } },
      Share: { share: async o => { window.__shared = o; } },
      LocalNotifications: { requestPermissions: async () => ({ display: 'granted' }), schedule: async o => { window.__notifs = (window.__notifs || []).concat(o.notifications); }, addListener() {} },
      App: { addListener() {}, minimizeApp() {}, getInfo: async () => ({ version: '1.0.0' }) } } };
  });
  await page.route('http://hamama.app/**', r => {
    const f = path.join(WWW, new URL(r.request().url()).pathname.replace(/^\/$/, '/index.html'));
    if (!fs.existsSync(f)) return r.fulfill({ status: 404 });
    const ct = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' }[path.extname(f)] || 'application/octet-stream';
    r.fulfill({ body: fs.readFileSync(f), contentType: ct });
  });
  await page.goto('http://hamama.app/');
  await page.waitForTimeout(800);
  check(await page.evaluate(() => document.documentElement.classList.contains('mobile') || document.body.classList.contains('mobile')), 'mode téléphone détecté');
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-1-accueil.png') });

  // --- ajout du compte ---
  await page.tap('#welcomeProvs [data-p=autre]');
  await page.waitForSelector('[data-k=email]', { timeout: 5000 });
  await page.fill('[data-k=name]', 'Félix');
  await page.fill('[data-k=email]', 'felix@test.local');
  await page.fill('[data-k=pass]', 'secret');
  await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('details.adv').open = true; });
  await page.fill('[data-k=ih]', '127.0.0.1'); await page.fill('[data-k=ip]', '1143'); await page.selectOption('[data-k=is]', '0');
  await page.fill('[data-k=sh]', '127.0.0.1'); await page.fill('[data-k=sp]', '1025'); await page.selectOption('[data-k=ss]', '0');
  await page.check('[data-k=insecure]');
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-2-compte.png') });
  await page.tap('[data-ok]');
  // l'appli s'ouvre sur la liste des boîtes, puis on entre dans la boîte de réception
  await page.waitForSelector('#side .fold[data-box]', { timeout: 30000 });
  await page.waitForTimeout(600);
  check(await page.evaluate(() => document.documentElement.classList.contains('boxes') && document.getElementById('side').getBoundingClientRect().width >= 380), 'ouverture sur la liste des boîtes (plein écran)');
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-3a-boites.png') });
  await page.locator('#side [data-uni], #side .fold[data-box]').first().tap();
  await page.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 });
  await page.waitForTimeout(800);
  const n = await page.locator('#list .it').count();
  if (process.env.OV) console.log(JSON.stringify(await page.evaluate(require('/tmp/ov.js'))));
  check(n >= 9, `liste des messages chargée (${n})`);
  const w = await page.evaluate(() => { const l = document.getElementById('list').getBoundingClientRect(); return [l.width, getComputedStyle(document.getElementById('side')).position]; });
  check(w[0] >= 380, `liste en plein écran (${Math.round(w[0])} px)`);
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-3-liste.png') });

  // --- bouton Retour → liste des boîtes, puis on y retourne ---
  await page.tap('#sideBtn');
  await page.waitForTimeout(400);
  check(await page.evaluate(() => document.documentElement.classList.contains('boxes')), 'bouton Retour → liste des boîtes');
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-4-dossiers.png') });
  await page.locator('#side [data-uni], #side .fold[data-box]').first().tap();
  await page.waitForTimeout(600);
  check(await page.evaluate(() => !document.documentElement.classList.contains('boxes') && window.__back() === false && document.documentElement.classList.contains('boxes')), 'retour Android dans une boîte → liste des boîtes');
  await page.locator('#side [data-uni], #side .fold[data-box]').first().tap();
  await page.waitForTimeout(600);

  // --- lecture d'un message ---
  await page.locator('#list .it').first().tap();
  await page.waitForTimeout(1500);
  const viewW = await page.evaluate(() => { const v = document.getElementById('view'); return v ? v.getBoundingClientRect().width : 0; });
  check(viewW >= 380, `lecture en plein écran (${Math.round(viewW)} px)`);
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-5-lecture.png') });
  check(await page.evaluate(() => window.__back() === false), 'retour → revient à la liste');
  await page.waitForTimeout(400);
  const listVis = await page.evaluate(() => document.getElementById('list').getBoundingClientRect().width);
  check(listVis >= 380, 'liste réaffichée');

  // --- balayage vers la gauche = supprimer (réglage par défaut) ---
  const before = await page.locator('#list .it').count();
  const box = await page.locator('#list .it').first().boundingBox();
  const sw = async (x0, x1) => {
    const cdp = await ctx.newCDPSession(page); const y = box.y + box.height / 2;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y }] });
    for (let i = 1; i <= 8; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + (x1 - x0) * i / 8, y }] }); await page.waitForTimeout(16); }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  await sw(box.x + box.width - 20, box.x + 40);
  await page.waitForTimeout(1200);
  const after = await page.locator('#list .it').count();
  check(after === before - 1, `balayage gauche → supprimé (${before} → ${after})`);
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-6-archive.png') });

  // --- rédaction plein écran + envoi ---
  await page.tap('#compose');
  await page.waitForSelector('#composer', { timeout: 5000 });
  const cw = await page.evaluate(() => document.querySelector('#composer').getBoundingClientRect().width);
  check(cw >= 380, `rédaction en plein écran (${Math.round(cw)} px)`);
  await page.fill('#composer [data-f=to] input', 'felix@test.local'); await page.keyboard.press('Enter');
  await page.fill('#cSubj', 'Envoyé du téléphone');
  await page.tap('#ed'); await page.keyboard.type('Bonjour depuis Android');
  await page.evaluate(() => { try { const s = JSON.parse(localStorage.getItem('hamama-settings') || '{}'); } catch (e) {} });
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-7-redaction.png') });
  await page.tap('#cSend');
  await page.waitForSelector('.toast.count .cbar', { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(2500);
  check(await page.locator('.toast.count .cbar').count() > 0, 'décompte d’envoi avec barre de temps (10 s)');
  await page.screenshot({ path: path.join(__dirname, 'shots', 'mob-8-decompte.png') });
  let got = false;
  for (let i = 0; i < 50 && !got; i++) { await page.waitForTimeout(500); got = await page.locator('#list .it', { hasText: 'Envoyé du téléphone' }).count() > 0; }
  check(got, 'message envoyé puis reçu en temps réel (IDLE)');

  console.log(`\n${ok} ✅  ${ko} ❌`);
  await browser.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
