---
name: doc-writing
description: Write documentation in the Cloud Slicer house style. Use when creating or editing anything reader-facing: the MDX guides in cloud-slicer-docs, README / CLAUDE.md / architecture notes, module and function docstrings, or long code comments that explain a design. Produces terse, why-first, source-anchored prose in the project's established voice.
---

# Cloud Slicer documentation style

Write like the existing docs in this repo and in `cloud-slicer-api` (`CLAUDE.md`, the
`app/**` module and function docstrings, `cloud-slicer-docs/pages/**/*.mdx`). This
skill is the distilled version of that voice so a new page or docstring reads like
it was always there.

There are two registers. Both share the voice and mechanics below; they differ
only in audience and layout:

- **Guide docs** (`cloud-slicer-docs/pages/**/*.mdx`): task-oriented, second
  person, code-tab examples. The reader wants to make an API call work.
- **Internal docs** (`CLAUDE.md`, architecture sections, docstrings): why-first,
  hazard-forward, source-anchored. The reader is about to change the code.

## Voice

1. **First sentence defines the thing, then you add detail.** No throat-clearing,
   no "In this guide we will".
   - > A quote is a price + print-time estimate for a specific file, printer, and filament combination.
   - > `webhook_deliveries` is a durable outbox, not just a log: the row, not the Modal queue, is the source of truth for "this event still owes a POST".
2. **Explain why, not just what.** Almost every sentence should carry a reason: a
   "because", a "so that", a trailing clause that says what breaks otherwise.
   State when something is intentional so nobody "fixes" it.
   - > The Supabase client is **synchronous** even though the app is async; DB calls block the event loop. This is intentional; do not introduce an async client without coordinating.
3. **Second person, active voice, present tense.** "You queue a job, then poll."
   "The response is `202 Accepted`." Not "A job will be queued by the caller".
4. **Bold the one load-bearing phrase in a sentence**, never a whole sentence.
   Use it for the noun a reader must not miss (`**gzipped before upload**`,
   `**production worker only**`).
5. **Hazards are blunt imperatives.** Lead with the prohibition.
   - > **Never run** `supabase migration repair --status reverted` across the existing history.
   - > Do **not** add Modal `retries=` to the webhook functions.
6. **No hype, no filler, no emoji.** Cut "simply", "just", "powerful",
   "seamless", "robust". If a limitation exists, say it plainly.
7. **Concrete over vague.** Real numbers, real names, real paths every time:
   "throttled to 1-hour intervals", "1m -> 5m -> 30m -> 2h", "~2.6h",
   "30 files as of the outbox migration". "Poll every couple of seconds with a
   sane timeout" is fine; "poll periodically" is not.

## Punctuation

- **Do not use em dashes or en dashes (`—`, `–`) in prose.** Rewrite with a
  comma, a period, parentheses, or a colon. (Existing docs still contain them;
  do not add more, and clear them when you touch a paragraph.)
  - Instead of: `Not retried after 1 attempt — the endpoint returned a non-retryable response`
  - Write: `Not retried after 1 attempt. The endpoint returned a non-retryable response.`
  - Instead of: `the row — not the Modal queue — is the source of truth`
  - Write: `the row, not the Modal queue, is the source of truth`
- **Colon** to attach a definition or consequence to a lead clause.
- **Parentheses** for a genuine aside or a pointer (`(constants in \`app/constants.py\`)`,
  `(unhyphenated)`, `(factory, note the \`()\`)`).
- **`->`** (ASCII arrow) for flows and mappings: `main` -> `cloud-slicer-api`,
  `pending` -> `success`.
- Short paragraphs, one idea each. A single-sentence paragraph is a valid way to
  make one point land.

## Mechanics

- **Every identifier in backticks**: functions (with `()`), file paths, env vars,
  table names, status strings (`"pending"`), HTTP codes when referenced as tokens.
- **Point at the canonical source.** When you describe behavior, name the file
  that owns it: "Schema and claim functions live in
  `supabase/migrations/2026…_add_webhook_delivery_outbox…sql`", "the ladder lives
  in `ORDER_WEBHOOK_RETRY_SCHEDULE_SECONDS` in `constants.py`", "See the outbox
  section below".
- **Headings are plain descriptive noun phrases**: `## Poll until ready`,
  `### Webhook delivery outbox`, `### Database & storage`. Not questions, not
  marketing.
