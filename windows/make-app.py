# Transforme web/index.html (source unique) en windows/app/ pour Electron :
#  - retire Google Fonts → polices Inter locales (fonts.css + fonts/)
#  - sort le script dans app.js et applique une politique de sécurité stricte (aucun script en ligne)
import os, re, shutil
H = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(H, 'app')
os.makedirs(os.path.join(APP, 'fonts'), exist_ok=True)
s = open(os.path.join(H, '..', 'web', 'index.html'), encoding='utf-8').read()

# Polices
src = os.path.join(H, 'node_modules', '@fontsource', 'inter', 'files')
css = []
for sub, rng in [('latin-ext', 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'),
                 ('latin', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD')]:
    for w in (400, 500, 600, 700):
        f = f'inter-{sub}-{w}-normal.woff2'
        shutil.copy(os.path.join(src, f), os.path.join(APP, 'fonts', f))
        css.append(f"@font-face{{font-family:Inter;font-style:normal;font-display:swap;font-weight:{w};src:url(fonts/{f}) format('woff2');unicode-range:{rng}}}")
open(os.path.join(APP, 'fonts.css'), 'w', encoding='utf-8').write('\n'.join(css))

s = re.sub(r'<link rel="preconnect"[^>]*>\n', '', s)
s = re.sub(r'<link href="https://fonts.googleapis.com[^>]*>\n', '', s)
CSP = ("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https: http:; "
       "font-src 'self' data: https:; media-src data: https:; connect-src 'self'; object-src 'none'; form-action 'none'")
s = s.replace('<title>Hamama</title>', f'<meta http-equiv="Content-Security-Policy" content="{CSP}">\n<title>Hamama</title>\n<link rel="stylesheet" href="fonts.css">', 1)

# Script → app.js
m = re.search(r'<script>\n(.*?)</script>', s, re.S)
assert m, 'script introuvable'
open(os.path.join(APP, 'app.js'), 'w', encoding='utf-8').write(m.group(1))
s = s[:m.start()] + '<script src="app.js"></script>' + s[m.end():]
assert 'fonts.googleapis' not in s and '<script>' not in s
open(os.path.join(APP, 'index.html'), 'w', encoding='utf-8').write(s)
if os.path.exists(os.path.join(H, 'build', 'icon.png')):
    shutil.copy(os.path.join(H, 'build', 'icon.png'), os.path.join(APP, 'icon.png'))
print('app ok')
