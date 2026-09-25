import type { Metadata } from 'next';

export const SITE_URL = 'https://mayter.ai';
export const SITE_NAME = 'Mayter';
export const SITE_DESCRIPTION =
  'Mayter is developing a rail-mounted robot with hot swappable tools and a vision-language-action AI model for automotive repair.';

export function pageMetadata(
  title: string,
  description: string,
  path = '/',
): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url,
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
  };
}

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.svg`,
      description: SITE_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};
