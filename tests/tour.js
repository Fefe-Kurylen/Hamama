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
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR' });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('ERREUR PAGE', e.stack));
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
  await page.addInitScript(() => { if (window !== top) return; addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'html{--safe-area-inset-top:47px!important;--safe-area-inset-bottom:34px!important}'; document.head.appendChild(st); }); });
  await page.goto('http://hamama.app/');
  await page.waitForTimeout(800);
  check(await page.evaluate(() => document.documentElement.classList.contains('mobile') || document.body.classList.contains('mobile')), 'mode téléphone détecté');
  await page.screenshot({ path: path.join(__dirname, 'tour', 't-1-accueil.png') });

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
  await page.screenshot({ path: path.join(__dirname, 'tour', 't-2-compte.png') });
  await page.tap('[data-ok]');
  // l'appli s'ouvre sur la liste des boîtes, puis on entre dans la boîte de réception
  await page.waitForSelector('#side .fold[data-box]', { timeout: 30000 });
  await page.waitForTimeout(600);
  check(await page.evaluate(() => document.documentElement.classList.contains('boxes') && document.getElementById('side').getBoundingClientRect().width >= 380), 'ouverture sur la liste des boîtes (plein écran)');
  await page.screenshot({ path: path.join(__dirname, 'tour', 't-3a-boites.png') });
  await page.locator('#side [data-uni], #side .fold[data-box]').first().tap();
  await page.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 });
  await page.waitForTimeout(800);


  const D = path.join(__dirname, 'tour'); let si = 10;
  const shot = async n => { await page.waitForTimeout(450); await page.screenshot({ path: path.join(D, String(si++) + '-' + n + '.png') }); };
  const back = async () => { const b = page.locator('.vtop [data-v=back]'); if (await b.count()) await b.tap(); await page.waitForTimeout(400); };
  const esc = async () => { await page.evaluate(() => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))); await page.waitForTimeout(300); };
  await shot('liste');
  await page.tap('#selModeBtn'); await page.locator('#list .it').nth(1).tap(); await shot('selection'); await page.tap('#selModeBtn').catch(() => {}); await esc();
  await page.locator('#list .it').nth(2).dispatchEvent('contextmenu'); await shot('menu-appui-long'); await esc();
  await page.tap('#chips [data-f=unread]'); await shot('filtre-non-lus'); await page.tap('#chips [data-f=all]');
  await page.tap('#q'); await page.keyboard.type('planning'); await page.keyboard.press('Enter'); await page.waitForTimeout(1500); await shot('recherche');
  await page.fill('#q', ''); await page.keyboard.press('Enter'); await page.waitForTimeout(800); await page.locator('#q').blur();
  for (const [t, n] of [['Sabrine', 'lecture-texte'], ['Planning', 'lecture-tableau-pj'], ['Leboncoin', 'lecture-images-bloquees'], ['Paddle', 'lecture-newsletter'], ['Stripe', 'lecture-stripe'], ['Agence', 'lecture-image-jointe']]){
    await page.locator('#list .it', { hasText: t }).first().tap(); await page.waitForTimeout(1300); await shot(n);
    if (n === 'lecture-texte'){ await page.evaluate(() => document.getElementById('vscroll').scrollTo(0, 9999)); await shot('lecture-texte-bas'); }
    await back();
  }
  await page.locator('#list .it', { hasText: 'Planning' }).first().tap(); await page.waitForTimeout(1000);
  await page.tap('.vtop [data-v=more]'); await shot('lecture-menu-plus'); await esc();
  await page.tap('.vbot [data-v=move]'); await shot('deplacer'); await esc();
  await page.tap('.vbot [data-v=reply]'); await page.waitForSelector('#composer'); await shot('reponse');
  await page.tap('.qmore').catch(() => {}); await shot('reponse-citation');
  await page.tap('#composer [data-c=close]'); await page.waitForTimeout(700);
  await page.tap('.vbot [data-v=all]'); await page.waitForSelector('#composer'); await shot('reponse-tous'); await page.tap('#composer [data-c=close]'); await page.waitForTimeout(700);
  await page.tap('.vbot [data-v=fwd]'); await page.waitForSelector('#composer'); await shot('transfert'); await page.tap('#composer [data-c=close]'); await page.waitForTimeout(700);
  await back();
  await page.tap('#compose'); await page.waitForSelector('#composer'); await page.tap('#composer [data-cc]').catch(() => {});
  await page.locator('[data-f=to] input').fill('sab'); await page.waitForTimeout(600); await shot('nouveau-autocompletion');
  await page.locator('[data-f=to] input').fill('test@exemple.fr'); await page.keyboard.press('Enter'); await page.tap('#cSubj'); await page.keyboard.type('Essai'); await page.tap('#ed'); await page.keyboard.type('Bonjour, voici un essai.'); await shot('nouveau-rempli');
  await page.tap('#composer [data-c=close]'); await page.waitForTimeout(900);
  await page.tap('#sideBtn'); await page.waitForTimeout(500); await shot('boites');
  await page.tap('.bxbtn'); await page.waitForTimeout(700);
  for (const t of ['look', 'list', 'read', 'write', 'accounts', 'blocked', 'notif', 'lang', 'about']){ await page.tap(`[data-tab=${t}]`).catch(() => {}); await shot('reglages-' + t); }
  await page.tap(`[data-tab=look]`); await page.tap('[data-th=clair]').catch(() => {}); await page.waitForTimeout(400); await esc(); await page.locator('.modal [data-close], .modal .btn.primary').last().tap().catch(() => {}); await page.waitForTimeout(400); await shot('boites-clair');
  await page.locator('#side .fold[data-box]').first().tap(); await page.waitForTimeout(800); await shot('liste-clair');
  await page.locator('#list .it', { hasText: 'Planning' }).first().tap(); await page.waitForTimeout(1200); await shot('lecture-clair');
  await browser.close(); process.exit(0);
})().catch(async e => { console.error(e); process.exit(1); });
