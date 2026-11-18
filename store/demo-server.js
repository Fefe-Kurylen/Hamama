'use strict';
// Serveur IMAP + SMTP de démonstration (contenu neutre) pour les captures d'écran du Microsoft Store
// Lancer depuis tests/ : node ../store/demo-server.js  (compte alex@exemple.fr / demo)
const hoodiecrow = require('hoodiecrow-imap');
const MailComposer = require('nodemailer/lib/mail-composer');
const build = m => new Promise((res, rej) => new MailComposer(m).compile().build((e, b) => e ? rej(e) : res(b.toString('binary'))));
const ago = h => new Date(Date.now() - h * 3600e3);
const ME = { name: 'Alex Martin', address: 'alex@exemple.fr' };
const pdf = Buffer.from('%PDF-1.4\n%demo\n');
const S = [
  { h: 0.2, from: { name: 'Camille Bernard', address: 'camille@studio-lumen.fr' }, subject: 'Maquettes du nouveau site', html: '<div style="font-family:Arial;font-size:14px;line-height:1.6"><p>Bonjour Alex,</p><p>Voici les maquettes de la page d’accueil et du tarif, avec les retours de jeudi intégrés.</p><ul><li>Nouvelle grille de prix</li><li>Section témoignages</li><li>Version mobile</li></ul><p>On en parle demain à 10 h ?</p><p>Belle journée,<br>Camille</p></div>', attachments: [{ filename: 'maquettes-accueil.pdf', content: pdf }] },
  { h: 1.1, from: { name: 'Léa Moreau', address: 'lea.moreau@exemple.fr' }, subject: 'Week-end à Lyon 🚆', text: 'Salut Alex !\n\nJ’ai réservé les billets pour samedi 9 h 12. On se retrouve sur le quai ?\n\nÀ très vite,\nLéa' },
  { h: 2.5, from: { name: 'Banque Horizon', address: 'info@banque-horizon.example' }, subject: 'Votre relevé de novembre est disponible', html: '<div style="font-family:Segoe UI,Arial;max-width:560px;margin:auto"><div style="background:#0f4c81;color:#fff;padding:18px 22px;font-size:20px;font-weight:bold">Banque Horizon</div><div style="padding:20px 22px;font-size:14px;line-height:1.6"><p>Bonjour,</p><p>Votre relevé de compte de novembre est disponible dans votre espace client.</p><p><a href="#" style="display:inline-block;background:#0f4c81;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Consulter mon relevé</a></p></div></div>', seen: true },
  { h: 5, from: { name: 'Thomas Petit', address: 'thomas.petit@exemple.fr' }, subject: 'Re : Budget 2027', text: 'Bonjour Alex,\n\nMerci pour le tableau, les chiffres me semblent bons. Je valide la ligne communication.\n\nThomas', seen: true, answered: true },
  { h: 9, from: { name: 'Atelier Céramique', address: 'bonjour@atelier-ceramique.example' }, subject: 'Votre inscription au stage de décembre', text: 'Bonjour Alex,\n\nVotre inscription au stage du samedi 13 décembre est confirmée. Prévoyez un tablier !\n\nÀ bientôt', seen: true, flagged: true },
  { h: 27, from: { name: 'Julie Laurent', address: 'julie@exemple.fr' }, subject: 'Photos de l’anniversaire 📸', text: 'Coucou,\n\nJe t’envoie le lien vers l’album dès ce soir. Merci encore pour la soirée !\n\nJulie', seen: true },
  { h: 31, from: { name: 'Librairie du Centre', address: 'contact@librairie-centre.example' }, subject: 'Votre commande est prête à être retirée', text: 'Bonjour,\n\nVotre commande n° 4821 vous attend en magasin.\n\nL’équipe de la Librairie du Centre', seen: true },
  { h: 52, from: { name: 'Nicolas Roux', address: 'nicolas.roux@exemple.fr' }, subject: 'Compte rendu de la réunion', text: 'Bonjour à tous,\n\nVous trouverez ci-dessous le compte rendu de la réunion de lundi.\n\nNicolas', seen: true },
  { h: 120, from: { name: 'Météo Plus', address: 'newsletter@meteo-plus.example' }, subject: 'Les prévisions du week-end ☀️', html: '<div style="font-family:Arial;max-width:600px;margin:auto"><div style="background:#f5a623;color:#fff;padding:16px 20px;font-size:20px;font-weight:bold">Météo Plus</div><div style="padding:18px 20px">Soleil et douceur attendus sur une grande partie du pays.</div></div>', seen: true, headers: { 'List-Unsubscribe': '<mailto:stop@meteo-plus.example>' } }
];
(async () => {
  const msgs = [];
  for (const s of S) {
    const raw = await build({ from: s.from, to: ME, subject: s.subject, text: s.text, html: s.html, attachments: s.attachments, date: ago(s.h), messageId: `<${Math.random().toString(36).slice(2)}@exemple.fr>`, headers: s.headers });
    const flags = []; if (s.seen) flags.push('\\Seen'); if (s.flagged) flags.push('\\Flagged'); if (s.answered) flags.push('\\Answered');
    msgs.push({ raw, flags, internaldate: ago(s.h) });
  }
  const server = hoodiecrow({
    plugins: ['ID', 'IDLE', 'MOVE', 'UIDPLUS', 'SPECIAL-USE', 'NAMESPACE', 'UNSELECT', 'ENABLE', 'LITERALPLUS', 'STARTTLS', 'LIST-STATUS'],
    users: { 'alex@exemple.fr': { password: 'demo' } },
    storage: {
      INBOX: { messages: msgs.sort((a, b) => a.internaldate - b.internaldate) },
      '': { separator: '/', folders: {
        Sent: { 'special-use': '\\Sent' }, Drafts: { 'special-use': '\\Drafts' }, Trash: { 'special-use': '\\Trash' },
        Junk: { 'special-use': '\\Junk' }, Archive: { 'special-use': '\\Archive' },
        Projets: { folders: { Clients: {}, Factures: {} } }
      } }
    }
  });
  server.listen(+process.env.IMAP_PORT || 1143, () => console.log('IMAP démo'));
  require('hoodiecrow-imap/lib/hoodiecrowSMTPServer').startSMTPServer(+process.env.SMTP_PORT || 1025, server);
})();
