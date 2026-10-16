#!/usr/bin/env python3
"""Convert source art in assets-src/ into the compressed WebP files served from public/.

Run from anywhere: python3 -I scripts/optimize-images.py
"""
import base64
import io
import math
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
PUBLIC = ROOT / "public"

rows = []


def fail(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def need(path):
    if not path.exists():
        fail(f"missing input: {path}")
    return path


def kb(n):
    return f"{n / 1024:,.0f} KB"


def record(src_label, src_size, out_path):
    out_size = out_path.stat().st_size
    rows.append((out_path.relative_to(ROOT).as_posix(), src_size, out_size))
    print(f"{src_label}: {kb(src_size)} -> {kb(out_size)}  ({out_path.relative_to(ROOT).as_posix()})")


# ---------- products ----------
def convert_products():
    base = SRC / "Ghost Mannequins"
    need(base)
    pngs = sorted(base.rglob("*.png"))
    if not pngs:
        fail(f"no PNGs found under {base}")
    for png in pngs:
        out = PUBLIC / "Ghost Mannequins" / png.relative_to(base).with_suffix(".webp")
        out.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(png) as im:
            im.convert("RGBA").save(out, "WEBP", quality=88, alpha_quality=100, method=6)
        record(png.name, png.stat().st_size, out)


# ---------- marble ----------
def clip(a):
    return np.clip(a, 0.0, 1.0)


def saturate(rgb, s):
    r, g, b = rgb
    nr = (.213 + .787 * s) * r + (.715 - .715 * s) * g + (.072 - .072 * s) * b
    ng = (.213 - .213 * s) * r + (.715 + .285 * s) * g + (.072 - .072 * s) * b
    nb = (.213 - .213 * s) * r + (.715 - .715 * s) * g + (.072 + .928 * s) * b
    return clip(nr), clip(ng), clip(nb)


def brightness(rgb, b):
    return tuple(clip(c * b) for c in rgb)


def contrast(rgb, c):
    return tuple(clip((ch - .5) * c + .5) for ch in rgb)


def hue_rotate(rgb, deg):
    r, g, b = rgb
    cs, sn = math.cos(math.radians(deg)), math.sin(math.radians(deg))
    a00 = .213 + cs * .787 - sn * .213
    a01 = .715 - cs * .715 - sn * .715
    a02 = .072 - cs * .072 + sn * .928
    a10 = .213 - cs * .213 + sn * .143
    a11 = .715 + cs * .285 + sn * .140
    a12 = .072 - cs * .072 - sn * .283
    a20 = .213 - cs * .213 - sn * .787
    a21 = .715 - cs * .715 + sn * .715
    a22 = .072 + cs * .928 + sn * .072
    nr = a00 * r + a01 * g + a02 * b
    ng = a10 * r + a11 * g + a12 * b
    nb = a20 * r + a21 * g + a22 * b
    return clip(nr), clip(ng), clip(nb)


def to_float(im):
    arr = np.asarray(im, dtype=np.float32) / 255.0
    return arr[..., 0].copy(), arr[..., 1].copy(), arr[..., 2].copy()


def to_image(rgb):
    arr = np.stack([np.round(clip(c) * 255.0) for c in rgb], axis=-1).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def parent_filter(rgb):
    # .marble-overlay { filter: saturate(0.65) brightness(0.75) contrast(1.1) }
    return contrast(brightness(saturate(rgb, .65), .75), 1.1)


def convert_marble():
    src = need(SRC / "black and gold marble.png")
    src_size = src.stat().st_size
    with Image.open(src) as im:
        im = im.convert("RGB")

        desk = im.resize((3840, 2560), Image.LANCZOS)
        out = PUBLIC / "black and gold marble.webp"
        desk.save(out, "WEBP", quality=82, method=6)
        record(src.name + " (desktop)", src_size, out)

        mob = im.resize((4500, 3000), Image.LANCZOS)

    raw = to_float(mob)
    # Baked ::after glow (mean of the metallicGlow 25% / 75% keyframe filters)
    g = contrast(raw, 1.55)
    g = brightness(g, 1.65)
    g = saturate(g, 1.45)
    g = hue_rotate(g, -2.5)
    glow = to_image(g).filter(ImageFilter.GaussianBlur(1.6))
    glow_f = to_float(glow)

    # screen blend: 1 - (1 - base) * (1 - glow)
    comp = tuple(clip(1.0 - (1.0 - a) * (1.0 - b)) for a, b in zip(raw, glow_f))

    out = PUBLIC / "marble-mobile-base.webp"
    to_image(parent_filter(raw)).save(out, "WEBP", quality=82, method=6)
    record(src.name + " (mobile base)", src_size, out)

    out = PUBLIC / "marble-mobile-glow.webp"
    to_image(parent_filter(comp)).save(out, "WEBP", quality=82, method=6)
    record(src.name + " (mobile glow)", src_size, out)


# ---------- logo ----------
def convert_logo():
    src = need(SRC / "Metallic SB Logo.svg")
    text = src.read_text(encoding="utf-8")
    tags = re.findall(r"<image\b[^>]*>", text, re.S)
    if len(tags) != 1:
        fail(f"expected exactly one <image> in {src.name}, found {len(tags)}")
    tag = tags[0]
    w = float(re.search(r'\bwidth="([\d.]+)"', tag).group(1))
    h = float(re.search(r'\bheight="([\d.]+)"', tag).group(1))
    tx, ty = map(float, re.search(r"translate\(\s*([-\d.]+)[\s,]+([-\d.]+)\s*\)", tag).groups())
    s = float(re.search(r"scale\(\s*([-\d.]+)\s*\)", tag).group(1))
    b64 = re.search(r"base64,([A-Za-z0-9+/=\s]+)", tag).group(1)
    png = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGBA")

    k = 0.5  # viewBox 1500x1000 -> 750x500
    bx, by, bw, bh = tx * k, ty * k, w * s * k, h * s * k
    scale = min(bw / png.width, bh / png.height)
    nw, nh = max(1, round(png.width * scale)), max(1, round(png.height * scale))
    img = png.resize((nw, nh), Image.LANCZOS)
    pos = (round(bx + (bw - nw) / 2), round(by + (bh - nh) / 2))

    canvas = Image.new("RGBA", (750, 500), (0, 0, 0, 0))
    canvas.paste(img, pos)
    out = PUBLIC / "Metallic SB Logo.webp"
    canvas.save(out, "WEBP", quality=90, alpha_quality=100, method=6)
    record(src.name, src.stat().st_size, out)


# ---------- catalogue ----------
def update_catalogue():
    path = need(ROOT / "src" / "data" / "catalogue.jsx")
    text = path.read_text(encoding="utf-8")
    before = len(re.findall(r"/Ghost Mannequins/[^'\"]+?\.png", text))
    new, n = re.subn(r"(/Ghost Mannequins/[^'\"]+?)\.png(\?v=\d+)?(?=['\"])", r"\1.webp", text)
    if n != before:
        fail(f"catalogue: replaced {n}, expected {before}")
    if re.search(r"/Ghost Mannequins/[^'\"]*\.png", new):
        fail("catalogue: a Ghost Mannequins .png reference remains")
    if new != text:
        path.write_text(new, encoding="utf-8")
    print(f"catalogue.jsx: {n} references now .webp")


def main():
    convert_products()
    convert_marble()
    convert_logo()
    update_catalogue()

    print("\nSize table (largest outputs first)")
    for name, a, b in sorted(rows, key=lambda r: -r[2])[:10]:
        print(f"{kb(a):>12} -> {kb(b):>10}  {name}")
    ta, tb = sum(r[1] for r in rows), sum(r[2] for r in rows)
    print(f"{'TOTAL':>12}: {kb(ta)} -> {kb(tb)}  ({len(rows)} files)")


if __name__ == "__main__":
    main()
