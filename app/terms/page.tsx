import type { Metadata } from 'next';
import { pageMetadata } from '../seo';
import { LegalShell } from '../legal-shell';
import { contactLink, legal } from '../legal-config';

export const metadata: Metadata = {
  ...pageMetadata(
    'Website Terms | Mayter',
    'Terms for the Mayter website and email signup.',
    '/terms',
  ),
};

export default function Terms() {
  return (
    <LegalShell
      title="Website terms"
      intro="These terms cover this website and the email signup. They do not cover a robotic service or a purchase."
      page="terms"
    >
      <section id="development">
        <h2>Mayter is in development</h2>
        <p>
          We are building robots for automotive maintenance. Descriptions and
          illustrations show our plans and concepts; they do not mean that a
          working system, particular feature, or commercial service is
          available.
        </p>
        <p>
          Plans and timelines may change. This website does not provide repair
          instructions. Do not use its drawings to service a vehicle or operate
          machinery.
        </p>
      </section>
      <section id="signup">
        <h2>Email signup</h2>
        <p>
          Signing up is free and asks us to send development and early-access
          emails. It is not an order, reservation, or guarantee of an
          invitation, product, price, or launch date.
        </p>
        <p>
          Use an email address you control or are authorized to use. You can
          withdraw your request by emailing{' '}
          <a href={contactLink('Remove me from the Mayter waitlist')}>
            {legal.email}
          </a>
          .
        </p>
      </section>
      <section id="use">
        <h2>Using the website</h2>
        <p>
          Do not submit spam, impersonate someone else, disrupt the site, bypass
          its security, or attempt to access information you are not authorized
          to see.
        </p>
        <p>
          You may browse the site and link to its public pages. Rights in the
          name, logo, text, illustrations, and other materials remain with their
          respective owners. Do not imply that Mayter endorses you or your
          business without permission.
        </p>
      </section>
      <section id="information">
        <h2>Your information</h2>
        <p>
          Our <a href="/privacy">privacy policy</a> explains the information
          this website collects and how to contact us about it. Email signup
          does not authorize recording your work or using it for AI training.
        </p>
        <p>
          Any future paid service, equipment agreement, or training-data program
          will have separate terms.
        </p>
      </section>
      <section id="availability">
        <h2>Availability and changes</h2>
        <p>
          We may update, interrupt, or remove parts of the website. We do not
          guarantee uninterrupted access or that development plans will remain
          unchanged. Nothing in these terms limits rights that applicable law
          does not allow us to limit.
        </p>
        <p>We will post revised terms on this page with an updated date.</p>
      </section>
      <section id="contact">
        <h2>Questions</h2>
        <p>
          Contact{' '}
          <a href={contactLink('Mayter website terms')}>{legal.email}</a> about
          these terms or the website.
        </p>
      </section>
    </LegalShell>
  );
}
