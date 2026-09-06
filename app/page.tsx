'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
} from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  LoaderCircle,
} from 'lucide-react';
import { flushSync } from 'react-dom';
import { PointerEffects } from './pointer-effects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EquipmentDemo } from './experience';
import { MechanicalHero } from './motor-hero';
import {
  legal,
  WAITLIST_CONSENT_TEXT,
  WAITLIST_NOTICE_VERSION,
} from './legal-config';

function Waitlist({ id }: { id: string }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>(
    'idle',
  );
  const successMessage = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const joinWaitlist = useCallback(
    async (
      email: string,
      website = '',
      source: 'website' | 'webmcp' = 'website',
    ) => {
      if (inFlight.current) throw new Error('A signup is already in progress');
      inFlight.current = true;
      setStatus('saving');
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            website,
            consent: true,
            noticeVersion: WAITLIST_NOTICE_VERSION,
            source,
          }),
          signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw new Error('Could not join the waitlist');
        flushSync(() => setStatus('success'));
        successMessage.current?.focus({ preventScroll: true });
        return { status: 'joined' };
      } catch (error) {
        setStatus('error');
        throw error;
      } finally {
        inFlight.current = false;
      }
    },
    [],
  );
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: 'join_waitlist',
            title: 'Join the Praxis waitlist',
            description:
              'Join the Praxis early-access email waitlist only after the user agrees to the signup notice: ' +
              WAITLIST_CONSENT_TEXT +
              ' Privacy information is available at /privacy.',
            inputSchema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email', maxLength: 254 },
                consent: {
                  type: 'boolean',
                  const: true,
                  description: WAITLIST_CONSENT_TEXT,
                },
              },
              required: ['email', 'consent'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            async execute(input: unknown) {
              if (
                !input ||
                typeof input !== 'object' ||
                !('email' in input) ||
                typeof input.email !== 'string' ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
                input.email.length > 254 ||
                !('consent' in input) ||
                input.consent !== true
              )
                throw new Error(
                  'A valid email and explicit agreement to early-access emails are required',
                );
              return joinWaitlist(input.email, '', 'webmcp');
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* Optional browser capability. */
    }
    return () => lifecycle.abort();
  }, [joinWaitlist]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      await joinWaitlist(
        String(data.get('email') || ''),
        String(data.get('website') || ''),
      );
    } catch {
      /* The form keeps its values and displays a retry message. */
    }
  }
  return (
    <div className="signup" id={id}>
      {status === 'success' ? (
        <div
          className="success"
          role="status"
          tabIndex={-1}
          ref={successMessage}
        >
          <Check size={22} aria-hidden="true" />
          <div>
            <strong>You’re on the list.</strong>
            <p>We’ll reach out when early access opens.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={status === 'saving'}>
          <label className="field-label" htmlFor={`${id}-email`}>
            Work email
          </label>
          <div className="email-row silver-frame">
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              autoCapitalize="none"
              placeholder="you@company.com"
              maxLength={254}
              required
              aria-describedby={`${id}-privacy`}
              className="email-input"
              disabled={status === 'saving'}
            />
            <Button
              className="join-button"
              type="submit"
              disabled={status === 'saving'}
            >
              {status === 'saving' ? (
                <>
                  <LoaderCircle
                    className="loading-spinner"
                    size={18}
                    aria-hidden="true"
                  />
                  Joining…
                </>
              ) : (
                <>
                  Join the waitlist
                  <ArrowUpRight size={18} aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
          <input
            className="honeypot"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <p className="form-note" aria-live="polite">
            {status === 'error'
              ? 'Couldn’t save your details. Please try again.'
              : 'Early access updates. No noise.'}
          </p>
        </form>
      )}
    </div>
  );
}

function followSilver(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType === 'touch' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return;
  event.currentTarget
    .querySelectorAll<HTMLElement>('.silver-text')
    .forEach((text) => {
      text.style.setProperty(
        '--silver-x',
        `${event.clientX - text.getBoundingClientRect().left}px`,
      );
    });
}

function resetSilver(event: PointerEvent<HTMLElement>) {
  event.currentTarget
    .querySelectorAll<HTMLElement>('.silver-text')
    .forEach((text) => {
      text.style.removeProperty('--silver-x');
    });
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('will-reveal');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <PointerEffects />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="nav shell">
        <a
          className="wordmark"
          href="#"
          aria-label="Praxis home"
          translate="no"
        >
          <span className="brand-mark" aria-hidden="true">
            ◈
          </span>
          Praxis<span className="brand-period">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#" className="nav-cta">
            Get early access <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section
          className="hero shell"
          aria-labelledby="headline"
          onPointerMove={followSilver}
          onPointerLeave={resetSilver}
        >
          <div className="hero-copy">
            <div className="eyebrow">BUILT FOR THE HANDS THAT BUILD.</div>
            <h1 id="headline">
              Ask out loud.
              <br />
              <span className="silver-text">Keep working.</span>
            </h1>
            <p className="hero-description">
              Talk to it with your hands full, phone still in your pocket.
              <br className="desktop-break" /> Get the spec, the diagram, the
              next check — and finish the job without calling your supervisor.
            </p>
            <Waitlist id="waitlist" />
          </div>
          <MechanicalHero />
          <div className="hero-baseline">
            <span>HVAC · REFRIGERATION · ELECTRICAL</span>
            <a href="#approach">
              A closer look <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <section
          className="approach shell"
          id="approach"
          aria-labelledby="approach-heading"
        >
          <div className="section-top reveal">
            <p className="eyebrow">01 / HOW IT WORKS</p>
          </div>
          <h2 className="reveal" id="approach-heading">
            See the equipment.
            <br />
            <span>Understand the job.</span>
          </h2>
          <EquipmentDemo />
        </section>
        <section
          className="people shell"
          id="learning"
          aria-labelledby="people-heading"
        >
          <div className="people-intro reveal">
            <p className="eyebrow">02 / PEOPLE FIRST</p>
            <h2 id="people-heading">
              Your assistant.
              <br />
              <span>Not your replacement.</span>
            </h2>
            <p className="people-description">
              Praxis explains the reasoning behind a step, not just the step. A
              newer tech learns why the reading matters while they take it — and
              asks their supervisor one less question every job.
            </p>
            <figure className="founder-note">
              <p className="learning-label">WHY WE STARTED</p>
              <blockquote>
                We like to work on our stuff, and we keep running into the same
                gap: AI falls short when our hands are greasy, we can’t reach
                our phones, or the problem doesn’t fit a familiar pattern. Every
                shop has someone who just knows. We want them in your ear on
                every call. That’s why we’re building Praxis.
              </blockquote>
              <figcaption>Guhan &amp; Swayam</figcaption>
            </figure>
          </div>
          <div className="learning-copy reveal">
            <article className="silver-frame learning-card">
              <span className="learning-label">01 / FOR THE TECH</span>
              <h3>Help when your hands are full.</h3>
              <p>
                Stopping to type or scroll isn’t practical on a ladder or behind
                a unit. Praxis answers by voice, so both hands stay on the work.
              </p>
            </article>
            <article className="silver-frame learning-card">
              <span className="learning-label">02 / FOR THE SHOP</span>
              <h3>Fewer callbacks. Less senior time on junior questions.</h3>
              <p>
                A second-year tech handles a first-year problem. Your best
                people stay on the jobs that actually need them.
              </p>
            </article>
            <p className="consent-note">
              Your work. Your permission. Joining this waitlist is not consent
              to AI training.{' '}
              <a href="/privacy#training-data">
                How we plan to use training data
              </a>
              .
            </p>
          </div>
        </section>
        <section
          className="closing shell reveal"
          aria-labelledby="closing-heading"
          onPointerMove={followSilver}
          onPointerLeave={resetSilver}
        >
          <div>
            <h2 id="closing-heading">
              <span className="closing-line closing-line-first">
                Get in early.
              </span>
              <br />
              <span className="closing-line closing-line-next silver-text">
                Shape what it does.
              </span>
            </h2>
          </div>
          <div className="closing-right">
            <p>
              Tell us what breaks, what’s missing, and what you’d never use. We
              build from there.
            </p>
            <a className="closing-link" href="#">
              Let’s get to work <ArrowRight size={22} />
            </a>
          </div>
        </section>
      </main>
      <footer className="shell site-footer">
        <a className="wordmark" href="#" translate="no">
          Praxis.
        </a>
        <p>For HVAC, refrigeration and electrical techs.</p>
        <nav aria-label="Legal and contact">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Website terms</a>
          <a href="/contact">Contact</a>
          <a href="/privacy#training-data">Training data</a>
        </nav>
        <a className="footer-contact" href={`mailto:${legal.email}`}>
          {legal.email}
        </a>
        <span>© {new Date().getFullYear()} Praxis</span>
        <p className="footer-privacy" id="waitlist-privacy">
          By joining, you ask Praxis to email you about early access. Withdraw
          anytime by emailing{' '}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>. This does not
          give permission for AI training. <a href="/privacy">Privacy notice</a>
          .
        </p>
      </footer>
    </>
  );
}
