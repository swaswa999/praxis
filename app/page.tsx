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
            Why Mayter
          </a>
          <a className="nav-section" href="#robotics">
            Training
          </a>
          <a className="nav-section" href="#company">
            Our progress
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
              <p className="landing-status">In development · Tires first</p>
              <h1 id="headline">
                <span className="headline-line">
                  <span>Car service.</span>
                </span>
                <span className="headline-line">
                  <span>
                    After work<span className="orange">.</span>
                  </span>
                </span>
              </h1>
              <p className="landing-description">
                Robot-powered mechanic shops, starting with tires. Our goal: book
                online, come after work, and leave in 30 minutes with video proof.
              </p>
              <a className="action-link landing-link" href="#approach">
                Why Mayter <ArrowUpRight size={20} aria-hidden="true" />
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
              What we’ve
              <br />
              done.
            </h2>
            <p>From a model car to an industrial robot working on a real wheel.</p>
          </div>
          <ul className="progress-list">
            <li data-reveal>
              <span className="progress-number" aria-hidden="true">
                01
              </span>
              <p>
                Worked full-time inside <strong>two auto shops</strong>
              </p>
            </li>
            <li data-reveal>
              <span className="progress-number" aria-hidden="true">
                02
              </span>
              <p>
                Visited <strong>60+ shops</strong> and talked to <strong>200+ customers</strong>
              </p>
            </li>
            <li data-reveal>
              <span className="progress-number" aria-hidden="true">
                03
              </span>
              <p>
                Surveyed <strong>40 drivers</strong>: 70% took time off work for tire service
              </p>
            </li>
            <li data-reveal>
              <span className="progress-number" aria-hidden="true">
                04
              </span>
              <p>
                Built a <strong>model-car wheel-removal demo</strong> with custom tools
              </p>
            </li>
            <li data-reveal>
              <span className="progress-number" aria-hidden="true">
                05
              </span>
              <p>
                Partnered with <strong>10 shops</strong> to film real repairs
              </p>
            </li>
            <li data-reveal>
              <span className="progress-number" aria-hidden="true">
                06
              </span>
              <p>
                Removed lug nuts from a <strong>real wheel with an industrial robot</strong>
              </p>
              <span className="progress-status">Prototype</span>
            </li>
          </ul>
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
                Follow our first shop’s progress. Run a shop or a fleet?
                Let’s talk.
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
          <span>Our first robotic auto shop. In development.</span>
        </div>
      </footer>
    </>
  );
}
