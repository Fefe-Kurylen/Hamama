# Hamama — application mail de Félix

Client mail IMAP + SMTP, plusieurs comptes, boîte unifiée : **Windows** (Electron) + **iPhone / Android** (Capacitor, même interface et même moteur).
Hamama (حمامة) = « colombe voyageuse », le messager — dans l’esprit de Qafila (la caravane). Même famille visuelle que Pyramid PDF, Merifa et Qafila (éditeur « Kurylen »).
Félix parle français : répondre en français, avec beaucoup d'emojis, réponses visuelles et structurées
(titres avec emoji, listes à cocher, tableaux seulement si utiles), sans conseils non demandés.

## 📁 Structure
Dossier du projet sur le PC : `C:\Users\felix\Desktop\Claude\Hamama` · GitHub : **Fefe-Kurylen/Hamama** (public : la politique de confidentialité et les workflows de fabrication y sont).

- `web/index.html` — **source principale de l'interface** (un seul fichier : CSS + HTML + une IIFE JS), comme Pyramid.
- `windows/`
  - `main.js` — processus principal : fenêtre (titleBarOverlay), IPC, notifications, zone de notification, liens `mailto:`, impression, pièces jointes
  - `mail.js` — **moteur mail** : comptes chiffrés (safeStorage = DPAPI Windows), détection auto des serveurs (fournisseurs connus → base Mozilla ISPDB → MX → devinette), dossiers (rôles spéciaux traduits), liste paginée + aperçu du texte, lecture (mailparser), drapeaux, déplacer / archiver / corbeille (avec `uidMap` pour Annuler), recherche (dossier ou partout), envoi SMTP + copie dans Envoyés, brouillons, cache disque, **surveillance IDLE** (nouveaux messages en temps réel)
  - `oauth.js` — connexion OAuth2 Microsoft / Google (PKCE + redirection http://localhost). **Inactive tant que les identifiants client sont vides** (`HAMAMA_MS_CLIENT_ID`, `HAMAMA_GOOGLE_CLIENT_ID` / `_SECRET`, ou constantes dans le fichier)
  - `preload.js` — expose `window.native` (acc, mail, att, block, pickFiles, prefs, notify, badge, defaultMail, print, version, on, setTitleBar, ready)
  - `make-app.py` — `web/index.html` → `windows/app/` (polices Inter locales, script sorti dans `app.js`, CSP stricte sans script en ligne)
  - `afterPack.js` — icône + infos de version dans l'exe (resedit)
  - `build/icon.svg|png|ico`, `build/appx/` (logos Store)
- `mobile/` — **appli iPhone / Android** (Capacitor 8, appId `fr.kurylen.hamama`)
  - `make-mobile.py` — `windows/app` → `www/` (+ `native-bridge.js`, CSP avec `'unsafe-inline'` pour le script de Capacitor) et **moteur mail regroupé** par esbuild (`node/main.js` + `windows/mail.js` + dépendances) → `www/nodejs/main.js`
  - `node/main.js` — moteur sur téléphone : tourne dans le **Node.js embarqué** (`@capawesome/capacitor-nodejs`, Node 24) → aucun serveur ; mots de passe chiffrés AES-256-GCM (clé `.cle` dans le dossier privé de l'appli) ; module `bridge` (`channel.on('call')` → `channel.post('reply' / 'event')`), `app.on('resume')` → `mail.wake()`
  - `native-bridge.js` — définit `window.native` (même API que `preload.js`) : appels vers Node, pièces jointes → fichier + feuille de partage, notifications locales, bouton retour Android (`hamama-back`), liens `mailto:`
  - `make-icons.py` — icônes Android (adaptatives) + iPhone + écrans de démarrage depuis `windows/build/icon.svg`
  - `android/` (signature : `keystore.properties` + `hamama-release.jks` **hors GitHub**, copie dans `Hamama\Clés-Android` sur le PC ; APK limité à arm64, moteur compressé → ≈ 48 Mo), `ios/`
- `tests/` — `mobile.js` (11 vérifications : interface téléphone 390×844 tactile + vrai moteur Node contre le serveur de test : tiroir, retour, lecture plein écran, balayage = archiver, rédaction plein écran, envoi + réception IDLE), `i18n.js` (passage en anglais et en arabe + détection des textes restés en français), `server.js` (serveur IMAP + SMTP de test hoodiecrow avec 9 mails d’exemple), `e2e.js` (38 vérifications en pilotant la vraie appli Electron), `relaunch.js` (redémarrage + cache)
- `.github/workflows/release.yml` — installateur + portable dans les Releases GitHub, **lancement manuel uniquement** (plus de mise à jour automatique)
- `.github/workflows/mobile.yml` — à chaque push touchant `mobile/`, `web/` ou le moteur : **APK Android** (signé si secrets `ANDROID_KEYSTORE_B64` / `ANDROID_KEYSTORE_PASSWORD`, sinon debug) + **.ipa iPhone non signé** (Mac de GitHub) dans les artifacts
- `.github/workflows/apple.yml` — Mac de GitHub : iPhone/iPad signé automatiquement (clé App Store Connect) et **envoyé sur App Store Connect** (TestFlight → App Store), quand la version de `mobile/package.json` change ou à la main. Secrets (mêmes valeurs que Pyramid PDF) : `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8`, `APPLE_TEAM_ID`. Mac **macOS 26 + Xcode le plus récent** (Apple exige le SDK iOS 26, puis iOS 27 dès avril 2027) ; archive **non signée**, signature App Store faite à l'export (pas besoin d'iPhone enregistré). Fiche App Store Connect : app **6836498110** « Hamama : Mail », identifiant `fr.kurylen.hamama` (⚠️ l'app 6836232597 est Qafila). Premier build 1.0.0 (106) envoyé le 18/11/2026. **En pause (décision de Félix, 18/11/2026) : on reste sur le Microsoft Store pour l'instant.** Fiche complète (captures, prix gratuit, 174 pays sans la Chine, contact d'examen), envoi à la vérification annulé (état « Rejetée par le développeur », renvoyable tel quel). Raison : compte Apple individuel → vendeur affiché = nom légal de Félix ; « Kurylen » exigerait une société (SASU/EURL) + D-U-N-S
- `store/apple/` — captures App Store iPhone 6,9" (1320×2868) et iPad 13" (2064×2752) faites par `captures.js` (appli mobile + vrai moteur + `store/demo-server.js`) ; textes de la fiche dans `store/apple/fiche.json`. Captures envoyées par l'API iris d'App Store Connect (réservation dans la page → PUT sur l'URL signée depuis le conteneur → validation avec le MD5)
- `.github/workflows/windows-store.yml` — fabrique et teste le paquet Microsoft Store sur un Windows de GitHub (comme Pyramid)
- `PRIVACY.md` — politique de confidentialité (URL pour le Store)
- `site/` — site public (GitHub Pages, workflow `pages.yml`) : https://fefe-kurylen.github.io/Hamama/ (assistance + `confidentialite.html`). Contact Kurylen : **kurylen.apps@yahoo.com**

## 🔨 Construire / installer
```
cd windows
npm install
python make-app.py        # après chaque modification de web/index.html
npm start                 # lancer en développement
npm run dist              # → dist/Hamama-Installation-X.Y.Z.exe + Hamama-Portable-X.Y.Z.exe
```
Depuis Linux, `npm run dist` demande wine (wine64 + wine32). electron-builder **25.1.8** (la 26 exige wine aussi pour NSIS).
## 📱 Téléphones
```
cd mobile
CAPACITOR_NODEJS_SKIP_DOWNLOAD=1 npm install   # (sur Mac : npm install, pour le Node.js iPhone)
python make-mobile.py && npx cap sync           # après chaque modification de web/ ou du moteur
cd android && ./gradlew assembleRelease         # → app/build/outputs/apk/release/app-release.apk
```
- **Tablette** (iPad, plus petit côté d'écran ≥ 700 px) : classe `tablet` au lieu de `mobile` → disposition en colonnes comme sur ordinateur, mais réglages tactiles (pas de raccourcis, pas d'actions au survol)
- Interface : classe `mobile` sur `<html>` (`MOBILE` dans le script) → tiroir des dossiers, une seule colonne, rédaction plein écran, fenêtres en bas d'écran, balayage gauche = archiver / droite = lu-non lu, appui long = menu, pas de raccourcis clavier / impression / zone de notification. Les petites fenêtres de bureau (< 640 px) prennent la même disposition (classe `narrow`).
- Limites : notifications seulement quand l'appli est ouverte ou en arrière-plan récent (pas de push serveur), pas encore d'OAuth sur téléphone (mot de passe d'application), iPhone = signature Apple nécessaire (identifiant Apple gratuit via Sideloadly : 7 jours ; compte Developer 99 €/an pour l'App Store).

## 🔄 Mises à jour = par les stores (décision de Félix, 18/11/2026)
- **Plus de bouton « Mettre à jour » ni d'electron-updater** dans l'appli : les mises à jour passent par le **Microsoft Store** (Windows), et plus tard Google Play / App Store / Mac App Store.
- Nouvelle version Windows : pousser sur `main` → le workflow `windows-store.yml` fabrique et teste le `.appx` (artifact `hamama-store`) → nouvelle soumission dans l'Espace partenaires (produit **9NB60JPQ44R5**, identité `Kurylen.Hamama`, éditeur `CN=B85CD3FF-A422-425E-9A54-A6E74180E94E`) → le Store met à jour les PC.
- Envoi du paquet dans l'Espace partenaires depuis le navigateur intégré : le fichier est découpé (< 100 Mo), poussé sur une branche temporaire, reconstitué dans la page via `raw.githubusercontent.com` puis donné au champ `input[type=file].fileuploader` (UN seul événement, sinon envois en double). Les captures (`store/captures/*.png`, faites avec `store/demo-server.js` + `store/captures.js`) passent de la même façon, une par une.
- Accepter les conditions (IARC) et cliquer « Soumettre pour certification » : à faire par Félix.

## 🧪 Tests
```
cd tests && npm install
node server.js &                       # IMAP 1143 + SMTP 1025 (felix@test.local / secret)
xvfb-run -a node e2e.js                # Linux ; sous Windows : node e2e.js
```

## 🧠 Fonctionnement clé
- **État** : `ST` (comptes, dossiers, vue `{uni}` ou `{acc, box}`, items, sélection, message ouvert). Clé d'un message : `acc|dossier|uid`.
- **Actions optimistes** : `act(kind, keys, dest)` met à jour la liste tout de suite, appelle le moteur, propose **Annuler** (retour via `uidMap`).
- **Lecture** : iframe `sandbox="allow-same-origin allow-popups…"` (aucun script), CSP interne ; **images distantes bloquées** par défaut ; **messages affichés sur le fond de l'appli** sans carte blanche (comme Mailbird : `mailbg:'theme'`, inversion calculée pour que le blanc = `--bg`, migration `mb2`) ; option « Blanc (fidèle) » (bandeau Afficher / Toujours pour cet expéditeur, liste `hamama-img-ok`), liens → navigateur, `mailto:` → rédaction, survol d'un lien = adresse réelle en bas à gauche (anti-hameçonnage).
- **Rédaction** : grande fenêtre flottante (860×760) **déplaçable par sa barre de titre** et **redimensionnable par les bords / coins** (position et taille mémorisées `hamama-compose-pos` / `hamama-compose-size`), titre = « Nouveau message / Réponse / Réponse à tous / Transfert / Brouillon » (`CMP.kind`, pas l'objet), bouton **Envoyer** gros et à droite, citations affichées comme la lecture en thème sombre (inversion `--inv`), correcteur d'une seule langue avec le bon code régional (`applySpell` dans main.js, réglage Rédaction → Correcteur orthographique) / agrandie / réduite, bouton **Joindre** en tête de la barre d'outils, destinataires en pastilles + saisie automatique (`hamama-contacts`), Cc/Cci, mise en forme, images collées → pièces jointes `cid:`, glisser-déposer de fichiers, signature par compte, **délai d'annulation d'envoi** (5 s par défaut, décompte en temps réel + barre de progression ; la copie dans Envoyés se fait en arrière-plan après l'acceptation SMTP), alerte « pièce jointe oubliée », brouillon enregistré sur le serveur à la fermeture + sauvegarde locale anti-plantage (`hamama-compose`).
- **Style épuré** (demande de Félix) : une seule surface (`--bg`) pour barre du haut, dossiers, liste et lecture, séparateurs fins, avatars neutres (gris), sélection grise, accent réservé au bouton « Nouveau message », aux points non lus et aux choix actifs, pas d’émojis dans l’interface, barre de lecture en icônes (bulles d’aide). Bloc CSS « Style épuré » à la fin du `<style>`. Séparateurs de colonnes en `--line2`, lus en gris atténué / non-lus en gras blanc (messages et dossiers ; Indésirables, Corbeille, Envoyés, Brouillons jamais en gras), actions au survol en bas à droite de la ligne (ordre fixe : **favori, archiver, répondre, (lu), poubelle** ; icônes `qstar/qarchive/qreply/qtrash`, petite animation d'apparition en cascade + survol / clic à la couleur d'accent, étoile remplie si suivi ; migration `qa2`), icônes de la barre de lecture 36 px. Coins « Ronds » : `--rb` pilule pour les boutons, `--rbx` (16 px) pour bandeaux, menus, encadrés.
- **Personnalisation** (`SET`, localStorage `hamama-settings`) : 11 thèmes : sombres Graphite (gris chaud `#262624`, comme l’appli Claude) / Sombre / Noir OLED / Nuit bleue / Ardoise / Forêt / Prune, clairs Clair (blanc cassé doux `#f4f3ee`) / Ciel / Menthe / Rose poudré (`LIGHT_THEMES` → `data-tone=light`, utilisé pour toutes les règles « thème clair ») ; choisir un thème applique sa couleur d'accent assortie (`THEME_ACCENT`), accent (`#c8703f` par défaut), disposition 3 colonnes / lecture en dessous / Focus, densité, taille d'interface (zoom), coins, barre des dossiers, aperçu 0-2 lignes, avatars, groupes par date, boîte unifiée, compteurs, actions au survol, après suppression, marquer comme lu (tout de suite / 2 s / manuel), images, fond des mails (blanc / sombre), taille du texte des mails, largeur de lecture, libellés, police / taille de rédaction, délai d'annulation, fenêtre de rédaction, raccourcis. Largeurs des colonnes réglables à la souris (double-clic = défaut).
- **Police et graisse** : police de l'interface (Inter intégrée, Segoe UI, Arial, Calibri, Verdana, Tahoma, Trebuchet MS, Georgia ; aussi utilisée pour les mails en texte brut), texte en gras (Gras / Demi-gras / Sans gras via `data-weight`), non-lus en gras oui/non (`data-unreadb`). Le gras mis dans les messages (#ed) n'est jamais touché.
- **Langues** (Réglages → Langue) : Automatique (langue de Windows), Français, English, Español, Deutsch, Italiano, Português, العربية (affichage de droite à gauche). Table `I18N` au début du script : clé = texte français, valeurs [en, es, de, it, pt, ar], `{0}` = partie variable. Traduction automatique de l'interface par un `MutationObserver` (textes + title/placeholder/data-tip) ; **tout contenu de mail ou saisi par l'utilisateur porte `data-notr`** (jamais traduit). Dates au format de la langue (`LOC`), citation « Le …, X a écrit : » et préfixes Re/Fwd selon la langue. Menus et fenêtres du processus principal : table `MT` dans `main.js` (langue envoyée via `prefs`). **Ajouter un texte à l'interface = ajouter sa ligne dans `I18N`** (le test `tests/i18n.js` signale les oublis).
- **Expéditeurs bloqués → Indésirables** : `blocked.json` (moteur, `mail.js`) = adresses ou `@domaine`. Blocage depuis le clic droit d'un message ou le menu « … » de la lecture (adresse, ou tout le domaine sauf pour les fournisseurs publics type gmail.com), ou Réglages → Bloqués (ajout manuel, Débloquer). Au blocage, les messages déjà reçus sont déplacés dans Indésirables (`sweep` : recherche FROM + vérification exacte de l'adresse) ; les nouveaux sont déplacés dès leur arrivée par la surveillance IDLE, **sans notification** ; balayage aussi au démarrage. Bandeau « Cet expéditeur est bloqué » + Débloquer dans la lecture.
- **Préférences système** (`prefs.json` côté main) : notifications, son, zone de notification, lancement au démarrage. **Par défaut (18/11) : Hamama reste actif en arrière-plan** — fermer la fenêtre la cache dans la zone de notification (notification explicative la 1re fois), démarrage avec Windows en mode caché (`--hidden`), `backgroundThrottling:false` ; migration `bg2` dans `prefs.json`.
- **Raccourcis** : N nouveau, R / A / F, E archiver, Suppr, J/K, U, S, V déplacer, Ctrl K rechercher, Ctrl A, F5, Ctrl Entrée envoyer, Échap, ? aide.
- **Débogage** : `HAMAMA_DEBUG=1` → `window.__hamama` ; `HAMAMA_DATA=<dossier>` change le dossier de données (tests).
- Dossier de données : `%APPDATA%\Hamama` (`accounts.json`, `prefs.json`, `cache/`).

## ✅ État actuel (18/11/2026)
Applis iPhone / Android créées (18/11) : test téléphone 11/11, APK Android signé généré.

### Bureau — version 1.0.x
Tous les tests passent : 34/34 de bout en bout + 10/10 langues (blocage d'expéditeurs, ajout de compte, liste, lecture HTML, pièce jointe, pixel espion bloqué,
désabonnement, suivi, envoi SMTP réel, réception IDLE, réponse avec citation, brouillon, archiver + annuler, supprimer,
recherche, Envoyés, glisser-déposer, sélection multiple, boîte unifiée 2 comptes, bouton de mise à jour) + redémarrage (liste en < 1 s depuis le cache).
Installateur et version portable Windows générés. Code sur GitHub (branche `main`) depuis le 17/11/2026 ; publication automatique des mises à jour à chaque push (workflow `release.yml`).

## 📝 À faire
- [ ] Tester sur le PC de Félix avec ses vrais comptes (Gmail → mot de passe d'application)
- [ ] **Outlook / Hotmail** : créer une inscription d'application Azure (gratuite) et mettre l'identifiant dans `oauth.js` → active « Se connecter avec Microsoft »
- [ ] (option) Google OAuth pour Gmail sans mot de passe d'application (vérification Google requise pour le scope mail)
- [ ] Lien **Stripe** dans `SUPPORT_URL` (fenêtre « Soutenir Hamama ») quand Félix le donnera
- [x] Microsoft Store : nom réservé (9NB60JPQ44R5), version 1.0.9 soumise le 18/11/2026 → en cours de certification
- [ ] Supprimer la branche GitHub temporaire `store-upload`
- [ ] Tester l'APK sur le téléphone Android de Félix ; iPhone : signer le .ipa (Sideloadly) ou compte Apple Developer
- [ ] Plus tard : conversations groupées (fils), notifications push quand l'appli est fermée
