import type { Metadata } from 'next';
import { LegalShell } from '../legal-shell';
import { contactLink, legal } from '../legal-config';

export const metadata: Metadata = {
  title: 'Privacy | Praxis',
  description: 'How the Praxis waitlist handles personal information.',
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <LegalShell
      title="Your information."
      intro="What this waitlist collects, why it is used, and how to reach us about it."
      draft
    >
      <section>
        <h2>Who this notice covers</h2>
        <p>
          This notice covers the Praxis website and early-access waitlist.
          Contact the Praxis team at{' '}
          <a href={contactLink('Privacy question')}>{legal.email}</a>. It does
          not cover a future technician service or a future training-data
          program.
        </p>
      </section>
      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Waitlist details:</strong> your email address, signup time,
            and a record of the signup notice and how you joined.
          </li>
          <li>
            <strong>Messages you send us:</strong> your email address and the
            information you include in a contact or privacy request.
          </li>
          <li>
            <strong>Technical information:</strong> hosting infrastructure may
            process IP addresses, browser information, request times, and error
            logs to deliver and protect the website. These are separate from the
            waitlist database.
          </li>
        </ul>
        <p>
          The waitlist does not request job footage, audio, equipment records,
          payment information, or a trade selection. Please do not email
          confidential customer records or sensitive job material.
        </p>
      </section>
      <section>
        <h2>Why we use it</h2>
        <p>
          We use waitlist information to manage your early-access request and
          send the early-access emails you requested. We use correspondence to
          answer questions and handle privacy requests, and technical
          information to operate and protect the website.
        </p>
        <p>
          Where a legal basis is required, the proposed basis for early-access
          emails is your consent; responding to requests and maintaining a
          secure website are based on legitimate interests, subject to
          applicable law. Joining is voluntary. You can browse without providing
          an email.
        </p>
      </section>
      <section>
        <h2>Email signup is separate from AI training</h2>
        <p>
          This website does not use waitlist email addresses to train AI.
          Joining does not authorize collecting job recordings or using your
          work to train technician or robotics models. Any future program would
          need its own notice and separate permission before collection begins.
        </p>
      </section>
      <section id="training-data">
        <h2>How we plan to use training data</h2>
        <p>
          With permission, job examples, questions, repair outcomes, and expert
          feedback can help train and evaluate the AI, improving guidance for
          technicians over time.
        </p>
        <p>
          A separate program could use recordings of tool use and physical
          tasks to train robotics AI. Both the company and participating
          workers would need to explicitly agree. Job footage would not
          automatically be sold or shared for robotics training.
        </p>
        <p>
          These are plans for future programs, not data collected by this
          waitlist. Any program would need its own notice and separate
          permission before collection begins.
        </p>
      </section>
      <section>
        <h2>Service providers and disclosure</h2>
        <p>
          The site is built on Cloudflare hosting and database services. Hosting
          providers process information needed to operate the website; email
          providers process messages you send to our contact address. Access
          should be limited to the people and providers who need it for the
          purposes above.
        </p>
        <p>
          The waitlist application has no sale, advertising-sharing, or
          third-party marketing integration. Information may also need to be
          disclosed when required by law.
        </p>
        <p>
          Provider locations, retention settings, and any international-transfer
          safeguards must be confirmed before this draft is published. We do not
          currently promise storage in a particular country.
        </p>
      </section>
      <section id="cookies">
        <h2>Cookies and tracking</h2>
        <p>
          The current website application does not set advertising or analytics
          cookies, use tracking pixels, or store waitlist details in your
          browser. It does not track browsing across other websites. It does not
          change its behavior in response to Do Not Track because the
          application has no cross-site tracking functionality.
        </p>
        <p>
          Hosting security services may process technical information. Any
          change that adds nonessential tracking will require an updated notice
          and any consent required by applicable law before that tracking
          begins.
        </p>
      </section>
      <section>
        <h2>How long information is kept</h2>
        <p>
          The proposed retention approach is to keep waitlist details while
          needed to administer early access, and remove them when the waitlist
          closes or you request removal, unless a limited legal need requires
          retention. A minimal record may be needed to honor an email opt-out.
          Provider logs and backups have separate retention schedules.
        </p>
        <p>
          The exact retention schedule and deletion process are being finalized
          before publication.
        </p>
      </section>
      <section>
        <h2>Your choices and requests</h2>
        <p>
          Email{' '}
          <a href={contactLink('Remove me from the Praxis waitlist')}>
            {legal.email}
          </a>{' '}
          to withdraw your early-access email request or ask to leave the
          waitlist. Use the email address you signed up with where possible. No
          purchase or account is needed.
        </p>
        <p>
          You can also ask to access, correct, or delete information about you.
          Depending on applicable law, you may have rights to portability,
          restriction, objection, appeal, or to complain to a data-protection
          authority. We may need to verify a request before disclosing or
          changing personal information. Withdrawing consent does not affect
          earlier lawful processing.
        </p>
      </section>
      <section>
        <h2>Children</h2>
        <p>
          Praxis is intended for a professional audience. We do not knowingly
          seek personal information from children under 13. If you believe a
          child has submitted information, contact us to request removal.
        </p>
      </section>
      <section>
        <h2>Changes to this notice</h2>
        <p>
          Updates will appear here with a revised date. Material changes will be
          highlighted on the website or communicated by email where appropriate.
          A new purpose requiring consent will not be treated as covered by an
          earlier waitlist signup.
        </p>
      </section>
    </LegalShell>
  );
}
