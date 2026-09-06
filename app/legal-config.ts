export const legal = {
  brand: 'Praxis',
  email: 'swayam@praxis.com',
  // Confirm the operator, jurisdiction, processors and retention before publication.
  draft: true,
  updated: 'September 5, 2026',
} as const;

export const WAITLIST_NOTICE_VERSION = '2026-09-05-v2';
export const WAITLIST_CONSENT_TEXT =
  'By joining, you ask Praxis to email you about early access. You can withdraw at any time by emailing swayam@praxis.com. This does not give permission for AI training.';

export const contactLink = (subject: string) =>
  `mailto:${legal.email}?subject=${encodeURIComponent(subject)}`;
