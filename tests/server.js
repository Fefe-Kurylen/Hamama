'use strict';
// Serveur IMAP + SMTP de test pour Hamama (hoodiecrow) avec des mails d'exemple réalistes
const hoodiecrow = require('hoodiecrow-imap');
const MailComposer = require('nodemailer/lib/mail-composer');
const PORT = +process.env.IMAP_PORT || 1143, SMTP = +process.env.SMTP_PORT || 1025;

const build = m => new Promise((res, rej) => new MailComposer(m).compile().build((e, b) => e ? rej(e) : res(b.toString('binary'))));
const ago = h => new Date(Date.now() - h * 3600e3);
const ME = { name: 'Félix', address: 'felix@test.local' };
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

const SAMPLES = [
  { h: 0.3, from: { name: 'Sabrine Haddad', address: 'sabrine@exemple.fr' }, subject: 'Cours d’arabe de jeudi', text: 'Salam Félix,\n\nOn garde bien le cours de jeudi à 18h ? J’ai préparé la suite du chapitre sur les verbes.\n\nÀ jeudi,\nSabrine' },
  { h: 1.2, from: { name: 'Framatome — Planning', address: 'planning@framatome.example' }, subject: 'Planning des interventions — semaine 48', html: '<div style="font-family:Arial"><h2 style="color:#1f4e79">Planning semaine 48</h2><p>Bonjour,</p><p>Voici le planning des interventions CND pour la semaine prochaine :</p><table border="1" cellpadding="6" style="border-collapse:collapse"><tr style="background:#dbe5f1"><th>Jour</th><th>Site</th><th>Mission</th></tr><tr><td>Lundi</td><td>Tricastin</td><td>Contrôle ultrasons</td></tr><tr><td>Mercredi</td><td>Cruas</td><td>Ressuage</td></tr><tr><td>Vendredi</td><td>Agence</td><td>Rapports</td></tr></table><p>Merci de confirmer ta disponibilité.</p><p>Cordialement,<br>L’équipe planning</p></div>', attachments: [{ filename: 'planning-S48.pdf', content: Buffer.from('%PDF-1.4\n% planning\n'), contentType: 'application/pdf' }], flagged: true },
  { h: 3, from: { name: 'Leboncoin', address: 'noreply@leboncoin.example' }, subject: 'Nouveau message pour votre annonce « BMW X1 F48 »', html: '<div style="font-family:Helvetica;max-width:560px;margin:auto"><div style="background:#ff6e14;color:#fff;padding:18px;font-size:20px;font-weight:bold">leboncoin</div><div style="padding:20px"><p>Bonjour Félix,</p><p>Vous avez reçu un nouveau message concernant votre annonce <b>BMW X1 F48 2020</b> :</p><blockquote style="border-left:4px solid #ff6e14;margin:0;padding:8px 14px;color:#444">Bonjour, le véhicule est-il toujours disponible ? Je peux passer le voir samedi.</blockquote><p><a href="https://www.leboncoin.fr" style="display:inline-block;background:#ff6e14;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Répondre</a></p><img src="https://tracking.example.com/pixel.gif" width="1" height="1"></div></div>', listUnsub: true },
  { h: 7, from: { name: 'Club de natation Arles', address: 'contact@natation-arles.example' }, subject: 'Rappel : piscine jeudi pour Zain 🏊', text: 'Bonjour,\n\nPetit rappel : la séance de jeudi a lieu à 17h30. Pensez au bonnet !\n\nSportivement,\nLe club' , seen: true },
  { h: 26, from: { name: 'Stripe', address: 'notifications@stripe.example' }, subject: 'Votre lien de paiement est prêt', html: '<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:520px;margin:auto;padding:24px"><h1 style="font-size:22px;color:#0a2540">Lien de paiement créé ✅</h1><p style="color:#425466">Votre Payment Link « Soutenir Pyramid PDF » est actif. Apple Pay et les cartes bancaires sont activés.</p><p style="text-align:center"><span style="display:inline-block;background:#635bff;color:#fff;padding:12px 20px;border-radius:6px">Voir dans le Dashboard</span></p></div>', seen: true },
  { h: 30, from: { name: 'Microsoft Partner Center', address: 'partnercenter@microsoft.example' }, subject: 'Soumission Pyramid PDF : certification en cours', text: 'Votre soumission 1.3.0 de Pyramid PDF est en cours de certification. Nous vous informerons dès que la publication sera terminée.', seen: true, answered: true },
  { h: 50, from: { name: 'Agence immobilière Salon', address: 'location@immo-salon.example' }, subject: 'Visite T3 non meublé — Salon-de-Provence', text: 'Bonjour Monsieur,\n\nSuite à votre demande, nous vous proposons une visite du T3 rue des Frères Kennedy samedi à 10h.\nLoyer 820 € CC, disponible au 1er décembre.\n\nBien cordialement,\nAgence', attachments: [{ filename: 'photo-sejour.png', content: png, contentType: 'image/png' }], seen: true },
  { h: 100, from: { name: 'GitHub', address: 'noreply@github.example' }, subject: '[Fefe-Kurylen/Pyramid] Workflow windows-store : réussi', text: 'Le workflow windows-store.yml s’est terminé avec succès.\nArtifact : Pyramid-PDF-Store-1.3.0.appx', seen: true },
  { h: 180, from: { name: 'Décathlon', address: 'newsletter@decathlon.example' }, subject: 'Paddle, calanques : préparez la saison 🌊', html: '<div style="font-family:Arial;max-width:600px;margin:auto"><div style="background:#0082c3;color:#fff;padding:26px;text-align:center;font-size:24px">Préparez la saison</div><p style="padding:16px">Jusqu’à -30 % sur les paddles gonflables et accessoires.</p></div>', seen: true, listUnsub: true },
];

