// Captures d'écran pour la fiche Microsoft Store (1920×1080), avec le serveur de démo (store/demo-server.js)
// xvfb-run -a -s "-screen 0 2200x1300x24" node store/captures.js
const path = require('path'), fs = require('fs'), os = require('os');
const { _electron } = require(process.env.PW || 'playwright');
const OUT = path.join(__dirname, 'captures');
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const data = fs.mkdtempSync(path.join(os.tmpdir(), 'hamama-store-'));
  const app = await _electron.launch({ executablePath: require(path.join(__dirname, '..', 'windows', 'node_modules', 'electron')), args: ['--no-sandbox', '--lang=fr-FR', '--force-device-scale-factor=1', path.join(__dirname, '..', 'windows')], env: { ...process.env, HAMAMA_DATA: data } });
  const win = await app.firstWindow();
  await app.evaluate(({ BrowserWindow }) => { const w = BrowserWindow.getAllWindows()[0]; w.setContentSize(1920, 1080); w.center(); });
  await win.waitForSelector('#welcome:not(.hidden)');
  const shot = async n => { await win.waitForTimeout(700); await win.screenshot({ path: path.join(OUT, n + '.png') }); };
  await win.click('#welcomeProvs [data-p=autre]');
  await win.fill('[data-k=name]', 'Alex Martin'); await win.fill('[data-k=email]', 'alex@exemple.fr'); await win.fill('[data-k=pass]', 'demo');
  await win.click('details.adv summary');
  await win.fill('[data-k=ih]', '127.0.0.1'); await win.fill('[data-k=ip]', '1143'); await win.selectOption('[data-k=is]', '0');
  await win.fill('[data-k=sh]', '127.0.0.1'); await win.fill('[data-k=sp]', '1025'); await win.selectOption('[data-k=ss]', '0');
  await win.check('[data-k=insecure]');
  await win.click('[data-ok]');
  await win.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 });
  await win.waitForTimeout(3500);   // la notification « compte ajouté » disparaît
  await win.click('#list .it:has-text("Maquettes du nouveau site")'); await win.mouse.move(1500, 1000);
  await shot('1-lecture');
  await win.keyboard.press('r'); await win.waitForSelector('#composer');
  await win.waitForTimeout(400); await win.keyboard.type('Bonjour Camille,\n\nSuper travail, tout me plaît. Demain 10 h, c’est parfait.\n\nAlex');
  await win.mouse.move(1500, 1000); await shot('2-reponse');
  await win.click('#composer [data-c=close]'); await win.waitForTimeout(800);
  await win.evaluate(() => { const s = JSON.parse(localStorage.getItem('hamama-settings') || '{}'); s.theme = 'clair'; localStorage.setItem('hamama-settings', JSON.stringify(s)); });
  await win.reload(); await win.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 }); await win.waitForTimeout(1500);
  await win.click('#list .it:has-text("Week-end à Lyon")'); await win.mouse.move(1500, 1000);
  await shot('3-theme-clair');
  await win.evaluate(() => { const s = JSON.parse(localStorage.getItem('hamama-settings') || '{}'); s.theme = 'graphite'; localStorage.setItem('hamama-settings', JSON.stringify(s)); });
  await win.reload(); await win.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 }); await win.waitForTimeout(1500);
  await win.click('#list .it:has-text("Banque Horizon")'); await win.waitForTimeout(500);
  await win.click('#setBtn'); await win.mouse.move(1900, 1060);
  await shot('4-personnalisation');
  await app.close();
})().catch(e => { console.error(e); process.exit(1); });
