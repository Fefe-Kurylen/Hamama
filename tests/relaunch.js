// Vérifie le redémarrage : comptes chiffrés relus, liste affichée depuis le cache puis actualisée
const path = require('path'), fs = require('fs'), os = require('os');
const { _electron } = require(process.env.PW || 'playwright');
const ok = (c, m) => { console.log((c ? '✅ ' : '❌ ') + m); if (!c) process.exitCode = 1; };
const exe = require(path.join(__dirname, '..', 'windows', 'node_modules', 'electron'));
(async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), 'hamama-re-'));
  const launch = () => _electron.launch({ executablePath: exe, args: ['--no-sandbox', '--lang=fr-FR', path.join(__dirname, '..', 'windows')], env: { ...process.env, HAMAMA_DATA: data } });
  let app = await launch(), win = await app.firstWindow();
  await win.waitForSelector('#welcome:not(.hidden)');
  await win.click('#welcomeProvs [data-p=autre]');
  await win.fill('[data-k=email]', 'felix@test.local'); await win.fill('[data-k=pass]', 'secret');
  await win.click('details.adv summary');
  await win.fill('[data-k=ih]', '127.0.0.1'); await win.fill('[data-k=ip]', '1143'); await win.selectOption('[data-k=is]', '0');
  await win.fill('[data-k=sh]', '127.0.0.1'); await win.fill('[data-k=sp]', '1025'); await win.selectOption('[data-k=ss]', '0');
  await win.check('[data-k=insecure]'); await win.click('[data-ok]');
  await win.waitForSelector('#list .it', { timeout: 30000 }); await win.waitForTimeout(1500);
  await app.close();
  const acc = JSON.parse(fs.readFileSync(path.join(data, 'accounts.json'), 'utf8'))[0];
  ok(acc && !JSON.stringify(acc).includes('secret'), 'mot de passe non stocké en clair (' + acc.passEnc.slice(0, 3) + ')');
  const t0 = Date.now();
  app = await launch(); win = await app.firstWindow();
  await win.waitForSelector('#list .it', { timeout: 30000 });
  ok(true, `redémarrage : liste visible en ${Date.now() - t0} ms`);
  const t = await win.$$eval('#list .it', l => l.length); ok(t >= 9, t + ' messages');
  await app.close();
})().catch(e => { console.error(e); process.exit(1); });
