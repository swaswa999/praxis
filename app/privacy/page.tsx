import type { Metadata } from 'next';
import { pageMetadata } from '../seo';
import { LegalShell } from '../legal-shell';
import { contactLink, legal } from '../legal-config';

export const metadata: Metadata = {
  ...pageMetadata(
    'Privacy | Mayter',
    'What the Mayter website collects, how it is used, and how to request removal.',
    '/privacy',
  ),
};

export default function Privacy() {
  return (
    <LegalShell
      title="Privacy policy"
      intro="This policy covers the Mayter website, email signup, and messages you send us."
      page="privacy"
    >
      <section id="scope">
        <h2>About this policy</h2>
        <p>
          Mayter runs this website. You can reach the team at{' '}
          <a href={contactLink('Mayter privacy question')}>{legal.email}</a>.
          This policy covers information collected through the website and
          correspondence with us.
        </p>
      </section>
      <section id="information">
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Email signup.</strong> Your email address, signup date,
            consent date, the notice version, and whether you signed up through
            the form or a browser assistant.
          </li>
          <li>
            <strong>Messages.</strong> Your email address and the information
            you include when you contact us.
          </li>
          <li>
            <strong>Website requests.</strong> Cloudflare processes technical
            information, such as IP addresses, request details, and error logs,
            to serve and protect the site. These logs are separate from our
            signup database.
          </li>
        </ul>
        <p>
          The signup form does not collect payment details, repair recordings,
          audio, or information about your customers.
        </p>
      </section>
      <section id="use">
        <h2>How we use it</h2>
        <p>
          We use your signup details to manage the update list and send the
          development and early-access emails you request. We use messages to
          answer questions and handle requests, and technical information to
          keep the website running.
        </p>
        <p>
          Signing up does not give us permission to collect repair recordings or
          use your work for AI training. A future data-collection program would
          have its own terms and permission process.
        </p>
      </section>
      <section id="providers">
        <h2>Providers and sharing</h2>
        <p>
          Cloudflare hosts the website and stores signup records in its D1
          database. Our email provider processes correspondence sent to our
          contact address. These providers process information to deliver their
          services.
        </p>
        <p>
          The website has no advertising, data-sale, or third-party marketing
          integration. We may disclose information when legally required or
          necessary to investigate misuse of the site.
        </p>
        <p>
          Provider processing may take place outside your country. We do not
          promise that signup records or technical logs stay in a particular
          country.
        </p>
      </section>
      <section id="cookies">
        <h2>Cookies and tracking</h2>
        <p>
          The website application does not use advertising cookies, analytics
          pixels, or cross-site tracking. It does not store signup details in
          your browser. Hosting security services may process technical
          information to detect abuse.
        </p>
        <p>
          We do not change the application’s behavior in response to Do Not
          Track signals because it does not track you across websites.
        </p>
      </section>
      <section id="retention">
        <h2>Retention and removal</h2>
        <p>
          We keep signup records while you are on the update list, until you ask
          us to remove them or we close the list. Removal is handled manually
          through the contact address below.
        </p>
        <p>
          You can ask us to unsubscribe you, delete your signup record, or
          provide or correct information you submitted. Use the email address
          you signed up with so we can identify your record. We may need to
          verify a request before sharing personal information.
        </p>
        <p>
          A minimal record may be retained to honor an opt-out or meet a legal
          obligation. Hosting logs, backups, and email correspondence are
          handled separately under the relevant provider settings and the
          purpose for which the information is needed.
        </p>
      </section>
      <section id="requests">
        <h2>Contact and privacy requests</h2>
        <p>
          Email{' '}
          <a href={contactLink('Mayter privacy request')}>{legal.email}</a> with
          your request. Depending on where you live, applicable law may give you
          additional rights over your information or the right to contact a
          privacy regulator.
        </p>
        <a
          className="legal-action"
          href={contactLink('Remove me from the Mayter waitlist')}
        >
          Request removal <span aria-hidden="true">↗</span>
        </a>
      </section>
      <section id="children">
        <h2>Children</h2>
        <p>
          This website is for a professional audience. We do not knowingly
          collect personal information from children under 13. Contact us if you
          believe a child has submitted information.
        </p>
      </section>
      <section id="updates">
        <h2>Policy updates</h2>
        <p>
          We will post changes here and update the date above. If we introduce a
          different use that requires permission, we will ask before using your
          information that way.
        </p>
      </section>
    </LegalShell>
  );
}
