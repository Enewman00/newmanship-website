#!/usr/bin/env python3
"""Generate branded OG images (1200x630 PNG) for the Newmanship site."""

from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'og')
os.makedirs(OUT_DIR, exist_ok=True)

# Brand tokens
BG        = '#FAFAF8'
SURFACE   = '#F2F0EC'
INK       = '#1A1A1A'
INK_MUTED = '#6B6B6B'
ACCENT    = '#2563EB'

# App data (mirrors src/content/apps/*.json)
APPS = [
    {
        'slug': 'sumstone',
        'name': 'Sumstone',
        'tagline': 'The classic numbers puzzle — pick your tiles, reach the target, beat the clock.',
        'category': 'Puzzle / Game',
        'bg': '#F5F0E8',
        'accent': '#C9A84C',
        'text': '#1A1A1A',
        'text_muted': '#6B6B6B',
    },
    {
        'slug': 'stellar-habits',
        'name': 'Stellar Habits',
        'tagline': 'Your habits are stars waiting to be lit.',
        'category': 'Productivity / Habit Tracker',
        'bg': '#050709',
        'accent': '#F59E0B',
        'text': '#FFFFFF',
        'text_muted': '#AAAAAA',
    },
    {
        'slug': 'choreganized',
        'name': 'Choreganized',
        'tagline': 'Never Miss What Matters.',
        'category': 'Productivity / Life Management',
        'bg': '#FBF6EC',
        'accent': '#6366F1',
        'text': '#1A1A1A',
        'text_muted': '#6B6B6B',
    },
    {
        'slug': 'sprout-alarm',
        'name': 'SproutAwake',
        'tagline': 'Wake up. Plant trees.',
        'category': 'Lifestyle / Alarm Clock',
        'bg': '#F0FDF4',
        'accent': '#22C55E',
        'text': '#1A1A1A',
        'text_muted': '#6B6B6B',
    },
]

# Blog post data (mirrors src/content/blog/*.mdx frontmatter)
BLOG_POSTS = [
    {
        'slug': '5-ways-to-make-math-fun-again',
        'title': '5 Ways to Make Math Fun Again',
        'author': 'Ethan Newman',
        'date': 'April 28, 2026',
        'tags': ['math', 'puzzle', 'brain games'],
    },
    {
        'slug': 'why-streaks-dont-work',
        'title': "Why Streaks Don't Work (And What Does)",
        'author': 'Ethan Newman',
        'date': 'May 1, 2026',
        'tags': ['habits', 'productivity', 'habit tracker'],
    },
    {
        'slug': 'home-maintenance-schedule-youll-actually-follow',
        'title': "The Home Maintenance Schedule You'll Actually Follow",
        'author': 'Ethan Newman',
        'date': 'May 5, 2026',
        'tags': ['home maintenance', 'productivity'],
    },
    {
        'slug': 'how-your-morning-alarm-can-help-the-planet',
        'title': 'How Your Morning Alarm Can Help the Planet',
        'author': 'Ethan Newman',
        'date': 'May 8, 2026',
        'tags': ['environment', 'productivity', 'alarm'],
    },
]

W, H = 1200, 630


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def blend(c1, c2, t):
    """Linear blend: t=0 → c1, t=1 → c2."""
    return tuple(int(a * (1 - t) + b * t) for a, b in zip(c1, c2))


def make_font(size, bold=False):
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


def wrap_text(draw, text, font, max_width):
    """Split text into lines that fit within max_width pixels."""
    words = text.split()
    lines = []
    current = ''
    for word in words:
        test = (current + ' ' + word).strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped_centered(draw, text, y_start, font, color, max_width, line_height):
    """Draw word-wrapped centered text; returns y after the last line."""
    lines = wrap_text(draw, text, font, max_width)
    y = y_start
    for line in lines:
        draw_centered_text(draw, line, y, font, color)
        y += line_height
    return y


# ---------------------------------------------------------------------------
# Per-app OG images
# ---------------------------------------------------------------------------

