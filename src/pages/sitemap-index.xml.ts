import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isPublished } from '@/utils/blog';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site ?? 'https://newmanship.com').toString().replace(/\/$/, '');

  const staticPages = [
    '',
    '/sumstone/',
    '/stellar-habits/',
    '/choreganized/',
    '/sproutawake/',
    '/blog/',
  ];

  const posts = await getCollection('blog', isPublished);
  // Static pages omit lastmod: stamping them with the build time on every deploy
  // (including the daily scheduled one) tells search engines nothing.
  const staticEntries: Array<{ path: string; lastmod?: string }> = staticPages.map((path) => ({ path }));
  const blogEntries = posts.map((post) => ({
    path: `/blog/${post.slug}/`,
    lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
  }));

  const allEntries = [...staticEntries, ...blogEntries];

  const urlEntries = allEntries
    .map(
      ({ path, lastmod }) => `
  <url>
    <loc>${siteUrl}${path}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
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
