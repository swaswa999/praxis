import type { Metadata } from 'next';
import { LegalShell } from '../legal-shell';
import { contactLink, legal } from '../legal-config';

export const metadata: Metadata = {
  title: 'Website terms | Praxis',
  description: 'About the Praxis website and early-access waitlist.',
  robots: { index: false, follow: true },
};

export default function Terms() {
  return (
    <LegalShell
      title="Website terms."
      intro="A few clear boundaries for the site and the early-access waitlist."
      draft
    >
      <section>
        <h2>A product in development</h2>
        <p>
          Praxis is developing an assistant for skilled technicians. The website
          presents that vision. Illustrations, interactive diagrams, and
          described workflows are examples; they are not a live diagnostic
          service or a promise that a particular feature is available.
        </p>
      </section>
      <section>
        <h2>What joining means</h2>
        <p>
          The waitlist is free. Joining requests early-access emails; it does
          not create a purchase, guarantee an invitation or launch date, or
          require you to use a future product. Any future paid service or
          training-data program would have separate terms and notices.
        </p>
      </section>
      <section>
        <h2>Use of the site</h2>
        <p>
          Submit only an email address you control or are authorized to use. Do
          not use the form for spam, impersonation, or attempts to disrupt or
          gain unauthorized access to the site. Technical illustrations are
          simplified and must not be used as repair instructions or as a
          substitute for approved documentation and qualified judgment.
        </p>
      </section>
      <section>
        <h2>Content and third-party materials</h2>
        <p>
          Rights in site content remain with their respective owners. These
          website terms do not grant rights to third-party brands, manuals, or
          other materials. References to equipment types do not imply
          endorsement by a manufacturer.
        </p>
      </section>
      <section>
        <h2>Your information and choices</h2>
        <p>
          The <a href="/privacy">privacy notice</a> explains how the waitlist
          handles information. Privacy information is provided for transparency;
          joining does not grant permission for unrelated marketing or AI
          training.
        </p>
      </section>
      <section>
        <h2>Changes and your rights</h2>
        <p>
          The website and development plans may change. Revised terms will
          appear on this page with an updated date. Nothing here is intended to
          exclude rights or remedies that applicable law does not allow us to
          exclude.
        </p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>
          Contact <a href={contactLink('Website question')}>{legal.email}</a>{' '}
          about the website, these terms, or accessibility issues.
        </p>
      </section>
    </LegalShell>
  );
}
