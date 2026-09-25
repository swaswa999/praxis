const UPSTREAM_ORIGIN = 'https://mayter.silicon-sparks.workers.dev';
const PUBLIC_ORIGIN = 'https://mayter.ai';
const PUBLIC_HOSTS = new Set(['mayter.ai', 'www.mayter.ai']);
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (!PUBLIC_HOSTS.has(incoming.hostname)) {
      return new Response('Not found', { status: 404 });
    }

    const origin = request.headers.get('Origin');
    if (
      !SAFE_METHODS.has(request.method) &&
      origin !== null &&
      origin !== incoming.origin
    ) {
      return Response.json(
        { error: 'Invalid origin' },
        { status: 403, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    if (incoming.origin !== PUBLIC_ORIGIN) {
      const canonical = new URL(PUBLIC_ORIGIN);
      canonical.pathname = incoming.pathname;
      canonical.search = incoming.search;
      return Response.redirect(canonical.toString(), 308);
    }

    // Assign the path after fixing the host, including paths beginning with //.
    const target = new URL(UPSTREAM_ORIGIN);
    target.pathname = incoming.pathname;
    target.search = incoming.search;
    const forwarded = new Request(target, request);
    forwarded.headers.delete('Host');
    if (origin === incoming.origin) {
      forwarded.headers.set('Origin', UPSTREAM_ORIGIN);
    }

    try {
      // Never follow upstream redirects with the caller's cookies or headers.
      const upstream = await fetch(forwarded, { redirect: 'manual' });
      const response = new Response(upstream.body, upstream);
      const location = response.headers.get('Location');
      if (location) {
        const redirect = new URL(location, target);
        if (redirect.origin === UPSTREAM_ORIGIN) {
          const canonical = new URL(PUBLIC_ORIGIN);
          canonical.pathname = redirect.pathname;
          canonical.search = redirect.search;
          canonical.hash = redirect.hash;
          response.headers.set('Location', canonical.toString());
        }
      }
      return response;
    } catch {
      console.error(JSON.stringify({ event: 'mayter_upstream_unavailable' }));
      return new Response(
        'The site is temporarily unavailable. Please try again shortly.',
        { status: 502, headers: { 'Cache-Control': 'no-store' } },
      );
    }
  },
};
