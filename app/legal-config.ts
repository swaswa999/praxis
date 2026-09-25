export const legal = {
  brand: 'Mayter',
  email: 'swayam@praxis.com',
  // Public contact supplied by the owner. No corporate entity or jurisdiction is inferred.
  updated: 'September 25, 2026',
} as const;

export const WAITLIST_NOTICE_VERSION = '2026-09-24-mayter-v1';
export const WAITLIST_CONSENT_TEXT =
  'By joining, you ask Mayter to email you with development updates and early-access opportunities. You can withdraw at any time by emailing swayam@praxis.com. This does not give permission for AI training.';

export const contactLink = (subject: string) =>
  `mailto:${legal.email}?subject=${encodeURIComponent(subject)}`;
