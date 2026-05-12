#!/usr/bin/env python3
"""Generate branded OG images (1200x630 PNG) for the Newmanship site."""

from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'og')
os.makedirs(OUT_DIR, exist_ok=True)

# Brand tokens
BG       = '#FAFAF8'
SURFACE  = '#F2F0EC'
INK      = '#1A1A1A'
INK_MUTED= '#6B6B6B'
ACCENT   = '#2563EB'
WHITE    = '#FFFFFF'

# App colors
APPS = [
    {'name': 'Sumstone',        'bg': '#F5F0E8', 'text': '#1A1A1A'},
    {'name': 'Stellar Habits',  'bg': '#050709', 'text': '#FFFFFF'},
    {'name': 'Choreganized',    'bg': '#FBF6EC', 'text': '#1A1A1A'},
    {'name': 'Sprout Alarm',    'bg': '#16a34a', 'text': '#FFFFFF'},
]

W, H = 1200, 630


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def make_font(size, bold=False):
    """Try to load a system font; fall back to PIL default."""
    candidates = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
        '/usr/share/fonts/truetype/freefont/FreeSansBold.otf' if bold else '/usr/share/fonts/truetype/freefont/FreeSans.otf',
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default(size=size)


def draw_centered_text(draw, text, y, font, color):
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    x = (W - text_w) // 2
    draw.text((x, y), text, font=font, fill=hex_to_rgb(color))


def generate_homepage_og():
    img = Image.new('RGB', (W, H), hex_to_rgb(BG))
    draw = ImageDraw.Draw(img)

    # Top accent bar
    draw.rectangle([0, 0, W, 8], fill=hex_to_rgb(ACCENT))

    # App color strips at bottom (560–630)
    strip_w = W // len(APPS)
    for i, app in enumerate(APPS):
        x0 = i * strip_w
        x1 = x0 + strip_w
        draw.rectangle([x0, 560, x1, H], fill=hex_to_rgb(app['bg']))
        # App name in strip
        app_font = make_font(18, bold=True)
        bbox = draw.textbbox((0, 0), app['name'], font=app_font)
        tw = bbox[2] - bbox[0]
        tx = x0 + (strip_w - tw) // 2
        draw.text((tx, 590), app['name'], font=app_font, fill=hex_to_rgb(app['text']))

    # Separator line
    draw.rectangle([0, 558, W, 562], fill=hex_to_rgb(SURFACE))

    # Main text area
    # Brand name
    brand_font = make_font(96, bold=True)
    draw_centered_text(draw, 'Newmanship', 160, brand_font, INK)

    # Tagline
    tag_font = make_font(36)
    draw_centered_text(draw, 'Apps That Make Daily Life Better', 290, tag_font, INK_MUTED)

    # Dot separator
    dot_font = make_font(22)
    dot_text = '· '.join(a['name'] for a in APPS)
    draw_centered_text(draw, dot_text, 380, dot_font, ACCENT)

    # Bottom URL
    url_font = make_font(20)
    draw_centered_text(draw, 'newmanship.com', 510, url_font, INK_MUTED)

    out_path = os.path.join(OUT_DIR, 'homepage.png')
    img.save(out_path, 'PNG', optimize=True)
    print(f'Saved {out_path}')
    return out_path


def generate_default_og():
    """Minimal fallback OG image — just the brand name on a clean background."""
    img = Image.new('RGB', (W, H), hex_to_rgb(BG))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, W, 8], fill=hex_to_rgb(ACCENT))

    brand_font = make_font(96, bold=True)
    draw_centered_text(draw, 'Newmanship', 220, brand_font, INK)

    tag_font = make_font(36)
    draw_centered_text(draw, 'Apps That Make Daily Life Better', 350, tag_font, INK_MUTED)

    url_font = make_font(22)
    draw_centered_text(draw, 'newmanship.com', 440, url_font, ACCENT)

    out_path = os.path.join(OUT_DIR, 'default.png')
    img.save(out_path, 'PNG', optimize=True)
    print(f'Saved {out_path}')
    return out_path


if __name__ == '__main__':
    generate_homepage_og()
    generate_default_og()
    print('Done.')
