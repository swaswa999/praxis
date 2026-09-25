import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './legal.css';
import './brand.css';
import './mayter.css';
import './landing.css';
import './service-experience.css';
import './training-sequence.css';
import { pageMetadata, SITE_DESCRIPTION, siteStructuredData } from './seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = { themeColor: '#fafbf7' };

export const metadata: Metadata = {
  ...pageMetadata('Mayter — Robotics for Automotive Service', SITE_DESCRIPTION),
  icons: { icon: '/favicon.svg' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          id="mu-site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteStructuredData).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
