import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './experience.css';
import './motor-hero.css';
import './legal.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = { themeColor: '#000000' };

export const metadata: Metadata = {
  title: 'Praxis | Ask out loud. Keep working.',
  description:
    'A wearable AI assistant for the skilled trades. Ask for the spec, the diagram, or the next check with your hands on the work and your phone in your pocket. Join the early access waitlist.',
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
        {children}
      </body>
    </html>
  );
}
