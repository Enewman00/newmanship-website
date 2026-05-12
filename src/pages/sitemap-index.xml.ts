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
  const blogUrls = posts.map((post) => `/blog/${post.slug}/`);

  const allUrls = [...staticPages, ...blogUrls];
  const now = new Date().toISOString();

  const urlEntries = allUrls
    .map(
      (path) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
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
