'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WAITLIST_CONSENT_TEXT, WAITLIST_NOTICE_VERSION } from './legal-config';

export function Waitlist({ id }: { id: string }) {
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
            title: 'Join the Mayter waitlist',
            description:
              'Join the Mayter robotics development email list only after the user agrees to the signup notice: ' +
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
                  'A valid email and explicit agreement to development and early-access emails are required',
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
            <strong>You’re on the Mayter list.</strong>
            <p>We’ll email you with development updates.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={status === 'saving'}>
          <label className="field-label" htmlFor={`${id}-email`}>
            Email address
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
              aria-describedby={`${id}-notice ${id}-status`}
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
                  Subscribe
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
          <p className="form-note" id={`${id}-status`} aria-live="polite">
            {status === 'error'
              ? 'Couldn’t save your email. Please try again.'
              : ''}
          </p>
          <p className="signup-notice" id={`${id}-notice`}>
            Join for development and early-access emails. Unsubscribe anytime.{' '}
            <Link href="/privacy" prefetch={false}>
              Privacy notice
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
