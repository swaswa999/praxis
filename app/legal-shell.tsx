import type { ReactNode } from 'react';
import { legal } from './legal-config';
import { Brand } from './brand';

export function LegalShell({
  title,
  intro,
  children,
  page,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  page: 'privacy' | 'terms' | 'contact';
}) {
  return (
    <div className="legal-page">
      <a className="skip-link" href="#legal-content">
        Skip to content
      </a>
      <header className="legal-header shell">
        <a className="wordmark" href="/" aria-label="Mayter home">
          <Brand />
        </a>
        <a href="/">
          Back to Mayter <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main className="legal-main" id="legal-content" tabIndex={-1}>
        <nav className="legal-page-nav" aria-label="Company information">
          <span className="eyebrow">INFORMATION</span>
          {[
            ['privacy', 'Privacy policy'],
            ['terms', 'Website terms'],
            ['contact', 'Contact'],
          ].map(([slug, label]) => (
            <a
              key={slug}
              href={`/${slug}`}
              aria-current={page === slug ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="legal-document">
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          {page !== 'contact' && (
            <p className="legal-date">Last updated: {legal.updated}</p>
          )}
          <div className="legal-content">{children}</div>
        </div>
      </main>
      <footer className="shell legal-footer">
        <a className="wordmark" href="/">
          <Brand />
        </a>
        <nav aria-label="Legal and contact">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Website terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
