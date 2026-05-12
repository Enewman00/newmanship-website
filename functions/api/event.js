/**
 * Cloudflare Pages Function: proxy Plausible event submissions.
 * Forwards pageview and custom-event payloads to plausible.io while
 * forwarding the visitor's IP so analytics data stays accurate.
 */
export async function onRequest(context) {
  const req = context.request;

  const response = await fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      'Content-Type': req.headers.get('Content-Type') || 'application/json',
      'User-Agent': req.headers.get('User-Agent') || '',
      'X-Forwarded-For': req.headers.get('CF-Connecting-IP') || '',
    },
    body: req.body,
  });

  return new Response(null, { status: response.status });
}
