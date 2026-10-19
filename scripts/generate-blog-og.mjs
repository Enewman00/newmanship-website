#!/usr/bin/env node
/**
 * Generate blog OG images (1200x630 PNG) matching the layout of
 * generate-og-images.py, without needing Python/PIL.
 *
 * Usage: node scripts/generate-blog-og.mjs <slug> [<slug> ...]
 * Reads title/author/date/tags from src/content/blog/<slug>.mdx and writes
 * public/og/blog-<slug>.png.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const W = 1200;
const H = 630;
const BG = '#FAFAF8';
const SURFACE = '#F2F0EC';
const INK = '#1A1A1A';
const INK_MUTED = '#6B6B6B';
const ACCENT = '#2563EB';
const FONT = "Inter, 'Segoe UI', Arial, sans-serif";

function frontmatter(slug) {
  const src = fs.readFileSync(path.join(ROOT, 'src/content/blog', `${slug}.mdx`), 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---/)[1];
  const get = (key) => fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1]?.trim();
  return {
    title: JSON.parse(get('title')),
    author: get('author') ? JSON.parse(get('author')) : 'Ethan Newman',
    date: new Date(get('pubDate')),
    tags: get('tags') ? JSON.parse(get('tags')) : [],
  };
}

function wrap(text, maxChars) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg({ title, author, date, tags }) {
  const lines = wrap(title, 32);
  const lineHeight = 72;
  const titleTop = 275 - ((lines.length - 1) * lineHeight) / 2;
  const dateText = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const text = (y, size, color, content, weight = 400) =>
    `<text x="${W / 2}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="middle">${esc(content)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="8" fill="${ACCENT}"/>
  ${text(78, 22, ACCENT, 'NEWMANSHIP BLOG', 500)}
  <rect x="420" y="96" width="360" height="3" fill="${SURFACE}"/>
  ${lines.map((l, i) => text(titleTop + i * lineHeight, 56, INK, l, 500)).join('\n  ')}
  ${text(480, 22, INK_MUTED, `${author}  ·  ${dateText}`)}
  ${text(512, 18, ACCENT, tags.map((t) => `#${t}`).join('  ·  '))}
  ${text(585, 20, INK_MUTED, 'newmanship.com/blog')}
</svg>`;
}

const slugs = process.argv.slice(2);
if (slugs.length === 0) {
  console.error('Usage: node scripts/generate-blog-og.mjs <slug> [<slug> ...]');
  process.exit(1);
}

for (const slug of slugs) {
  const out = path.join(ROOT, 'public/og', `blog-${slug}.png`);
  await sharp(Buffer.from(svg(frontmatter(slug)))).png().toFile(out);
  console.log(`Generated ${path.relative(ROOT, out)}`);
}
