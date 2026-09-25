import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { pageMetadata } from '../seo';
import { LegalShell } from '../legal-shell';
import { contactLink, legal } from '../legal-config';

export const metadata: Metadata = pageMetadata(
  'Contact | Mayter',
  'Email Mayter about robotics, shop partnerships, or your information.',
  '/contact',
);

export default function Contact() {
  return (
    <LegalShell
      title="Contact Mayter"
      intro="For mechanics, shop owners, fleet teams, and anyone with a question."
      page="contact"
    >
      <section className="contact-primary">
        <p className="contact-label">EMAIL</p>
        <a href={contactLink('Hello Mayter')}>
          {legal.email}
          <ArrowUpRight size={28} aria-hidden="true" />
        </a>
        <p>Tell us what you’re working on and how we can help.</p>
      </section>
      <div className="contact-options">
        <section>
          <h2>Shops and fleets</h2>
          <p>
            Tell us about your shop, the vehicles you service, and the
            maintenance jobs you need help with.
          </p>
          <a
            className="legal-action"
            href={contactLink('Mayter — shop or fleet enquiry')}
          >
            Discuss your shop <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
        <section>
          <h2>Privacy and removal</h2>
          <p>
            To access, correct, or delete your signup information, contact us
            from the email address you used.
          </p>
          <a
            className="legal-action"
            href={contactLink('Mayter privacy request')}
          >
            Send a privacy request <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
        <section>
          <h2>Unsubscribe</h2>
          <p>
            Ask us to remove your address from the development and early-access
            email list.
          </p>
          <a
            className="legal-action"
            href={contactLink('Remove me from the Mayter waitlist')}
          >
            Request removal <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
        <section>
          <h2>Website issues</h2>
          <p>
            Include the page address and a short description if something is
            broken or difficult to use.
          </p>
          <a
            className="legal-action"
            href={contactLink('Mayter website issue')}
          >
            Report an issue <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
      </div>
      <p className="contact-note">
        These links open your email app. Please leave out confidential customer
        records and repair footage.
      </p>
    </LegalShell>
  );
}
