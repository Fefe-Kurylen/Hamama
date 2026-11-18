# Hamama — iPhone et Android

Même interface (`web/index.html`) et même moteur mail (`windows/mail.js`) que l'appli Windows,
emballés avec Capacitor ; le moteur tourne dans le Node.js embarqué de l'appli (aucun serveur).

```
CAPACITOR_NODEJS_SKIP_DOWNLOAD=1 npm install    # sur Mac : npm install
python make-mobile.py && npx cap sync
cd android && ./gradlew assembleRelease         # APK signé si ../keystore.properties existe
```

La clé de signature Android (`hamama-release.jks` + `keystore.properties`) n'est jamais sur GitHub.
