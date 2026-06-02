"""build-pins.py — vertical 1000x1500 Pinterest pins (photo + title + protein callout).
Run: python3 build/build-pins.py    (needs Pillow)"""
import os, json, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.expanduser("~/Desktop/70-gr-protein-meal-recipes")
IMG = os.path.join(ROOT, "img", "recipes")
OUT = os.path.join(ROOT, "pins")
os.makedirs(OUT, exist_ok=True)

# strong, on-topic photos across categories
PICKS = ["baked-salmon-asparagus-parmesan","greek-yogurt-granola-parfait","korean-beef-bulgogi-cauli-bowl",
 "chicken-tikka-masala-cauli-rice","seared-tuna-nicoise-salad","chocolate-pb-protein-smoothie",
 "steak-fajita-bowl","lamb-kofta-tzatziki","baked-trout-lemon-asparagus","chicken-piccata-zoodles",
 "greek-chicken-salad-bowl","turkey-club-lettuce-wrap"]

names = json.loads(subprocess.check_output(["node","-e",
  'global.window={};require(process.env.HOME+"/Desktop/70-gr-protein-meal-recipes/js/recipes-data.js");'
  'const m={};window.RECIPES.forEach(r=>m[r.id]={name:r.name,p:r.macros.protein,nc:r.macros.netCarbs});console.log(JSON.stringify(m))']).decode())

def font(sz, bold=True):
    for p in (["/System/Library/Fonts/Supplemental/Arial Bold.ttf"] if bold else ["/System/Library/Fonts/Supplemental/Arial.ttf"]):
        try: return ImageFont.truetype(p, sz)
        except: pass
    return ImageFont.load_default()

def cover(im, w, h):
    iw, ih = im.size; s = max(w/iw, h/ih)
    im = im.resize((max(1,int(iw*s)), max(1,int(ih*s)))); nw, nh = im.size
    return im.crop(((nw-w)//2,(nh-h)//2,(nw-w)//2+w,(nh-h)//2+h))

def wrap(d, text, fnt, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur+" "+w).strip()
        if d.textbbox((0,0),t,font=fnt)[2] <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

W, H = 1000, 1500
GREEN = (32, 84, 58)
made = 0
for rid in PICKS:
    f = os.path.join(IMG, rid+".jpg")
    if not os.path.exists(f) or rid not in names: continue
    info = names[rid]
    pin = Image.new("RGB", (W, H), GREEN)
    photo = cover(Image.open(f).convert("RGB"), W, 980)
    pin.paste(photo, (0, 0))
    d = ImageDraw.Draw(pin, "RGBA")
    # top ribbon
    d.rectangle([0,0,W,70], fill=(32,84,58,235))
    fb = font(30); d.text((30,18), "THE 70 g PROTEIN COOKBOOK", font=fb, fill="white")
    # gradient fade from photo into the bottom band
    band_y = 900
    for i in range(80):
        a = int(255*i/80)
        d.rectangle([0, band_y+i, W, band_y+i+1], fill=(32,84,58,a))
    d.rectangle([0, band_y+80, W, H], fill=(32,84,58,255))
    # protein chip
    chip = f"{info['p']} g PROTEIN  ·  {info['nc']} g NET CARBS"
    fc = font(34); cb = d.textbbox((0,0),chip,font=fc)
    cw = cb[2]-cb[0]
    d.rounded_rectangle([(W-cw)//2-22, 1000, (W+cw)//2+22, 1058], radius=29, fill=(232,178,63,255))
    d.text(((W-cw)//2, 1010), chip, font=fc, fill=(40,30,10))
    # title
    ft = font(64); lines = wrap(d, info["name"], ft, W-120)[:3]
    y = 1110
    for ln in lines:
        b = d.textbbox((0,0),ln,font=ft); d.text(((W-(b[2]-b[0]))//2, y), ln, font=ft, fill="white"); y += 74
    # footer cue
    ff = font(28, bold=False)
    cue = "+ 99 more high-protein, low-sugar recipes"
    b = d.textbbox((0,0),cue,font=ff); d.text(((W-(b[2]-b[0]))//2, H-70), cue, font=ff, fill=(200,228,210))
    pin.save(os.path.join(OUT, rid+".jpg"), quality=86)
    made += 1
print("wrote", made, "pins to pins/")
