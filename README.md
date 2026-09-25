# Mayter

The website for [Mayter](https://mayter.ai/), an automotive robotics company developing a rail-mounted arm with hot swappable tools. The training direction combines egocentric video and tactile data from mechanics’ work with a vision-language-action (VLA) model.

This repository contains the website and email signup service. It does not implement robot control, data recording, or model training. The repository remains [swaswa999/praxis](https://github.com/swaswa999/praxis).

## Design and implementation

The light design uses original SVG drawings and a shared vector wordmark. Scrolling moves the arm along the car and drives the attachment exchange. The training illustration has Video, Touch, and Practice states, with a scroll-controlled torque-wrench click. Motion respects reduced-motion preferences. No AI-generated raster images are used.

The stack is React 19, TypeScript, Vinext, Vite, Cloudflare Workers, and D1. Vinext uses Next.js-style App Router files; this is not a conventional Next.js deployment.

| File                                                                      | Purpose                                                                           |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `app/page.tsx`                                                            | Homepage content, navigation, and signup section                                  |
| `app/service-system.tsx`, `app/service-experience.css`                    | Vehicle and rail-mounted arm SVG, scroll motion, tool exchange, responsive layout |
| `app/training-sequence.tsx`, `app/training-sequence.css`                  | Training states and scroll-controlled wrench illustration                         |
| `app/brand.tsx`, `app/brand.css`, `public/logo.svg`, `public/favicon.svg` | Wordmark and brand assets                                                         |
| `app/mayter.css`, `app/landing.css`, `app/globals.css`                    | Shared layout and styling                                                         |
| `app/scroll-details.tsx`                                                  | Section entrances                                                                 |
| `app/layout.tsx`, `app/seo.ts`, `public/robots.txt`, `public/sitemap.xml` | Fonts, canonical URLs, metadata, and search discovery                             |
| `app/waitlist.tsx`, `app/api/waitlist/route.ts`                           | Signup UI, browser-agent integration, and API validation                          |
| `db/`, `drizzle/`                                                         | D1 storage, schema, and migrations                                                |
| `app/legal-config.ts`, `app/privacy/`, `app/terms/`, `app/contact/`       | Signup notice, public policies, and contact page                                  |
| `docs/privacy-operations.md`                                              | Manual privacy request handling                                                   |
| `vite.config.ts`                                                          | Build and local Cloudflare bindings                                               |
| `wrangler.mayter.json`                                                    | Mayter application deployment                                                     |
| `cloudflare/mayter-domain.mjs`, `wrangler.mayter-domain.json`             | Gateway for the public domain                                                     |

Earlier diagram components remain in the repository but are not used by the current homepage.

## Local development

Use Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev -- --port 3000
```

Open [localhost:3000](http://localhost:3000/). No AI API key is required. The pages render without a local database schema; successful signup storage requires initialization.

For a **fresh local database only**, build the generated local configuration and apply the SQL files in order:

```sh
npm run build
for migration in drizzle/*.sql; do
  npx wrangler d1 execute DB --local \
    --config dist/server/wrangler.json \
    --persist-to .wrangler/state \
    --file "$migration" || break
done
```

These SQL files are not intended to be reapplied to an existing schema. Local database state lives in `.wrangler/state` and uses the placeholder binding from `vite.config.ts`. Do not initialize local development with a production configuration. `npm start` previews the built Worker locally; it does not publish it.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm run build
```

There is no dedicated automated test suite. For UI changes, check narrow phone layouts, forward and reverse scroll motion, attachment docking, the wrench click, training selections, keyboard focus, and reduced motion. Verify Contact, Privacy, Terms, and signup validation. Use local test data for successful signup tests.

## Hosting and deployment

The canonical address is **https://mayter.ai/**. HTTP and `www.mayter.ai` redirect to the HTTPS apex, preserving paths and query strings.

Hosting spans two Cloudflare accounts:

- **Silicon Sparks:** the `mayter` application Worker at `https://mayter.silicon-sparks.workers.dev/` and the existing `torquespec-waitlist` D1 database. The legacy `torquespec` Worker serves the same application and shares that database.
- **TorqueSpec:** the `mayter.ai` domain and `mayter-domain` gateway Worker. The gateway forwards to the Mayter application, checks cross-origin writes, and rewrites upstream redirects. It has no database binding.

Regular application deployments update the public domain automatically. Keep the Mayter Workers URL available: redirecting it back to `mayter.ai` would create a gateway loop. Gateway changes require access to the TorqueSpec account; application changes require Silicon Sparks access.

For a UI-only release, authenticate to Silicon Sparks, build, and explicitly select the application configuration:

```sh
npx wrangler login
npx wrangler whoami
npm run build
npx wrangler deploy --config wrangler.mayter.json --keep-vars
```

To update the legacy TorqueSpec address with the same build:

```sh
npx wrangler deploy --config wrangler.torquespec.json --keep-vars
```

Do not deploy using the generated `dist/server/wrangler.json`; it contains local placeholder bindings. The `deploy:mayter` and `deploy:torquespec` npm scripts also apply production migrations, so the explicit commands above are preferable when the schema has not changed.

For a database change, run `npm run db:generate`, review the SQL, and apply pending migrations deliberately with the matching production configuration before deploying. Do not rewrite migrations that have already been applied.

After release, verify the homepage, public information pages, static assets, canonical redirects, and signup validation at `mayter.ai`.

GitHub pushes update the source repository. Cloudflare publishing uses the explicit deployment commands above.

## Signup and privacy

`POST /api/waitlist` accepts JSON containing `email`, `consent: true`, the current `noticeVersion`, and `source` (`website` or `webmcp`). Read `WAITLIST_NOTICE_VERSION` from `app/legal-config.ts`. The optional `website` field is a honeypot.

The endpoint validates origin, content type, request size, consent, and email format. Emails are normalized and deduplicated. Stored fields include email, creation time, consent time, signup source, and notice version. The legacy nullable `trade` field is not collected. Success is displayed only after storage succeeds.

Signup permission covers development updates and early-access emails. It does **not** grant permission to record work or train AI. There is no outbound email provider, email-ownership verification, admin dashboard, or automated deletion job in this repository. Privacy requests are handled manually using the owner-supplied contact address in `app/legal-config.ts`.

Keep credentials, subscriber exports, local database state, and backups out of Git. The published policies describe this website and signup list, not a deployed robotics service.

## Legacy infrastructure

The project previously used Guidehand, Praxis, and Manual Understanding branding. `wrangler.cloudflare.json` and `deploy:cloudflare` target the old Manual Understanding infrastructure and must not be used to deploy Mayter. `.openai/hosting.json` and the Sites plugin also remain from the earlier hosting path. Repository and database identifiers are retained for continuity; the current public brand and canonical domain are Mayter and `mayter.ai`.
