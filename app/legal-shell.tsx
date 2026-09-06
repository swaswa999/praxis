import type { ReactNode } from 'react';
import { legal } from './legal-config';

export function LegalShell({
  title,
  intro,
  children,
  draft = false,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  draft?: boolean;
}) {
  return (
    <div className="legal-page">
      <a className="skip-link" href="#legal-content">
        Skip to content
      </a>
      <header className="legal-header shell">
        <a className="wordmark" href="/" aria-label="Praxis home">
          Praxis.
        </a>
        <a href="/#waitlist">
          Back to the waitlist <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main className="legal-main" id="legal-content" tabIndex={-1}>
        <p className="eyebrow">PRAXIS / INFORMATION</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        {draft && legal.draft && (
          <p className="legal-draft">
            Draft for review. Business identity, location, and operational
            details must be confirmed before publication.
          </p>
        )}
        <p className="legal-date">
          {draft && legal.draft ? 'Draft updated' : 'Last updated'}:{' '}
          {legal.updated}
        </p>
        <div className="legal-content">{children}</div>
      </main>
      <footer className="shell legal-footer">
        <a className="wordmark" href="/">
          Praxis.
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
