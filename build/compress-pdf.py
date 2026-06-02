"""compress-pdf.py — shrink a Puppeteer-built PDF by downsampling + re-encoding
its embedded images. Usage:
    python3 build/compress-pdf.py <in.pdf> <out.pdf> [maxWidthPx=1000] [jpegQuality=72]
Needs: pip install --user pymupdf pillow
"""
import sys, io, os
import fitz
from PIL import Image

src = sys.argv[1]
out = sys.argv[2]
maxw = int(sys.argv[3]) if len(sys.argv) > 3 else 1000
q = int(sys.argv[4]) if len(sys.argv) > 4 else 72

doc = fitz.open(src)
done = set(); n = 0
for page in doc:
    for img in page.get_images(full=True):
        xref = img[0]
        if xref in done:
            continue
        done.add(xref)
        try:
            base = doc.extract_image(xref)
            im = Image.open(io.BytesIO(base["image"])).convert("RGB")
            w, h = im.size
            if w > maxw:
                im = im.resize((maxw, int(h * maxw / w)))
            buf = io.BytesIO(); im.save(buf, "JPEG", quality=q, optimize=True)
            page.replace_image(xref, stream=buf.getvalue()); n += 1
        except Exception:
            pass
doc.save(out, garbage=4, deflate=True, clean=True)
doc.close()
print("compressed %d images -> %s (%.1f MB, %d pages)" % (
    n, out, os.path.getsize(out) / 1048576, fitz.open(out).page_count))
