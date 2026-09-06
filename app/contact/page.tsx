import type { Metadata } from 'next';
import { LegalShell } from '../legal-shell';
import { contactLink, legal } from '../legal-config';

export const metadata: Metadata = {
  title: 'Contact | Praxis',
  description: 'Contact Praxis about early access, privacy, or accessibility.',
};

export default function Contact() {
  return (
    <LegalShell
      title="Let’s talk."
      intro="Questions about Praxis, early access, or your information? Reach us directly."
    >
      <section className="contact-primary">
        <h2>Email Praxis</h2>
        <a href={contactLink('Hello Praxis')}>{legal.email}</a>
      </section>
      <section>
        <h2>Privacy or waitlist removal</h2>
        <p>
          To leave the waitlist or request access, correction, or deletion of
          your information,{' '}
          <a href={contactLink('Praxis privacy request')}>
            email a privacy request
          </a>
          . Include the email address you used to join. Please do not send
          identity documents unless we explain why they are necessary.
        </p>
        <a
          className="legal-action"
          href={contactLink('Remove me from the Praxis waitlist')}
        >
          Request waitlist removal <span aria-hidden="true">↗</span>
        </a>
      </section>
      <section>
        <h2>Accessibility</h2>
        <p>
          If something on the site is difficult to read, navigate, or use,{' '}
          <a href={contactLink('Praxis website accessibility')}>
            tell us about the barrier
          </a>
          . The page address, your browser, and a short description help us
          investigate. You can also ask about early access by email.
        </p>
      </section>
      <section>
        <h2>Keep job information private</h2>
        <p>
          This inbox is for questions about Praxis. Please avoid sending
          confidential customer information, job recordings, or sensitive
          equipment records.
        </p>
      </section>
    </LegalShell>
  );
}
