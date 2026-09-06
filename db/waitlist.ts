import { env } from 'cloudflare:workers';
import { WAITLIST_NOTICE_VERSION } from '../app/legal-config';

export async function addToWaitlist(
  email: string,
  source: 'website' | 'webmcp',
) {
  if (!env.DB) throw new Error('Waitlist storage unavailable');
  await env.DB.prepare(
    `INSERT INTO waitlist (email, created_at, consent_at, consent_source, notice_version)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
       consent_at = COALESCE(waitlist.consent_at, excluded.consent_at),
       consent_source = COALESCE(waitlist.consent_source, excluded.consent_source),
       notice_version = COALESCE(waitlist.notice_version, excluded.notice_version)`,
  )
    .bind(
      email,
      new Date().toISOString(),
      new Date().toISOString(),
      source,
      WAITLIST_NOTICE_VERSION,
    )
    .run();
}