(async () => {
  const msgs = [];
  for (const s of SAMPLES) {
    const raw = await build({ from: s.from, to: ME, subject: s.subject, text: s.text, html: s.html, attachments: s.attachments, date: ago(s.h), messageId: `<${Math.random().toString(36).slice(2)}@exemple.fr>`, headers: s.listUnsub ? { 'List-Unsubscribe': '<https://exemple.fr/desabonnement>' } : {} });
    const flags = []; if (s.seen) flags.push('\\Seen'); if (s.flagged) flags.push('\\Flagged'); if (s.answered) flags.push('\\Answered');
    msgs.unshift({ raw, flags, internaldate: ago(s.h) });
  }
  msgs.reverse(); // plus ancien d'abord
  const sentRaw = await build({ from: ME, to: { name: 'Sabrine Haddad', address: 'sabrine@exemple.fr' }, subject: 'Re: Devoirs', text: 'Merci Sabrine, je m’y mets ce soir.', date: ago(60) });
  const server = hoodiecrow({
    plugins: ['ID', 'IDLE', 'MOVE', 'UIDPLUS', 'SPECIAL-USE', 'NAMESPACE', 'UNSELECT', 'ENABLE', 'LITERALPLUS', 'STARTTLS', 'LIST-STATUS'],
    users: { 'felix@test.local': { password: 'secret' }, testuser: { password: 'testpass' } },
    storage: {
      INBOX: { messages: msgs.sort((a, b) => a.internaldate - b.internaldate).map(m => ({ raw: m.raw, flags: m.flags, internaldate: m.internaldate })) },
      '': { separator: '/', folders: {
        'Sent': { 'special-use': '\\Sent', messages: [{ raw: sentRaw, flags: ['\\Seen'] }] },
        'Drafts': { 'special-use': '\\Drafts' },
        'Trash': { 'special-use': '\\Trash' },
        'Junk': { 'special-use': '\\Junk' },
        'Archive': { 'special-use': '\\Archive' },
        'Projets': { folders: { 'Pyramid': {}, 'Merifa': {} } }
      } }
    }
  });
  server.listen(PORT, () => console.log('IMAP', PORT));
  require('hoodiecrow-imap/lib/hoodiecrowSMTPServer').startSMTPServer(SMTP, server);
  process.on('SIGTERM', () => process.exit(0));
})();
