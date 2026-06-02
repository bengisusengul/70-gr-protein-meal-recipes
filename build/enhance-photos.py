"""enhance-photos.py — subtle, consistent 'premium' edit across all food photos.
Research-backed: modest saturation boost (reads as tastier AND fresher/healthier)
+ gentle contrast + a touch of warmth. Deliberately conservative so it stays
believable, never Instagram-gaudy.

Usage:
  python3 build/enhance-photos.py <file1.jpg> [file2.jpg ...]   # edit in place
  python3 build/enhance-photos.py --test <file.jpg> <out.jpg>   # write a copy
"""
import sys
from PIL import Image, ImageEnhance

SAT, CON, BRI = 1.12, 1.06, 1.02   # saturation, contrast, brightness
WARM_R, WARM_B = 1.03, 0.985       # nudge red up, blue down (subtle warmth)

def enhance(im):
    im = im.convert("RGB")
    im = ImageEnhance.Color(im).enhance(SAT)
    im = ImageEnhance.Contrast(im).enhance(CON)
    im = ImageEnhance.Brightness(im).enhance(BRI)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * WARM_R)))
    b = b.point(lambda v: int(v * WARM_B))
    return Image.merge("RGB", (r, g, b))

if __name__ == "__main__":
    args = sys.argv[1:]
    if args and args[0] == "--test":
        enhance(Image.open(args[1])).save(args[2], "JPEG", quality=88, optimize=True)
        print("wrote", args[2])
    else:
        for p in args:
            enhance(Image.open(p)).save(p, "JPEG", quality=86, optimize=True)
        print("enhanced", len(args), "images in place")