def generate_app_og(app):
    img = Image.new('RGB', (W, H), hex_to_rgb(app['bg']))
    draw = ImageDraw.Draw(img)

    # Top accent bar
    draw.rectangle([0, 0, W, 10], fill=hex_to_rgb(app['accent']))

    # Subtle bottom strip — blend bg toward accent at 12%
    strip = blend(hex_to_rgb(app['bg']), hex_to_rgb(app['accent']), 0.12)
    draw.rectangle([0, H - 80, W, H], fill=strip)

    # Category label
    cat_font = make_font(22)
    draw_centered_text(draw, app['category'].upper(), 100, cat_font, app['accent'])

    # App name
    name_font = make_font(88, bold=True)
    draw_centered_text(draw, app['name'], 148, name_font, app['text'])

    # Tagline (word-wrapped)
    tag_font = make_font(32)
    draw_wrapped_centered(draw, app['tagline'], 278, tag_font, app['text_muted'], 920, 50)

    # Footer URL
    url_font = make_font(22)
    draw_centered_text(draw, 'newmanship.com', H - 50, url_font, app['text_muted'])

    out_path = os.path.join(OUT_DIR, f"{app['slug']}.png")
    img.save(out_path, 'PNG', optimize=True)
    print(f'Saved {out_path}')
    return out_path


# ---------------------------------------------------------------------------
# Per-blog-post OG images
# ---------------------------------------------------------------------------

def generate_blog_og(post):
    img = Image.new('RGB', (W, H), hex_to_rgb(BG))
    draw = ImageDraw.Draw(img)

    # Top accent bar
    draw.rectangle([0, 0, W, 8], fill=hex_to_rgb(ACCENT))

    # "Newmanship Blog" label
    label_font = make_font(22, bold=True)
    draw_centered_text(draw, 'NEWMANSHIP BLOG', 55, label_font, ACCENT)

    # Thin rule
    draw.rectangle([W // 2 - 180, 96, W // 2 + 180, 98], fill=hex_to_rgb(SURFACE))

    # Title — large bold, word-wrapped
    title_font = make_font(56, bold=True)
    title_lines = wrap_text(draw, post['title'], title_font, 950)
    line_h = 72
    total_title_h = len(title_lines) * line_h
    # Center vertically in the 120–430 band
    title_y = 120 + max(0, (310 - total_title_h) // 2)
    for line in title_lines:
        draw_centered_text(draw, line, title_y, title_font, INK)
        title_y += line_h

    # Author · date
    meta_font = make_font(22)
    meta_text = f"{post['author']}  ·  {post['date']}"
    draw_centered_text(draw, meta_text, 458, meta_font, INK_MUTED)

    # Tags
    tag_font = make_font(18)
    tags_text = '  ·  '.join(f'#{t}' for t in post['tags'][:3])
    draw_centered_text(draw, tags_text, 494, tag_font, ACCENT)

    # URL
    url_font = make_font(20)
    draw_centered_text(draw, 'newmanship.com/blog', 565, url_font, INK_MUTED)

    out_path = os.path.join(OUT_DIR, f"blog-{post['slug']}.png")
    img.save(out_path, 'PNG', optimize=True)
    print(f'Saved {out_path}')
    return out_path


# ---------------------------------------------------------------------------
# Homepage & default (from Task 2.5 — regenerated here for completeness)
# ---------------------------------------------------------------------------

def generate_homepage_og():
    img = Image.new('RGB', (W, H), hex_to_rgb(BG))
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, W, 8], fill=hex_to_rgb(ACCENT))

    strip_w = W // len(APPS)
    for i, app in enumerate(APPS):
        x0 = i * strip_w
        x1 = x0 + strip_w
        draw.rectangle([x0, 560, x1, H], fill=hex_to_rgb(app['bg']))
        app_font = make_font(18, bold=True)
        bbox = draw.textbbox((0, 0), app['name'], font=app_font)
        tw = bbox[2] - bbox[0]
        tx = x0 + (strip_w - tw) // 2
        draw.text((tx, 590), app['name'], font=app_font, fill=hex_to_rgb(app['text']))

    draw.rectangle([0, 558, W, 562], fill=hex_to_rgb(SURFACE))

    brand_font = make_font(96, bold=True)
    draw_centered_text(draw, 'Newmanship', 160, brand_font, INK)

    tag_font = make_font(36)
    draw_centered_text(draw, 'Apps That Make Daily Life Better', 290, tag_font, INK_MUTED)

    dot_font = make_font(22)
    dot_text = '· '.join(a['name'] for a in APPS)
    draw_centered_text(draw, dot_text, 380, dot_font, ACCENT)

    url_font = make_font(20)
    draw_centered_text(draw, 'newmanship.com', 510, url_font, INK_MUTED)

    out_path = os.path.join(OUT_DIR, 'homepage.png')
    img.save(out_path, 'PNG', optimize=True)
    print(f'Saved {out_path}')
    return out_path


def generate_default_og():
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
    for app in APPS:
        generate_app_og(app)
    for post in BLOG_POSTS:
        generate_blog_og(post)
    print('Done.')
