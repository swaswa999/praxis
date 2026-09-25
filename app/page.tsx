import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './brand';
import { ServiceSystem } from './service-system';
import { Waitlist } from './waitlist';
import { ScrollDetails } from './scroll-details';
import { TrainingSequence } from './training-sequence';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header id="top" className="mayter-nav shell">
        <a
          className="wordmark"
          href="#top"
          aria-label="Mayter home"
          translate="no"
        >
          <Brand />
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-section" href="#approach">
            The system
          </a>
          <a className="nav-section" href="#robotics">
            Training
          </a>
          <a className="nav-section" href="#company">
            Company
          </a>
          <a className="nav-contact" href="#partner">
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <ScrollDetails />
        <section className="mayter-hero shell" aria-labelledby="headline">
          <ServiceSystem>
            <div className="landing-copy">
              <h1 id="headline">
                <span className="headline-line">
                  <span>Robots for</span>
                </span>
                <span className="headline-line">
                  <span>
                    car service<span className="orange">.</span>
                  </span>
                </span>
              </h1>
              <p className="landing-description">
                We’re building a rail-mounted robot with hot swappable tools,
                powered by AI that learns from mechanics’ work.
              </p>
              <a className="action-link landing-link" href="#approach">
                See the system <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
          </ServiceSystem>
        </section>
        <section
          className="technology-section"
          id="robotics"
          aria-labelledby="technology-heading"
        >
          <div className="shell">
            <TrainingSequence />
          </div>
        </section>
        <section
          className="company-section shell section-space"
          id="company"
          aria-labelledby="company-heading"
        >
          <div className="section-intro" data-reveal>
            <h2 id="company-heading">
              Start with
              <br />
              our own shop.
            </h2>
            <p>
              We’ve worked in dealerships and independent shops and spoken with
              mechanics about hiring and backlogs. We’re building Mayter to help
              shops take on work they don’t have the staff for.
            </p>
          </div>
          <div className="principles">
            <div data-reveal>
              <h3>Run a Mayter shop.</h3>
              <p>
                Service customers’ cars in a Mayter shop while developing and
                testing the robot.
              </p>
            </div>
            <div data-reveal>
              <h3>Measure each job.</h3>
              <p>
                Track repair quality, time, cost, and how often a person needs
                to step in.
              </p>
            </div>
            <div data-reveal>
              <h3>Supply other shops.</h3>
              <p>
                Once the system is reliable, offer it to independent shops,
                dealerships, and fleets.
              </p>
            </div>
          </div>
        </section>
        <section
          className="partner-section"
          id="partner"
          aria-labelledby="partner-heading"
        >
          <div className="shell partner-grid" data-reveal>
            <div>
              <h2 id="partner-heading">
                Talk to us<span>.</span>
              </h2>
              <p>
                Run a shop or fleet? Tell us which maintenance jobs you struggle
                to keep up with.
              </p>
            </div>
            <div className="partner-form">
              <h3>Get updates.</h3>
              <p>
                Development progress and early-access announcements by email.
              </p>
              <Waitlist id="waitlist" />
              <Link className="partner-contact" href="/contact">
                Contact Mayter <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="mayter-footer shell">
        <div className="footer-top">
          <a
            className="wordmark"
            href="#top"
            aria-label="Mayter home"
            translate="no"
          >
            <Brand />
          </a>
          <a className="back-top" href="#top">
            Back to top <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mayter</span>
          <nav aria-label="Legal and contact">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <span>Automotive robotics. In development.</span>
        </div>
      </footer>
    </>
  );
}
