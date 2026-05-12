import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site ?? 'https://newmanship.com').toString().replace(/\/$/, '');

  const staticPages = [
    '',
    '/sumstone/',
    '/stellar-habits/',
    '/choreganized/',
    '/sprout-alarm/',
    '/blog/',
  ];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const now = new Date().toISOString();

  const staticEntries = staticPages.map((path) => ({ path, lastmod: now }));
  const blogEntries = posts.map((post) => ({
    path: `/blog/${post.slug}/`,
    lastmod: post.data.pubDate.toISOString(),
  }));

  const allEntries = [...staticEntries, ...blogEntries];

  const urlEntries = allEntries
    .map(
      ({ path, lastmod }) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '' ? '1.0' : path.includes('/blog/') && path !== '/blog/' ? '0.6' : '0.8'}</priority>
  </url>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
