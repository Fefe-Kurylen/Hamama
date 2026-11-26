# Icônes et écrans de démarrage iPhone / Android à partir de windows/build/icon.svg
# (à relancer seulement si l'icône change ; nécessite rsvg-convert + Pillow)
import os, re, glob, subprocess, io
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__))
SVG = open(os.path.join(H, '..', 'windows', 'build', 'icon.svg'), encoding='utf-8').read()
BG = '#262624'  # fond Graphite de l'appli

def render(svg, size):
    png = subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size)], input=svg.encode(), capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert('RGBA')

RECT = re.compile(r'<rect x="\d+" y="\d+" width="\d+" height="\d+" rx="\d+" fill="([^"]+)"/>')
full = RECT.sub(lambda m: f'<rect width="1024" height="1024" fill="{m.group(1)}"/>', SVG)       # carré plein (iOS, fond adaptatif)
bgonly = re.sub(r'</defs>.*</svg>', lambda m: '</defs>' + ''.join(f'<rect width="1024" height="1024" fill="{f}"/>' for f in RECT.findall(SVG)) + '</svg>', SVG, flags=re.S)
fg = RECT.sub('', SVG).replace('</defs>', '</defs><g transform="translate(512 512) scale(.72) translate(-512 -512)">').replace('</svg>', '</g></svg>')
rounded = SVG

# ---- Android ----
RES = os.path.join(H, 'android', 'app', 'src', 'main', 'res')
dens = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}
for d, k in dens.items():
    p = os.path.join(RES, 'mipmap-' + d)
    render(rounded, round(48 * k)).save(os.path.join(p, 'ic_launcher.png'))
    ic = render(full, round(48 * k)); m = Image.new('L', ic.size, 0)
    from PIL import ImageDraw; ImageDraw.Draw(m).ellipse((0, 0, ic.size[0] - 1, ic.size[1] - 1), fill=255)
    rnd = Image.new('RGBA', ic.size, (0, 0, 0, 0)); rnd.paste(ic, (0, 0), m); rnd.save(os.path.join(p, 'ic_launcher_round.png'))
    render(fg, round(108 * k)).save(os.path.join(p, 'ic_launcher_foreground.png'))
    render(bgonly, round(108 * k)).save(os.path.join(p, 'ic_launcher_background.png'))
open(os.path.join(RES, 'mipmap-anydpi-v26', 'ic_launcher.xml'), 'w').write(
    '<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
    '    <background android:drawable="@mipmap/ic_launcher_background"/>\n    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n'
    '    <monochrome android:drawable="@mipmap/ic_launcher_foreground"/>\n</adaptive-icon>\n')
open(os.path.join(RES, 'mipmap-anydpi-v26', 'ic_launcher_round.xml'), 'w').write(
    open(os.path.join(RES, 'mipmap-anydpi-v26', 'ic_launcher.xml')).read())
open(os.path.join(RES, 'values', 'ic_launcher_background.xml'), 'w').write(
    f'<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#C94A12</color>\n</resources>\n')

def splash(w, h):
    im = Image.new('RGBA', (w, h), BG)
    s = round(min(w, h) * .26); ic = render(rounded, s)
    im.paste(ic, ((w - s) // 2, (h - s) // 2), ic)
    return im.convert('RGB')
for f in glob.glob(os.path.join(RES, 'drawable*', 'splash.png')):
    w, h = Image.open(f).size; splash(w, h).save(f)

# ---- iPhone ----
XC = os.path.join(H, 'ios', 'App', 'App', 'Assets.xcassets')
render(full, 1024).convert('RGB').save(os.path.join(XC, 'AppIcon.appiconset', 'AppIcon-512@2x.png'))
# Icône pour le mode sombre de l'iPhone (iOS 18+) : colombe sur fond graphite avec une lueur orange
DARKBG = ('<defs><linearGradient id="dk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34332f"/><stop offset="1" stop-color="#161615"/></linearGradient>'
          '<radialGradient id="gl" cx=".55" cy=".52" r=".55"><stop offset="0" stop-color="#e86a26" stop-opacity=".42"/><stop offset="1" stop-color="#e86a26" stop-opacity="0"/></radialGradient>')
dark = RECT.sub('', SVG).replace('<defs>', DARKBG, 1).replace('</defs>', '</defs><rect width="1024" height="1024" fill="url(#dk)"/><rect width="1024" height="1024" fill="url(#gl)"/>', 1)
dark = dark.replace('fill="#5a1a02" opacity=".5"', 'fill="#000" opacity=".55"')
render(dark, 1024).convert('RGB').save(os.path.join(XC, 'AppIcon.appiconset', 'AppIcon-dark.png'))
# Icône « teintée » (iOS 18+) : colombe en niveaux de gris sur fond noir, iOS applique la couleur choisie
tint = RECT.sub('', SVG).replace('</defs>', '</defs><rect width="1024" height="1024" fill="#000"/>', 1).replace('fill="#5a1a02" opacity=".5"', 'fill="#000" opacity="0"')
render(tint, 1024).convert('L').convert('RGB').save(os.path.join(XC, 'AppIcon.appiconset', 'AppIcon-tinted.png'))
import json
json.dump({'images': [
  {'filename': 'AppIcon-512@2x.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'},
  {'appearances': [{'appearance': 'luminosity', 'value': 'dark'}], 'filename': 'AppIcon-dark.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'},
  {'appearances': [{'appearance': 'luminosity', 'value': 'tinted'}], 'filename': 'AppIcon-tinted.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'}],
  'info': {'author': 'xcode', 'version': 1}}, open(os.path.join(XC, 'AppIcon.appiconset', 'Contents.json'), 'w'), indent=2)
for f in glob.glob(os.path.join(XC, 'Splash.imageset', '*.png')):
    splash(2732, 2732).save(f)
print('icônes ok')
