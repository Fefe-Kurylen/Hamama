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

  const D = path.join(__dirname, 'tour'); const shot = async n => { await page.waitForTimeout(500); await page.screenshot({ path: path.join(D, n + '.png') }); };
  await shot('03-liste');
  // lecture : mail large (lettre d'information 640 px)
  await page.locator('#list .it', { hasText: 'Paddle' }).first().tap(); await page.waitForTimeout(1200); await shot('04-lecture-large');
  const fitInfo = await page.evaluate(() => { const f = document.getElementById('mframe'); const b = f.contentDocument.body; return { iframe: f.clientWidth, body: b.style.width, tr: b.style.transform, h: f.style.height }; });
  console.log('FIT', JSON.stringify(fitInfo));
  await page.tap('.vtop [data-v=back]'); await page.waitForTimeout(500);
  await page.locator('#list .it', { hasText: 'Planning' }).first().tap(); await page.waitForTimeout(1200); await shot('05-lecture-tableau');
  await page.tap('.vtop [data-v=more]'); await shot('06-menu-plus'); await page.keyboard.press('Escape'); await page.mouse.click(5, 400); await page.waitForTimeout(300);
  await page.tap('.vbot [data-v=reply]'); await page.waitForSelector('#composer'); await shot('07-reponse'); console.log('PAD', JSON.stringify(await page.evaluate(() => ({ sat: getComputedStyle(document.documentElement).getPropertyValue('--sat'), satv: getComputedStyle(document.querySelector('#composer .chead')).paddingTop, kb: document.getElementById('composer').className, sh: screen.height, vv: visualViewport.height, top: document.getElementById('composer').style.top }))));
  await page.tap('#composer [data-c=close]'); await page.waitForTimeout(800);
  await page.tap('.vtop [data-v=back]'); await page.waitForTimeout(500);
  await page.tap('#compose'); await page.waitForSelector('#composer'); await shot('08-nouveau');
  await page.tap('#composer [data-c=close]'); await page.waitForTimeout(800);
  await page.tap('#sideBtn'); await page.waitForTimeout(500); await shot('09-boites'); console.log('BX', JSON.stringify(await page.evaluate(() => ['main','#side','#folders','#side .sfoot','#compose','header'].map(q => { const e = document.querySelector(q); const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return q + ' ' + Math.round(r.top) + '-' + Math.round(r.bottom) + ' pos=' + cs.position + ' disp=' + cs.display; }))));
  await page.tap('.bxbtn'); await page.waitForTimeout(700); await shot('10-reglages');
  await browser.close(); process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
