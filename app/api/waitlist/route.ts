import { addToWaitlist } from '@/db/waitlist';
import { WAITLIST_NOTICE_VERSION } from '@/app/legal-config';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: 'Invalid origin' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json'))
    return Response.json({ error: 'Expected JSON' }, { status: 415 });
  if (Number(request.headers.get('content-length') || 0) > 2048)
    return Response.json({ error: 'Request too large' }, { status: 413 });
  let body: {
    email?: unknown;
    website?: unknown;
    consent?: unknown;
    noticeVersion?: unknown;
    source?: unknown;
  };
  try {
    const text = await request.text();
    if (text.length > 2048)
      return Response.json({ error: 'Request too large' }, { status: 413 });
    body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new Error('Invalid body');
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true });
  if (
    body.consent !== true ||
    body.noticeVersion !== WAITLIST_NOTICE_VERSION ||
    (body.source !== 'website' && body.source !== 'webmcp')
  ) {
    return Response.json(
      {
        error:
          'Please review the current signup notice and request early-access emails.',
      },
      { status: 400 },
    );
  }
  const email =
    typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: 'Enter a valid email' }, { status: 400 });
  try {
    await addToWaitlist(email, body.source);
    return Response.json(
      { ok: true },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return Response.json(
      { error: 'Please try again shortly' },
      { status: 503 },
    );
  }
}
