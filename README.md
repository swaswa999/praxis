# Praxis

Praxis is a waitlist website for an AI assistant for skilled trades workers. The product direction is to put practical knowledge at the job, help newer technicians learn and work more independently, and let businesses grow without routing every routine question through a few senior people.

- **Live website:** https://praxis.swayams.workers.dev/
- **Private repository:** https://github.com/swaswa999/praxis
- **Deployment:** Cloudflare Worker `praxis`, with D1 database `praxis-waitlist`.

The website is functional; the technician assistant is a product concept. The equipment interactions illustrate intended assistance, not live AI responses. There is no model integration, recording feature, or implemented hands-free assistant in this repository.

## Product and design context

The central message is **“Experience at your side. On every job.”** Praxis should help people understand the reasoning behind a task and handle more of it themselves. Describe access to experienced knowledge and stronger teams, rather than promising that a beginner becomes equivalent to a senior technician or that every job needs an expert handoff.

The current direction was deliberately chosen:

- Monochrome industrial styling, silver outlines, cursor effects, and cursor-driven text highlights.
- Preserve the exploded motor in the hero and the refrigerator wireframe in section 01.
- Keep the refrigerator's three points: **Identify, Understand, Act**. Their copy names Praxis directly and follows one cooling-problem example.
- Keep interactions restrained. Extra toggles, a demo button, floating bubbles, and detailed lists beneath the refrigerator responses were removed.
- “People first” explains independent learning, busy hands, and knowledge that scales across a team.
- The team note uses **“we”**, opening with **“We like to work on our stuff…”**. The motivation includes greasy hands, difficulty using a phone, and unfamiliar problems where existing AI falls short.
- The waitlist asks only for email. Do not restore the trade-selection field without a new product decision.
- Top and closing calls to action intentionally return to the top of the page, where the signup form sits.
- Keep em dashes out of website copy. Keep detailed training information in Privacy, with a short permission note and link on the landing page.
- Treat the proposed “thousands of hours of field experience” as an aspiration, not a verified training-data total.

## Stack and file map

This is a **Vinext** application using React 19, TypeScript, Vite, and Next.js-style App Router files. It is not a conventional Next.js deployment. Styling combines CSS, Tailwind, and existing UI components. Cloudflare Workers serves the application; D1 stores signups.

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Landing page, waitlist form, team note, and browser-agent signup tool |
| `app/experience.tsx` | Refrigerator selection state and section 01 copy |
| `app/refrigerator-diagram.tsx` | Refrigerator wireframe |
| `app/motor-hero.tsx` | Exploded motor and component captions |
| `app/pointer-effects.tsx` | Silver cursor and interactive border effects |
| `app/globals.css`, `app/experience.css`, `app/motor-hero.css` | Main visual styling and motion |
| `app/layout.tsx` | Fonts, metadata, and shared styles |
| `app/api/waitlist/route.ts` | Signup validation and API response handling |
| `db/waitlist.ts`, `db/schema.ts`, `drizzle/` | D1 writes, schema, and migrations |
| `app/legal-config.ts` | Contact email, legal draft flag, and signup notice version |
| `app/privacy/`, `app/terms/`, `app/contact/` | Published information pages |
| `vite.config.ts` | Vinext build and local Cloudflare bindings |
| `wrangler.cloudflare.json` | Direct Cloudflare production deployment configuration |

## Local development

Use Node.js **22.13 or newer** and npm. Keep `package-lock.json` in sync when dependencies change.

```sh
npm ci
npm run dev -- --port 3001
```

Open http://localhost:3001/. No AI API key is needed. The page can render before local database initialization, but successful signup storage requires the schema below.

### Initialize a fresh local waitlist database

Build to generate the local Wrangler configuration, then apply the SQL files in order. Run this initialization only for a fresh local database; the SQL is not designed to be reapplied to an existing schema.

```sh
npm run build
for migration in drizzle/*.sql; do
  npx wrangler d1 execute DB --local \
    --config dist/server/wrangler.json \
    --persist-to .wrangler/state \
    --file "$migration" || break
done
```

The Vite development server uses a placeholder D1 ID and state under `.wrangler/state`. Production uses the real database in `wrangler.cloudflare.json`. These are separate databases. Do not use the production configuration to initialize the development server's database.

