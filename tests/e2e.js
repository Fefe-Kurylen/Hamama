// Test de bout en bout : Hamama (Electron) + serveur IMAP/SMTP local (tests/server.js)
// Lancer : xvfb-run -a node tests/e2e.js
const path = require('path'), fs = require('fs'), os = require('os');
const { _electron } = require(process.env.PW || 'playwright');
const SHOTS = path.join(__dirname, 'shots');
const ok = (c, m) => { console.log((c ? '✅ ' : '❌ ') + m); if (!c) process.exitCode = 1; };
(async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), 'hamama-e2e-'));
  const app = await _electron.launch({ executablePath: require(path.join(__dirname, '..', 'windows', 'node_modules', 'electron')), args: ['--no-sandbox', '--lang=fr-FR', path.join(__dirname, '..', 'windows')], env: { ...process.env, HAMAMA_DATA: data, HAMAMA_DEBUG: '1' } });
  const win = await app.firstWindow();
  const errs = []; win.on('pageerror', e => errs.push(e.message)); win.on('console', m => { if (m.type() === 'error' && !/Content Security Policy/.test(m.text())) errs.push(m.text()); });
  await win.setViewportSize({ width: 1440, height: 900 }).catch(() => {});
  await win.waitForSelector('#welcome:not(.hidden)');
  await win.waitForTimeout(400);
  await win.screenshot({ path: path.join(SHOTS, '01-accueil.png') });
  ok(true, 'écran d’accueil affiché');
  // Ajout d'un compte « Autre »
  await win.click('#welcomeProvs [data-p=autre]');
  await win.fill('[data-k=name]', 'Félix');
  await win.fill('[data-k=email]', 'felix@test.local');
  await win.fill('[data-k=pass]', 'secret');
  await win.$eval('details.adv', d => { d.open = true; });
  await win.fill('[data-k=ih]', '127.0.0.1'); await win.fill('[data-k=ip]', '1143'); await win.selectOption('[data-k=is]', '0');
  await win.fill('[data-k=sh]', '127.0.0.1'); await win.fill('[data-k=sp]', '1025'); await win.selectOption('[data-k=ss]', '0');
  await win.check('[data-k=insecure]');
  await win.screenshot({ path: path.join(SHOTS, '02-ajout-compte.png') });
  await win.click('[data-ok]');
  try { await win.waitForSelector('#app:not(.hidden) #list .it', { timeout: 30000 }); } catch (e) { await win.screenshot({ path: path.join(SHOTS, 'fail.png') }); console.log('ERRS', errs); throw e; }
  await win.waitForTimeout(800);
  const n = await win.$$eval('#list .it', l => l.length);
  ok(n >= 9, `liste chargée (${n} messages)`);
  const folders = await win.$$eval('#folders .fold', l => l.map(e => e.textContent.trim()));
  ok(folders.some(f => f.startsWith('Boîte de réception')) && folders.some(f => f.startsWith('Envoyés')), 'dossiers : ' + folders.join(' · '));
  // Ouvrir le mail HTML (Planning)
  await win.click('#list .it:has-text("Planning des interventions")');
  await win.waitForSelector('#mframe');
  await win.waitForTimeout(900);
  const fh = await win.$eval('#mframe', f => f.getBoundingClientRect().height);
  ok(fh > 150, 'message HTML affiché (iframe ' + Math.round(fh) + ' px)');
  ok(await win.$('.atts .att') !== null, 'pièce jointe affichée');
  await win.screenshot({ path: path.join(SHOTS, '03-lecture-graphite.png') });
  // Leboncoin : images bloquées
  await win.click('#list .it:has-text("BMW X1")');
  await win.waitForSelector('.banner');
  ok(await win.$('.banner:has-text("Images distantes bloquées")') !== null, 'pixel espion bloqué + bandeau');
  ok(await win.$('[data-unsub]') !== null, 'bouton « Se désabonner »');
  await win.waitForTimeout(500);
  await win.screenshot({ path: path.join(SHOTS, '04-images-bloquees.png') });
  // Suivre (étoile) via le clavier
  await win.focus('#list'); await win.keyboard.press('s'); await win.waitForTimeout(600);
  ok(await win.$('#list .it.on .star') !== null, 'raccourci S : message suivi');
  // Rédaction + envoi
  await win.keyboard.press('n');
  await win.waitForSelector('#composer');
  // Déplacer la fenêtre « Nouveau message » par sa barre de titre
  await win.waitForTimeout(700);
  const b0 = await win.$eval('#composer', e => { const r = e.getBoundingClientRect(); return [r.left, r.top]; });
  const hb = await (await win.$('#composer .chead b')).boundingBox();
  await win.mouse.move(hb.x + 20, hb.y + 8); await win.mouse.down();
  await win.mouse.move(hb.x - 200, hb.y - 50, { steps: 8 }); await win.mouse.up();
  const b1 = await win.$eval('#composer', e => { const r = e.getBoundingClientRect(); return [r.left, r.top]; });
  ok(Math.abs(b1[0] - b0[0] + 220) < 4 && Math.abs(b1[1] - b0[1] + 58) < 4, `fenêtre de rédaction déplacée (${Math.round(b0[0])},${Math.round(b0[1])} → ${Math.round(b1[0])},${Math.round(b1[1])})`);
  await win.screenshot({ path: path.join(SHOTS, '05b-redaction-deplacee.png') });
  // Agrandir par le coin bas-droit
  const rz = await (await win.$('#composer .rz[data-d=se]')).boundingBox();
  const w0 = await win.$eval('#composer', e => e.getBoundingClientRect().width);
  await win.mouse.move(rz.x + 7, rz.y + 7); await win.mouse.down(); await win.mouse.move(rz.x + 127, rz.y + 7, { steps: 6 }); await win.mouse.up();
  const w1 = await win.$eval('#composer', e => e.getBoundingClientRect().width);
  ok(Math.abs(w1 - w0 - 120) < 4, `fenêtre de rédaction agrandie (${Math.round(w0)} → ${Math.round(w1)} px)`);
  await win.fill('#cSubj', 'Test titre');
  ok(await win.$eval('#cTitle', e => e.textContent) === 'Nouveau message', 'titre de la fenêtre : « Nouveau message » (pas l’objet)');
  await win.fill('#composer [data-f=to] input', 'felix@test.local'); await win.keyboard.press('Enter');
  await win.fill('#cSubj', 'Bonjour depuis Hamama ✉️');
  await win.click('#ed'); await win.keyboard.type('Ceci est un test d’envoi réel. ');
  await win.keyboard.press('Control+b'); await win.keyboard.type('En gras !'); await win.keyboard.press('Control+b');
  await win.screenshot({ path: path.join(SHOTS, '05-redaction.png') });
  await win.evaluate(() => { window.__hamama.SET.undoSend = '0'; });
  await win.keyboard.press('Control+Enter');
  await win.waitForSelector('.toast:has-text("Message envoyé")', { timeout: 20000 });
  ok(true, 'message envoyé (SMTP)');
  // Arrivée en temps réel (IDLE)
  await win.waitForSelector('#list .it:has-text("Bonjour depuis Hamama")', { timeout: 20000 });
  ok(true, 'réception en temps réel du message envoyé');
  // Répondre (R)
  await win.click('#list .it:has-text("Bonjour depuis Hamama")'); await win.waitForSelector('#mframe'); await win.waitForTimeout(500);
  const body = await win.$eval('#mframe', f => f.contentDocument.body.innerText);
  ok(/En gras/.test(body), 'contenu du message reçu correct');
  await win.focus('#list'); await win.keyboard.press('r'); await win.waitForSelector('#composer');
  const subj = await win.$eval('#cSubj', i => i.value); ok(/^Re : Bonjour/.test(subj), 'réponse : objet « ' + subj + ' »');
  ok(await win.$eval('#cTitle', e => e.textContent) === 'Réponse', 'titre de la fenêtre : « Réponse »');
  const quoted = await win.$eval('#ed', e => e.innerHTML); ok(/a écrit/.test(quoted) && /blockquote/.test(quoted), 'citation du message d’origine');
  await win.keyboard.type('Merci, bien reçu.');
  await win.click('#composer [data-c=close]');   await win.waitForSelector('.toast:has-text("Brouillon enregistré")', { timeout: 15000 });
  ok(true, 'brouillon enregistré à la fermeture');
  // Archiver avec E puis annuler
  const before = await win.$$eval('#list .it', l => l.length);
  await win.focus('#list'); await win.keyboard.press('e');
  await win.waitForSelector('.toast:has-text("archivé")', { timeout: 15000 });
  const after = await win.$$eval('#list .it', l => l.length);
  ok(after === before - 1, 'archivage (E)');
  await win.click('.toast:has-text("archivé") button');
  await win.waitForSelector('.toast:has-text("Restauré")', { timeout: 15000 });
  await win.waitForTimeout(1500);
  ok(await win.$$eval('#list .it', l => l.length) === before, 'annuler l’archivage');
  // Supprimer via le survol
  await win.hover('#list .it:has-text("Décathlon")'); await win.click('#list .it:has-text("Décathlon") [data-q=trash]');
  await win.waitForSelector('.toast:has-text("supprimé")'); ok(true, 'suppression depuis les actions au survol');
  // Recherche
  await win.click('#q'); await win.keyboard.type('Sabrine'); await win.keyboard.press('Enter'); await win.waitForTimeout(1500);
  const rs = await win.$$eval('#list .it', l => l.map(e => e.querySelector('.s').textContent));
  ok(rs.some(s => /arabe/.test(s)), 'recherche : ' + rs.join(' | '));
  await win.keyboard.press('Escape');
  // Dossier Envoyés
  await win.click('#folders .fold:has-text("Envoyés")'); await win.waitForTimeout(1200);
  ok(await win.$('#list .it:has-text("Bonjour depuis Hamama")') !== null, 'copie dans « Envoyés »');
  await win.click('#folders .fold:has-text("Boîte de réception")'); await win.waitForTimeout(1000);
  await win.click('#list .it:has-text("Planning des interventions")'); await win.waitForSelector('#mframe'); await win.waitForTimeout(700);
  // Blocage d'un expéditeur → Indésirables
  await win.click('#list .it:has-text("Leboncoin")', { button: 'right' }); await win.waitForTimeout(200);
  await win.click('.menu button:has-text("Bloquer noreply@leboncoin.example")');
  await win.click('.modal [data-ok]');
  await win.waitForSelector('.toast:has-text("bloqué")', { timeout: 20000 });
  ok(/1 message déplacé dans Indésirables/.test(await win.textContent('.toast:has-text("bloqué")')), 'blocage : message existant déplacé dans Indésirables');
  ok(await win.$('#list .it:has-text("Leboncoin")') === null, 'blocage : retiré de la boîte de réception');
  // un nouveau message de l'expéditeur bloqué arrive
  const nm = require(path.join(__dirname, '..', 'windows', 'node_modules', 'nodemailer'));
  await nm.createTransport({ host: '127.0.0.1', port: 1025, secure: false, tls: { rejectUnauthorized: false } }).sendMail({ from: 'Leboncoin <noreply@leboncoin.example>', to: 'felix@test.local', subject: 'Relance annonce BMW', text: 'spam' });
  await win.waitForTimeout(4000);
  ok(await win.$('#list .it:has-text("Relance annonce BMW")') === null, 'blocage : nouveau message bloqué à l’arrivée (pas dans la réception)');
  await win.click('#folders .fold:has-text("Indésirables")'); await win.waitForTimeout(1500);
  ok(await win.$('#list .it:has-text("Relance annonce BMW")') !== null && await win.$('#list .it:has-text("Nouveau message pour votre annonce")') !== null, 'blocage : les 2 messages sont dans Indésirables');
  await win.click('#list .it:has-text("Relance annonce BMW")'); await win.waitForSelector('[data-unblock]');
  ok(true, 'bandeau « Cet expéditeur est bloqué » + Débloquer');
  await win.screenshot({ path: path.join(SHOTS, '17-bloque.png') });
  await win.click('#setBtn'); await win.click('[data-tab=blocked]'); await win.waitForTimeout(200);
  ok(await win.$('[data-unb="noreply@leboncoin.example"]') !== null, 'Réglages → Bloqués : adresse listée');
  await win.fill('[data-newblock]', 'pub-exemple.com'); await win.click('[data-addblock]'); await win.waitForTimeout(800);
  ok(await win.$('[data-unb="@pub-exemple.com"]') !== null, 'Réglages → Bloqués : ajout d’un domaine entier');
  await win.screenshot({ path: path.join(SHOTS, '18-reglages-bloques.png') });
  await win.click('[data-unb="noreply@leboncoin.example"]'); await win.waitForTimeout(600);
  ok(await win.$('[data-unb="noreply@leboncoin.example"]') === null, 'Débloquer depuis les réglages');
  await win.keyboard.press('Escape');
  await win.click('#folders .fold:has-text("Boîte de réception")'); await win.waitForTimeout(1200);
  // Glisser-déposer vers un dossier
  await win.dragAndDrop('#list .it:has-text("GitHub")', '#folders .fold:has-text("Pyramid")');
  await win.waitForSelector('.toast:has-text("déplacé")', { timeout: 15000 });
  ok(await win.$('#list .it:has-text("GitHub")') === null, 'glisser-déposer vers « Projets / Pyramid »');
  // Sélection multiple
  await win.focus('#list'); await win.keyboard.press('Control+a'); await win.waitForTimeout(300);
  ok(await win.isVisible('#bulk'), 'Ctrl+A : barre de sélection multiple (' + await win.textContent('#bulkN') + ')');
  await win.screenshot({ path: path.join(SHOTS, '14-selection-multiple.png') });
  await win.keyboard.press('Escape'); await win.waitForTimeout(300);
  // Deuxième compte → boîte unifiée
  await win.click('#addAccBtn'); await win.click('.modal [data-p=autre]');
  await win.fill('[data-k=name]', 'Test'); await win.fill('[data-k=email]', 'testuser@autre.local'); await win.fill('[data-k=pass]', 'testpass');
  await win.$eval('details.adv', d => { d.open = true; }); await win.fill('[data-k=user]', 'testuser');
  await win.fill('[data-k=ih]', '127.0.0.1'); await win.fill('[data-k=ip]', '1143'); await win.selectOption('[data-k=is]', '0');
  await win.fill('[data-k=sh]', '127.0.0.1'); await win.fill('[data-k=sp]', '1025'); await win.selectOption('[data-k=ss]', '0');
  await win.check('[data-k=insecure]'); await win.click('[data-ok]');
  try { await win.waitForSelector('#folders [data-uni]', { timeout: 30000 }); } catch (e) { await win.screenshot({ path: path.join(SHOTS, 'fail2.png') }); throw e; }
  await win.click('#folders [data-uni]'); await win.waitForTimeout(2500);
  const un = await win.$$eval('#list .it', l => l.length);
  ok(un >= 14, `boîte unifiée sur 2 comptes (${un} messages)`);
  await win.click('#list .it:has-text("Planning des interventions")'); await win.waitForSelector('#mframe'); await win.waitForTimeout(700);
  await win.screenshot({ path: path.join(SHOTS, '15-boite-unifiee.png') });
  // Réglages + thèmes
  await win.click('#setBtn'); await win.waitForSelector('.card.set'); await win.waitForTimeout(300);
  await win.screenshot({ path: path.join(SHOTS, '06-reglages.png') });
  for (const th of ['clair', 'noir', 'sombre']){
    await win.click(`[data-th=${th}]`); await win.waitForTimeout(250);
    await win.keyboard.press('Escape'); await win.waitForTimeout(500);
    await win.screenshot({ path: path.join(SHOTS, `07-theme-${th}.png`) });
    await win.click('#setBtn'); await win.waitForSelector('.card.set');
  }
  await win.click('[data-th=graphite]');
  await win.click('[data-tab=list]'); await win.waitForTimeout(200); await win.screenshot({ path: path.join(SHOTS, '08-reglages-liste.png') });
  await win.click('[data-tab=look]'); await win.click('.seg[data-key=layout] [data-v=large]'); await win.keyboard.press('Escape'); await win.waitForTimeout(600);
  await win.screenshot({ path: path.join(SHOTS, '09-lecture-en-dessous.png') });
  await win.click('#setBtn'); await win.click('.seg[data-key=layout] [data-v=focus]'); await win.click('.seg[data-key=density] [data-v=compact]'); await win.keyboard.press('Escape'); await win.waitForTimeout(500);
  await win.screenshot({ path: path.join(SHOTS, '10-focus-compact.png') });
  await win.click('#setBtn'); await win.click('.seg[data-key=layout] [data-v=trois]'); await win.click('.seg[data-key=density] [data-v=confort]'); await win.click('[data-sw]').catch(() => {}); await win.click(`[data-a="#4a84c4"]`); await win.keyboard.press('Escape'); await win.waitForTimeout(500);
  await win.screenshot({ path: path.join(SHOTS, '11-accent-bleu.png') });
  // Soutenir
  await win.click('#heartBtn'); await win.waitForTimeout(300); await win.screenshot({ path: path.join(SHOTS, '12-soutenir.png') }); await win.keyboard.press('Escape');
  // Menu contextuel
  await win.click('#list .it:has-text("Stripe")', { button: 'right' }); await win.waitForTimeout(250);
  await win.screenshot({ path: path.join(SHOTS, '13-menu.png') }); await win.keyboard.press('Escape'); await win.mouse.click(5, 300);
  ok(errs.length === 0, 'aucune erreur JavaScript' + (errs.length ? ' : ' + errs.join(' / ') : ''));
  await app.close();
})().catch(e => { console.error('ERREUR', e); process.exit(1); });
