// Vérifie les langues : passage en anglais puis en arabe, recherche des textes non traduits
const path = require('path'), fs = require('fs'), os = require('os');
const { _electron } = require(process.env.PW || 'playwright');
const SHOTS = path.join(__dirname, 'shots');
const ok = (c, m) => { console.log((c ? '✅ ' : '❌ ') + m); if (!c) process.exitCode = 1; };
const exe = require(path.join(__dirname, '..', 'windows', 'node_modules', 'electron'));
(async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), 'hamama-i18n-'));
  const app = await _electron.launch({ executablePath: exe, args: ['--no-sandbox', '--lang=fr-FR', path.join(__dirname, '..', 'windows')], env: { ...process.env, HAMAMA_DATA: data } });
  let win = await app.firstWindow();
  const errs = []; const hook = w => { w.on('pageerror', e => errs.push(e.message)); }; hook(win);
  await win.setViewportSize({ width: 1440, height: 900 }).catch(() => {});
  await win.waitForSelector('#welcome:not(.hidden)');
  ok(/Bienvenue/.test(await win.textContent('#welcome h1')), 'français par défaut');
  await win.click('#welcomeProvs [data-p=autre]');
  await win.fill('[data-k=name]', 'Félix'); await win.fill('[data-k=email]', 'felix@test.local'); await win.fill('[data-k=pass]', 'secret');
  await win.click('details.adv summary');
  await win.fill('[data-k=ih]', '127.0.0.1'); await win.fill('[data-k=ip]', '1143'); await win.selectOption('[data-k=is]', '0');
  await win.fill('[data-k=sh]', '127.0.0.1'); await win.fill('[data-k=sp]', '1025'); await win.selectOption('[data-k=ss]', '0');
  await win.check('[data-k=insecure]'); await win.click('[data-ok]');
  await win.waitForSelector('#list .it', { timeout: 30000 }); await win.waitForTimeout(800);
  const leftovers = async (lang) => {
    return win.evaluate(() => {
      const out = new Set();
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n; while ((n = w.nextNode())){
        const t = n.nodeValue.trim(); if (!t || !/[a-zà-ÿ]{3}/i.test(t)) continue;
        const el = n.parentElement; if (!el || el.closest('[data-notr],#ed,textarea,script,style,iframe')) continue;
        if (!el.offsetParent && el.tagName !== 'OPTION') continue;
        if (/[éèàêçùôîœ]|\b(le|la|les|des|du|un|une|et|pour|dans|avec|sur|aux)\b/i.test(t)) out.add(t);
      }
      document.querySelectorAll('[title],[data-tip],[placeholder]').forEach(e => { if (e.closest('[data-notr]')) return; for (const a of ['title','data-tip','placeholder']){ const v = e.getAttribute(a); if (v && /[éèàêçùôîœ’]/.test(v)) out.add('@' + a + ': ' + v); } });
      return [...out];
    });
  };
  for (const [code, label, check] of [['en', 'English', 'New message'], ['ar', 'العربية', 'رسالة جديدة']]){
    await win.click('#setBtn'); await win.click('[data-tab=lang]'); await win.waitForTimeout(200);
    const nav = win.waitForEvent('load').catch(() => {});
    await win.click(`[data-lang=${code}]`);
    await nav; await win.waitForSelector('#list .it', { timeout: 30000 }); await win.waitForTimeout(1200);
    ok((await win.textContent('#compose')).includes(check), `${label} : bouton « ${check} »`);
    await win.click('#list .it >> nth=1'); await win.waitForSelector('#mframe'); await win.waitForTimeout(800);
    await win.screenshot({ path: path.join(SHOTS, `20-langue-${code}.png`) });
    const l1 = await leftovers();
    await win.click('#setBtn'); await win.waitForTimeout(300);
    for (const t of ['look','list','read','write','accounts','blocked','notif','lang','keys','about']){ await win.click(`[data-tab=${t}]`); await win.waitForTimeout(120); l1.push(...await leftovers()); }
    await win.click('[data-tab=look]'); await win.screenshot({ path: path.join(SHOTS, `21-reglages-${code}.png`) });
    await win.keyboard.press('Escape');
    await win.keyboard.press('n'); await win.waitForSelector('#composer'); await win.waitForTimeout(200); l1.push(...await leftovers());
    await win.screenshot({ path: path.join(SHOTS, `22-redaction-${code}.png`) });
    await win.click('#composer [data-c=close]'); await win.waitForTimeout(300);
    await win.click('#list .it >> nth=2', { button: 'right' }); await win.waitForTimeout(200); l1.push(...await leftovers()); await win.keyboard.press('Escape'); await win.mouse.click(5, 400);
    await win.click('#list .it >> nth=1'); await win.waitForSelector('#mframe'); await win.click('.vbar [data-v=more]'); await win.waitForTimeout(200); l1.push(...await leftovers());
    const menuTxt = await win.textContent('.menu'); ok(!/Bloquer|Débloquer/.test(menuTxt), `${label} : menu de blocage traduit`); await win.keyboard.press('Escape'); await win.mouse.click(5, 400);
    const uniq = [...new Set(l1)];
    ok(uniq.length === 0, `${label} : textes restés en français : ${uniq.length}${uniq.length ? '\n   - ' + uniq.join('\n   - ') : ''}`);
    if (code === 'ar') ok(await win.evaluate(() => document.documentElement.dir) === 'rtl', 'arabe : affichage de droite à gauche');
  }
  // retour au français
  await win.click('#setBtn'); await win.click('[data-tab=lang]'); const nav = win.waitForEvent('load').catch(() => {}); await win.click('[data-lang=fr]'); await nav;
  await win.waitForSelector('#list .it', { timeout: 30000 });
  ok((await win.textContent('#compose')).includes('Nouveau message'), 'retour au français');
  ok(errs.length === 0, 'aucune erreur JavaScript' + (errs.length ? ' : ' + errs.join(' / ') : ''));
  await app.close();
})().catch(e => { console.error('ERREUR', e); process.exit(1); });
