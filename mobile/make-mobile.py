# Construit www/ pour l'appli iPhone / Android :
#  - interface : copie de windows/app (polices locales) + native-bridge.js
#  - moteur mail : windows/mail.js + mobile/node/main.js regroupés en un seul fichier
#    (esbuild) dans www/nodejs/, lancé par le Node.js embarqué (@capawesome/capacitor-nodejs)
import os, shutil, subprocess, json
H = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(H, '..', 'windows', 'app')
WWW = os.path.join(H, 'www')
shutil.rmtree(WWW, ignore_errors=True)
shutil.copytree(APP, WWW)
p = os.path.join(WWW, 'index.html'); s = open(p, encoding='utf-8').read()
def R(o, n):
    global s
    assert s.count(o) == 1, o[:60]
    s = s.replace(o, n)
# Capacitor injecte son propre script dans la page : il faut l'autoriser
R("script-src 'self';", "script-src 'self' 'unsafe-inline';")
R('<script src="app.js"></script>', '<script src="native-bridge.js"></script>\n<script src="app.js"></script>')
open(p, 'w', encoding='utf-8').write(s)
shutil.copy(os.path.join(H, 'native-bridge.js'), os.path.join(WWW, 'native-bridge.js'))
# Moteur mail regroupé
os.makedirs(os.path.join(WWW, 'nodejs'))
subprocess.run(['npx', 'esbuild', os.path.join(H, 'node', 'main.js'), '--bundle', '--platform=node', '--target=node22',
                '--external:bridge', '--minify-syntax', '--legal-comments=none',
                '--outfile=' + os.path.join(WWW, 'nodejs', 'main.js')], check=True, cwd=H)
json.dump({'name': 'hamama-moteur', 'version': json.load(open(os.path.join(H, 'package.json')))['version'], 'main': 'main.js'},
          open(os.path.join(WWW, 'nodejs', 'package.json'), 'w'))
print('www ok')