`npm start` runs a local preview of the built Worker. It does not publish the site.

## Waitlist behavior

`POST /api/waitlist` accepts JSON with `email`, `consent: true`, the current `noticeVersion`, and `source` (`website` or `webmcp`). The optional `website` field is a honeypot. Read `WAITLIST_NOTICE_VERSION` from `app/legal-config.ts` rather than hardcoding it into new clients.

- Email addresses are trimmed and lowercased, with basic format and length validation.
- A supplied cross-origin `Origin` is rejected. The route also checks content type, request size, notice version, and affirmative consent.
- Email is the primary key. Repeat signups do not add rows; existing non-null consent fields are preserved, and missing consent fields can be populated.
- Stored fields include email, creation time, consent time, signup source, and notice version. The nullable `trade` column is legacy and is not collected by the form.
- The form displays success only after storage succeeds. Storage failures return a retry response.
- There is no outbound email service, email-ownership verification, admin dashboard, or automated retention/deletion job. Joining stores a request; it does not send an email.
- Waitlist permission is separate from permission to collect work recordings or train AI.

To inspect the production signup count without exporting subscriber addresses:

```sh
npx wrangler d1 execute DB --remote --config wrangler.cloudflare.json \
  --command 'SELECT COUNT(*) AS signups FROM waitlist;'
```

Keep subscriber exports and authentication credentials out of Git. Local database state and backups are ignored.

## Deploy to Cloudflare

The current deployment is owned by the Cloudflare account used to provision `praxis-waitlist`. Sign into that account before deploying. The database ID in the configuration is an identifier, not a credential. Another account needs its own database and configuration.

```sh
npx wrangler login
npx wrangler whoami
npm run deploy:cloudflare
```

The deployment script builds the site, applies pending production D1 migrations, and publishes the Worker and static assets. It changes the live website and may change the production database. Inspect migrations before running it.

**Use `npm run deploy:cloudflare`, not a bare `wrangler deploy`.** The generated `dist/server/wrangler.json` contains local placeholder settings; the deployment script explicitly selects `wrangler.cloudflare.json` with the real production binding.

After editing `db/schema.ts`, run `npm run db:generate`, inspect the generated SQL, and commit the migrations. Do not edit already-applied migration files to implement new schema changes.

GitHub pushes do not automatically deploy the site. Publishing is currently manual. Existing records on the older Sites deployment were not copied into the new Cloudflare database.

## Validation and known follow-ups

Run `npm run build` after application changes. `npm run lint` and `npx tsc --noEmit` are available as additional checks. There is no dedicated automated test suite configured.

For changes to the user journey, check the three refrigerator selections, motor interaction, keyboard focus, narrow layouts, reduced motion, and signup error/success states. Use local test data where possible. If a production signup is tested, verify and remove only the synthetic record afterward.

At the initial Cloudflare launch, the home, Privacy, Terms, Contact, and motor image returned successful responses. A test signup was verified in D1 and removed. These checks are a historical baseline, not a guarantee for later changes.

Privacy and Terms are **already published with draft labels**. The legal operator, jurisdiction, target countries, retention process, and provider details still need confirmation. The owner supplied `swayam@praxis.com`, but ownership and monitoring of that inbox have not been verified. Review the actual policy text and processes before removing draft labels; changing `legal.draft` alone does not resolve the draft content. These pages are not a certification of compliance.

## Project history and preserved copies

The project began as Guidehand and was renamed Praxis. The local folder remains `guidehand-experimental` under `Desktop/Projects`; that folder name is not the product name.

An original Guidehand website was preserved separately. This repository is the later Praxis version. Its older Sites publication remains at https://praxis.swayamshrimali.chatgpt.site/, while the Cloudflare URL above is the current address to share.

`.openai/hosting.json` and the Sites Vite plugin remain for the earlier deployment path. Do not reuse the Sites project ID as a Cloudflare account or database ID. The direct Cloudflare configuration is separate.

Local `backups/`, `EXPERIMENT.md`, `LEGAL-READINESS.md`, and `QUALITY-REVIEW.md` are intentionally excluded from Git. Some contain older paths or pre-publication notes; use this README and the current source for the present setup.
