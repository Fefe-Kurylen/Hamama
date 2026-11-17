# Hamama — application mail de Félix

Client mail de bureau (Windows, Mac via Electron) : IMAP + SMTP, plusieurs comptes, boîte unifiée.
Hamama (حمامة) = « colombe voyageuse », le messager — dans l’esprit de Qafila (la caravane). Même famille visuelle que Pyramid PDF, Merifa et Qafila (éditeur « Kurylen »).
Félix parle français : répondre en français, avec beaucoup d'emojis, réponses visuelles et structurées
(titres avec emoji, listes à cocher, tableaux seulement si utiles), sans conseils non demandés.

## 📁 Structure
Dossier du projet sur le PC : `C:\Users\felix\Desktop\Claude\Hamama` · GitHub : **Fefe-Kurylen/Hamama** (public ; même contenu que le dossier du PC + Releases pour les mises à jour automatiques).

- `web/index.html` — **source principale de l'interface** (un seul fichier : CSS + HTML + une IIFE JS), comme Pyramid.
- `windows/`
  - `main.js` — processus principal : fenêtre (titleBarOverlay), IPC, notifications, zone de notification, liens `mailto:`, impression, pièces jointes
  - `mail.js` — **moteur mail** : comptes chiffrés (safeStorage = DPAPI Windows), détection auto des serveurs (fournisseurs connus → base Mozilla ISPDB → MX → devinette), dossiers (rôles spéciaux traduits), liste paginée + aperçu du texte, lecture (mailparser), drapeaux, déplacer / archiver / corbeille (avec `uidMap` pour Annuler), recherche (dossier ou partout), envoi SMTP + copie dans Envoyés, brouillons, cache disque, **surveillance IDLE** (nouveaux messages en temps réel)
  - `updater.js` — **mises à jour sans réinstaller** (electron-updater + GitHub Releases de Fefe-Kurylen/Hamama) : vérification 15 s après l'ouverture, toutes les 30 min et au retour sur la fenêtre (si > 10 min), téléchargement différentiel en arrière-plan, bouton **« Mettre à jour »** dans la barre du haut + notification ; version portable → lien « Nouvelle version » ; version Store / développement → désactivé (le Store met à jour lui-même)
  - `oauth.js` — connexion OAuth2 Microsoft / Google (PKCE + redirection http://localhost). **Inactive tant que les identifiants client sont vides** (`HAMAMA_MS_CLIENT_ID`, `HAMAMA_GOOGLE_CLIENT_ID` / `_SECRET`, ou constantes dans le fichier)
  - `preload.js` — expose `window.native` (acc, mail, att, pickFiles, prefs, notify, badge, defaultMail, print, version, on, setTitleBar, ready)
  - `make-app.py` — `web/index.html` → `windows/app/` (polices Inter locales, script sorti dans `app.js`, CSP stricte sans script en ligne)
  - `afterPack.js` — icône + infos de version dans l'exe (resedit)
  - `build/icon.svg|png|ico`, `build/appx/` (logos Store)
- `tests/` — `server.js` (serveur IMAP + SMTP de test hoodiecrow avec 9 mails d’exemple), `e2e.js` (26 vérifications en pilotant la vraie appli Electron), `relaunch.js` (redémarrage + cache)
- `.github/workflows/release.yml` — **publie automatiquement une mise à jour à chaque push sur `main`** qui touche `web/` ou `windows/` : version `MAJEUR.MINEUR.(patch + n° de publication)`, installateur + portable + `latest.yml` dans les Releases GitHub → bouton « Mettre à jour » dans les applis installées
- `.github/workflows/windows-store.yml` — fabrique et teste le paquet Microsoft Store sur un Windows de GitHub (comme Pyramid)
- `PRIVACY.md` — politique de confidentialité (URL pour le Store)

## 🔨 Construire / installer
```
cd windows
npm install
python make-app.py        # après chaque modification de web/index.html
npm start                 # lancer en développement
npm run dist              # → dist/Hamama-Installation-X.Y.Z.exe + Hamama-Portable-X.Y.Z.exe
```
Depuis Linux, `npm run dist` demande wine (wine64 + wine32). electron-builder **25.1.8** (la 26 exige wine aussi pour NSIS).
## 🔄 Mises à jour (sans réinstaller)
1. Modifier le code ici (dossier du PC / cette session) et **pousser sur GitHub (`main`)** — c'est tout
2. Le workflow `release.yml` fabrique la nouvelle version (≈ 5-8 min) et la publie dans les Releases (numéro automatique : 1.0.1, 1.0.2…)
3. Chaque Hamama installé la détecte, la télécharge en arrière-plan et affiche **« Mettre à jour »** → redémarrage de quelques secondes
- `version` de `windows/package.json` = base MAJEUR.MINEUR (ne la changer que pour passer à 1.1, 2.0…). Les modifications de documentation seule (`*.md`, `tests/`) ne publient pas de version.
- ⚠️ Le dépôt **Fefe-Kurylen/Hamama doit être public** (sinon les applis ne peuvent pas lire les Releases).
- Store : workflow `windows-store.yml` → `.appx` dans les artifacts → Partner Center ; le Store met ensuite à jour tout seul.

## 🧪 Tests
```
cd tests && npm install
node server.js &                       # IMAP 1143 + SMTP 1025 (felix@test.local / secret)
xvfb-run -a node e2e.js                # Linux ; sous Windows : node e2e.js
```

## 🧠 Fonctionnement clé
- **État** : `ST` (comptes, dossiers, vue `{uni}` ou `{acc, box}`, items, sélection, message ouvert). Clé d'un message : `acc|dossier|uid`.
- **Actions optimistes** : `act(kind, keys, dest)` met à jour la liste tout de suite, appelle le moteur, propose **Annuler** (retour via `uidMap`).
- **Lecture** : iframe `sandbox="allow-same-origin allow-popups…"` (aucun script), CSP interne ; **images distantes bloquées** par défaut (bandeau Afficher / Toujours pour cet expéditeur, liste `hamama-img-ok`), liens → navigateur, `mailto:` → rédaction, survol d'un lien = adresse réelle en bas à gauche (anti-hameçonnage).
- **Rédaction** : fenêtre flottante / agrandie / réduite, destinataires en pastilles + saisie automatique (`hamama-contacts`), Cc/Cci, mise en forme, images collées → pièces jointes `cid:`, glisser-déposer de fichiers, signature par compte, **délai d'annulation d'envoi** (5 s par défaut), alerte « pièce jointe oubliée », brouillon enregistré sur le serveur à la fermeture + sauvegarde locale anti-plantage (`hamama-compose`).
- **Style épuré** (demande de Félix) : une seule surface (`--bg`) pour barre du haut, dossiers, liste et lecture, séparateurs fins, avatars neutres (gris), sélection grise, accent réservé au bouton « Nouveau message », aux points non lus et aux choix actifs, pas d’émojis dans l’interface, barre de lecture en icônes (bulles d’aide). Bloc CSS « Style épuré » à la fin du `<style>`.
- **Personnalisation** (`SET`, localStorage `hamama-settings`) : thème Graphite (gris chaud `#262624`, comme l’appli Claude) / Sombre / Noir OLED / Clair (blanc cassé doux `#f4f3ee`, pas de blanc pur), accent (`#c8703f` par défaut), disposition 3 colonnes / lecture en dessous / Focus, densité, taille d'interface (zoom), coins, barre des dossiers, aperçu 0-2 lignes, avatars, groupes par date, boîte unifiée, compteurs, actions au survol, après suppression, marquer comme lu (tout de suite / 2 s / manuel), images, fond des mails (blanc / sombre), taille du texte des mails, largeur de lecture, libellés, police / taille de rédaction, délai d'annulation, fenêtre de rédaction, raccourcis. Largeurs des colonnes réglables à la souris (double-clic = défaut).
- **Préférences système** (`prefs.json` côté main) : notifications, son, zone de notification, lancement au démarrage.
- **Raccourcis** : N nouveau, R / A / F, E archiver, Suppr, J/K, U, S, V déplacer, Ctrl K rechercher, Ctrl A, F5, Ctrl Entrée envoyer, Échap, ? aide.
- **Débogage** : `HAMAMA_DEBUG=1` → `window.__hamama` ; `HAMAMA_DATA=<dossier>` change le dossier de données (tests).
- Dossier de données : `%APPDATA%\Hamama` (`accounts.json`, `prefs.json`, `cache/`).

## ✅ État actuel (17/11/2026) — version 1.0.0
Tous les tests passent : 26/26 de bout en bout (ajout de compte, liste, lecture HTML, pièce jointe, pixel espion bloqué,
désabonnement, suivi, envoi SMTP réel, réception IDLE, réponse avec citation, brouillon, archiver + annuler, supprimer,
recherche, Envoyés, glisser-déposer, sélection multiple, boîte unifiée 2 comptes, bouton de mise à jour) + redémarrage (liste en < 1 s depuis le cache).
Installateur et version portable Windows générés. Code sur GitHub (branche `main`) depuis le 17/11/2026 ; publication automatique des mises à jour à chaque push (workflow `release.yml`).

## 📝 À faire
- [ ] Tester sur le PC de Félix avec ses vrais comptes (Gmail → mot de passe d'application)
- [ ] **Outlook / Hotmail** : créer une inscription d'application Azure (gratuite) et mettre l'identifiant dans `oauth.js` → active « Se connecter avec Microsoft »
- [ ] (option) Google OAuth pour Gmail sans mot de passe d'application (vérification Google requise pour le scope mail)
- [ ] Lien **Stripe** dans `SUPPORT_URL` (fenêtre « Soutenir Hamama ») quand Félix le donnera
- [ ] Réserver le nom « Hamama » dans Partner Center, mettre l'identité Store exacte dans `build.appx`, puis soumettre
- [ ] Plus tard : conversations groupées (fils), version iPhone / Android (Capacitor, comme Pyramid)
