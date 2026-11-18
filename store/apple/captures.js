// Captures App Store : iPhone 6,9" (1320×2868) et iPad 13" (2064×2752)
// Appli mobile (mobile/www) + vrai moteur Node branché par un faux Capacitor, avec le serveur de démo (store/demo-server.js)
// Lancer depuis tests/ : node ../store/demo-server.js &  puis  node ../store/apple/captures.js
const path = require('path'), fs = require('fs'), os = require('os'), Module = require('module');
const { chromium } = require(process.env.PW || 'playwright');
const WWW = path.join(__dirname, '..', '..', 'mobile', 'www');
const OUT = path.join(__dirname, 'captures');
fs.mkdirSync(OUT, { recursive: true });

const EE = require('events');
function engine(){
  const channel = new EE(), app = new EE();
  app.datadir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'hamama-apple-'));
  const orig = Module._resolveFilename;
  Module._resolveFilename = function (r, ...a) { return r === 'bridge' ? 'bridge' : orig.call(this, r, ...a); };
  require.cache.bridge = { id: 'bridge', filename: 'bridge', loaded: true, exports: { channel, app } };
  delete require.cache[path.join(WWW, 'nodejs', 'main.js')];
  require(path.join(WWW, 'nodejs', 'main.js'));
  return channel;
}

const DEVICES = [
  ['iphone', { viewport: { width: 440, height: 956 }, deviceScaleFactor: 3 }],
  ['ipad',   { viewport: { width: 1032, height: 1376 }, deviceScaleFactor: 2 }],
];

(async () => {
  const browser = await chromium.launch();
  for (const [dev, opts] of DEVICES) {
    const channel = engine(); let toPage = () => {};
    channel.post = (eventName, ...args) => toPage({ eventName, args });
    const ctx = await browser.newContext({ ...opts, isMobile: true, hasTouch: true, locale: 'fr-FR' });
    const page = await ctx.newPage();
    await page.exposeBinding('__nodeSend', (_s, m) => { channel.emit(m.eventName, ...m.args); });
    toPage = msg => page.evaluate(m => window.__nodeMsg && window.__nodeMsg(m), msg).catch(() => {});
    await page.addInitScript(() => {
      const L = {};
      window.__nodeMsg = m => (L.message || []).forEach(f => f(m));
      window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'ios', Plugins: {
        Nodejs: { addListener: (n, f) => { (L[n] = L[n] || []).push(f); }, isReady: async () => ({ ready: true }), send: async m => window.__nodeSend(m) },
        Filesystem: { writeFile: async o => ({ uri: 'file:///cache/' + o.path }) }, Share: { share: async () => {} },
        LocalNotifications: { requestPermissions: async () => ({ display: 'granted' }), schedule: async () => {}, addListener() {} },
        App: { addListener() {}, minimizeApp() {}, getInfo: async () => ({ version: '1.0.0' }) } } };
    });
    await page.route('http://hamama.app/**', r => {
      const f = path.join(WWW, new URL(r.request().url()).pathname.replace(/^\/$/, '/index.html'));
      if (!fs.existsSync(f)) return r.fulfill({ status: 404 });
      const ct = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' }[path.extname(f)] || 'application/octet-stream';
      r.fulfill({ body: fs.readFileSync(f), contentType: ct });
    });
    const shot = async n => { await page.waitForTimeout(800); await page.screenshot({ path: path.join(OUT, `${dev}-${n}.png`) }); };
    await page.goto('http://hamama.app/'); await page.waitForTimeout(800);
    await page.tap('#welcomeProvs [data-p=autre]'); await page.waitForSelector('[data-k=email]');
    await page.fill('[data-k=name]', 'Alex Martin'); await page.fill('[data-k=email]', 'alex@exemple.fr'); await page.fill('[data-k=pass]', 'demo');
    await page.evaluate(() => { document.querySelector('details.adv').open = true; });
    await page.fill('[data-k=ih]', '127.0.0.1'); await page.fill('[data-k=ip]', '1143'); await page.selectOption('[data-k=is]', '0');
    await page.fill('[data-k=sh]', '127.0.0.1'); await page.fill('[data-k=sp]', '1025'); await page.selectOption('[data-k=ss]', '0');
    await page.check('[data-k=insecure]'); await page.tap('[data-ok]');
    await page.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 }); await page.waitForTimeout(3500);
    await shot('1-boite');
    await page.locator('#list .it', { hasText: 'Maquettes du nouveau site' }).tap(); await shot('2-lecture');
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('hamama-back', { cancelable: true })));
    if (dev === 'iphone') { await page.tap('#sideBtn'); await shot('3-dossiers'); await page.evaluate(() => window.dispatchEvent(new CustomEvent('hamama-back', { cancelable: true }))); }
    await page.tap('#compose'); await page.waitForSelector('#composer');
    await page.fill('#composer [data-f=to] input', 'camille@studio-lumen.fr'); await page.keyboard.press('Enter');
    await page.fill('#cSubj', 'Week-end à Lyon'); await page.tap('#ed'); await page.keyboard.type('Bonjour Camille,\n\nOn se retrouve samedi à 9 h sur le quai ?\n\nAlex');
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await shot('4-redaction');
    await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('hamama-settings') || '{}'); s.theme = 'ciel'; s.accent = '#3b74d6'; localStorage.setItem('hamama-settings', JSON.stringify(s)); });
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('hamama-back', { cancelable: true })));
    await page.reload(); await page.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 }); await page.waitForTimeout(1500);
    await shot('5-theme-ciel');
    await ctx.close();
  }
  await browser.close(); process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
