/**
 * Cloudflare Pages Function: proxy the Plausible analytics script.
 * Serving from our own domain bypasses ad blockers and makes the URL
 * same-origin so Partytown's web worker can fetch it without CORS issues.
 */
export async function onRequest(context) {
  const response = await fetch('https://plausible.io/js/script.js', {
    headers: {
      'User-Agent': context.request.headers.get('User-Agent') || '',
    },
    // Cache the upstream script at the edge for 1 hour
    cf: { cacheTtl: 3600, cacheEverything: true },
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
