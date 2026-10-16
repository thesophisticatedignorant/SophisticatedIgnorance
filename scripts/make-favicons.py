#!/usr/bin/env python3
"""Regenerate the favicon set from public/foundations.svg (macOS only: renders with QuickLook).

The art is white, so it is rendered as black on QuickLook's opaque white background and the
darkness is turned back into opacity. The result is cropped tight on the pawn, on a transparent
background, with a thin dark edge so it stays visible on light browser tab bars.

Run from anywhere:  python3 scripts/make-favicons.py
"""
import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
SOURCE = os.path.join(PUBLIC, "foundations.svg")

# 400x400 square in the 2000px render, centred on the pawn (x 957-1082, y 731-1011).
CROP_BOX = (820, 711, 1220, 1111)
assert CROP_BOX[2] - CROP_BOX[0] == CROP_BOX[3] - CROP_BOX[1], "crop box must be square"


def render_art():
    with tempfile.TemporaryDirectory() as tmp:
        with open(SOURCE, encoding="utf-8") as f:
            svg = f.read()
        svg = svg.replace('stop-color="#fff"', 'stop-color="#000"').replace("fill: #fff;", "fill: #000;")
        variant = os.path.join(tmp, "foundations-black.svg")
        with open(variant, "w", encoding="utf-8") as f:
            f.write(svg)
        subprocess.run(
            ["qlmanage", "-t", "-s", "2000", "-o", tmp, variant],
            check=True, capture_output=True,
        )
        png = variant + ".png"
        if not os.path.exists(png):
            sys.exit(f"QuickLook did not produce {png}")
        render = Image.open(png)
        render.load()
    alpha = ImageOps.invert(render.convert("L"))
    if alpha.point(lambda v: 255 if v > 8 else 0).getbbox() is None:
        # The recolour only targets #fff; if the artwork's colours change it renders blank.
        sys.exit("Rendered artwork is empty - check that foundations.svg still uses #fff fills")
    art = Image.new("RGBA", render.size, (255, 255, 255, 255))
    art.putalpha(alpha)
    return art


ART = render_art()


def make_icon(size, edge=True):
    icon = ART.crop(CROP_BOX).resize((size, size), Image.LANCZOS)
    if edge:
        a = icon.getchannel("A")
        grow = max(1, round(size / 24))
        halo = a.filter(ImageFilter.MaxFilter(2 * grow + 1)).filter(ImageFilter.GaussianBlur(grow * 0.6))
        halo = halo.point(lambda v: round(v * 0.85))
        halo_layer = Image.new("RGBA", (size, size), (0, 0, 0, 255))
        halo_layer.putalpha(halo)
        icon = Image.alpha_composite(halo_layer, icon)
    return icon


def out(name):
    return os.path.join(PUBLIC, name)


written = []

for size in (48, 96, 192, 512):
    make_icon(size).save(out(f"favicon-{size}.png"), optimize=True)
    written.append(f"favicon-{size}.png")

ico_sizes = [16, 32, 48]
ico_imgs = {n: make_icon(n) for n in ico_sizes}
ico_imgs[48].save(
    out("favicon.ico"),
    format="ICO",
    sizes=[(n, n) for n in ico_sizes],
    append_images=[ico_imgs[16], ico_imgs[32]],
)
written.append("favicon.ico")

# iOS fills transparency with black, so bake the black in and leave room for the rounded-corner mask.
inner = make_icon(144, edge=False)
touch = Image.new("RGB", (180, 180), (0, 0, 0))
touch.paste(inner, (18, 18), inner)
touch.save(out("apple-touch-icon.png"), optimize=True)
written.append("apple-touch-icon.png")

for name in written:
    path = out(name)
    with Image.open(path) as im:
        print(f"{path}  {im.size[0]}x{im.size[1]}  {im.mode}  {os.path.getsize(path)} bytes")