- Bullet lists for requirements and enumerations; prose with an inline
  `METHOD /path` for procedures. Reserve numbered steps for a strict sequence.
- Tables only when columns genuinely help.

## Guide docs (MDX)

- Frontmatter is `title` plus `description`, where `description` is an imperative
  one-liner naming the whole task:
  ```mdx
  ---
  title: "Creating Quotes"
  description: "Queue an async quote, poll until it's ready, and download the resulting g-code"
  ---
  ```
- Open with one paragraph that says what the resource is and the one thing that
  shapes the workflow (for quotes: "slicing takes time, so the API is async").
- **Prerequisites** as a bullet list of the exact IDs/tokens needed, each linking
  to where you get it.
- One `##` section per step, titled by the step ("Queue a quote", "Poll until
  ready", "What you get back", "Download the g-code", "Clean up").
- Examples go in `<CodeTabs>` with **both** a Python and a TypeScript tab. Every
  example is complete and copy-pasteable and includes error handling
  (`response.raise_for_status()`, `if (!response.ok) throw new Error(...)`).
- Response fields documented as a bullet list, each `**\`field.path\`**` followed
  by the type and what it is. Call out reporting-only fields and when a field is
  `null`.
- `:::note` callouts for two cases only: optional "you can also pass X" detail,
  and genuinely surprising behavior ("this check is computed client-side, it
  isn't a field on the response").
- Warn before destructive or irreversible actions.

## Internal docs and docstrings

- **Module docstring**: one line on what the module selects/owns, then a short
  list or paragraph on the mechanism and the one constraint that matters.
  - > Selects where quote/slice work runs: Modal (default) or in-process (local). The quote endpoints call this module instead of importing `modal_core` directly.
- **Function docstring**: first line is an imperative summary ("Mark a delivery as
  delivered and drop it out of the retry queue."). Follow with why / caveats only
  if non-obvious. Document the return shape when it is a dict or a tuple.
- Inline comments explain the reason a line exists, not what it does. A comment
  earns its place by preventing a wrong "fix":
  - > # required by slowapi even if unused
  - > # Must be `||`, not `??`: output_file_* was added with DEFAULT 0, so legacy rows hold 0 rather than NULL…
- In `CLAUDE.md` / architecture sections: describe the request flow, the layering,
  and the sharp edges (shared prod/dev DB, synchronous client, decorator order,
  import ordering). Every subsystem section ends by naming its constants file and
  its "do not do X" rule.

## Before you ship

- First sentence defines the subject.
- No em dashes. No "simply" / "just" / hype words. No emoji.
- Every identifier, path, and env var is in backticks.
- Every claim about behavior points at the file that owns it.
- Numbers and defaults are concrete, with units.
- Hazards are stated as imperatives, before the explanation.
- MDX: `title` + imperative `description`; Python and TypeScript tabs; examples
  handle errors; destructive steps carry a warning.

## Worked example (guide prose)

Weak:
> This endpoint is a really convenient way to kick off the quoting process. You'll
> get back an ID which can then be used later on. Quoting might take a little while
> because there's a lot going on under the hood.

House style:
> `POST /v1/quote/fdm/{file_id}` accepts a JSON body with at minimum `printer_id`
> and `filament_id`. Everything else (`slicer_model`, `pricing_config`,
> `print_settings`) is optional and falls back to sensible defaults. The response
> is `202 Accepted` with a `quote_id` you'll poll on.

## Worked example (architecture note)

Weak:
> We use an outbox pattern for webhooks. This makes delivery more reliable. There's
> also a retry mechanism with backoff.

House style:
> `webhook_deliveries` is a durable outbox, not just a log: the row, not the Modal
> queue, is the source of truth for "this event still owes a POST". Each row
> carries `status`, `attempt_count`, `next_attempt_at`, `locked_at`,
> `delivered_at`. Retry ladder is `ORDER_WEBHOOK_RETRY_SCHEDULE_SECONDS` in
> `constants.py` (1m -> 5m -> 30m -> 2h, 5 attempts over ~2.6h). 5xx, 408/425/429,
> and network errors retry; other 4xx are terminal immediately. Do **not** add
> Modal `retries=`: the ladder lives in the outbox so it survives crashes and
> multi-hour waits.
