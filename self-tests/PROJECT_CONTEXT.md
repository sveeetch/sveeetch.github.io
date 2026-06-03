# Self-Tests App Project Context

This document is written for another AI/Codex agent that needs to continue development safely in the current self-contained workspace at `/Users/ds/codex/projects/self-test`.

## 1. Project Overview

- The `/self-tests` app is a lightweight static self-tests web app.
- It lives in the current workspace under:
  - `/self-tests`
- Public production URL:
  - `https://sveeetch.github.io/self-tests/`
- The app is deployable as a static site. The original source was copied from the `sveeetch/sveeetch.github.io` repository, but runtime must not depend on that old checkout.
- Treat it as a static GitHub Pages app:
  - no traditional backend server;
  - no bundler for `/self-tests`;
  - no framework-specific build step;
  - all current app logic is inside `/self-tests/index.html`.
- The app uses browser APIs such as `localStorage`, clipboard, generated downloads, and optionally Supabase REST API for online result saving.
- Work inside `/self-tests` unless a root-level cloud/static hosting setting must be added later.

## 2. Repository Structure

Current important files in `/self-tests`:

### `/self-tests/index.html`

Main static application file.

Contains:
- HTML markup for the app shell;
- CSS styles;
- test registry and question data;
- scoring functions;
- result rendering;
- respondent selector state and validation;
- local history logic;
- copy/export/download logic;
- optional Supabase online save config and helper functions.

Edit this file when:
- adding a new questionnaire;
- changing scoring/report rendering;
- changing copy/export/history behavior;
- changing respondent handling;
- configuring Supabase URL/anon key.

Do not:
- rewrite the whole app;
- introduce a framework or build pipeline without explicit request;
- remove localStorage fallback;
- break existing tests, copy result, download JSON, or history.

### `/self-tests/dosha.test.mjs`

Node regression test file using `node:test`, `assert`, and `vm` to load the script from `index.html` with a minimal browser stub.

Tests currently cover:
- dosha questionnaire registration;
- dosha scoring/export payload;
- respondent presets (`Дима`, `Даша`);
- custom respondent validation;
- missing respondent blocking export readiness;
- Supabase row mapping;
- missing Supabase config behavior;
- failed fetch behavior;
- old local history items without respondent.

Run with:

```bash
node --test self-tests/dosha.test.mjs
```

### `/self-tests/supabase-test-results.sql`

Migration/setup SQL for the existing Supabase project.

Contains:
- `public.test_results` table creation;
- migration-safe `alter table ... add column if not exists` statements;
- indexes;
- RLS enabled;
- anonymous insert-only policy.

Edit this file when:
- adding online-save columns;
- changing table/index/policy setup;
- adapting to an existing Supabase schema.

Do not:
- add anonymous SELECT policies unless explicitly requested;
- require service role access for frontend inserts.

### `/self-tests/ONLINE_RESULTS_SETUP.md`

Setup instructions for configuring online result saving in the existing Supabase project.

Contains:
- SQL editor steps;
- where to paste Project URL and public anon key;
- security warning about never using `service_role` in frontend code;
- local fallback behavior.

Edit this file when setup steps or Supabase config requirements change.

### `/self-tests/PROJECT_CONTEXT.md`

This file. It is a handoff/context document for future agents.

Update it when major app architecture, deployment, tests, persistence, or questionnaire behavior changes.

## 3. Current App Functionality

The app currently works as a static, tabbed self-tests interface.

### Main UI

- Header: `Тесты личности`.
- Tabs are generated from the `tests` object in `index.html`.
- Each tab selects a test and renders its question list.
- Questions use a 0-4 radio scale.
- Main actions:
  - `Посчитать результат`;
  - `Заполнить демо`;
  - `Очистить ответы`.

### Result Screen

After all questions are answered and the user clicks calculate:
- result summary tiles render;
- optional map renders for temperament only;
- result bars render;
- report blocks render;
- result payload is built into the global `latest` variable;
- respondent selector is shown in the result/export area;
- export/copy/download are blocked until respondent is selected.

### Respondent Selector

Implemented.

Location:
- in the result area near export/copy buttons.

Options:
- `Дима` -> `{ preset: "dima", name: "Дима" }`
- `Даша` -> `{ preset: "dasha", name: "Даша" }`
- `Другое` -> shows custom text input.

Validation:
- respondent is required before export/copy/download/final save;
- custom name is trimmed;
- custom name max length is 64 characters;
- empty custom name is invalid;
- missing respondent shows inline message, not `alert()`.

Important behavior:
- result can still render before respondent selection;
- export/copy/download are blocked until respondent is valid;
- once respondent is valid, payload is enriched with `respondent` and saved locally;
- online save is attempted only if Supabase config is valid.

### Local History

Implemented.

- Stored in browser `localStorage`.
- Key: `selfTestsAppResultsV4`.
- `save(d)` stores newest result first and keeps up to 30 items.
- Current `save(d)` de-duplicates by `id` to avoid duplicate entries from repeated export/copy clicks.
- History UI renders up to 8 latest items.
- History labels include respondent name when present.
- Old entries without respondent render as `Без имени`.

### Copy / Export / Download

Implemented.

- `Copy result` uses `copyPayload()`.
- `Показать экспорт` shows textarea with export payload.
- `Скачать JSON` downloads `latest` as JSON.
- `Скачать всё` downloads all local history.

Current copy payload starts with:

```txt
Here is my self-test result. Please analyze it as a self-reflection result, not as a medical diagnosis.
Respondent: <name>
```

Then it includes formatted JSON.

If respondent is missing, copy/export/download are blocked with:

```txt
Выберите, кто проходил тест, чтобы сохранить или скопировать результат.
```

### Online Save Status UI

Implemented.

Status messages include:
- choose respondent message before save/export;
- `Saved locally. Online sync pending...`;
- `Saved online`;
- `Saved locally. Online sync disabled`;
- `Saved locally. Online sync failed.`

If Supabase config is missing or invalid, the app continues local-only.

## 4. Existing Tests

### `/self-tests/dosha.test.mjs`

Command:

```bash
node --test self-tests/dosha.test.mjs
```

Coverage:
- dosha test exists with id `dosha` and 30 questions;
- dosha Vata/Pitta/Kapha scoring works;
- export payload includes respondent presets;
- custom respondent requires non-empty trimmed name and caps at 64 chars;
- missing respondent blocks export readiness;
- Supabase row mapper creates correct row shape;
- missing Supabase config returns disabled normalized status;
- failed fetch returns failed normalized status without throwing;
- old local history items without respondent do not break rendering.

### Root `npm test`

The root `package.json` currently contains only a placeholder test command:

```bash
npm test
```

It exits with:

```txt
Error: no test specified
```

Do not treat this as a meaningful app test failure. The meaningful automated test for `/self-tests` is currently the Node test above.

### Before Commit Checklist

1. Run:

```bash
node --test self-tests/dosha.test.mjs
```

2. Inspect git status:

```bash
git status --short
```

3. Ensure `.DS_Store` is not staged.
4. Stage only relevant `/self-tests` files.
5. If deployment is requested, push only after tests pass.
6. Manually QA the local or production URL.

## 5. Existing Test Types / Questionnaires

All test configs live in the `tests` object in `/self-tests/index.html`.

### 5.1 Parent / Adult / Child

- Internal key: `pac`
- Public test id: `pac`
- Title: `Родитель — Взрослый — Ребёнок`
- Tab: `Родитель / Взрослый / Ребёнок`
- Purpose: self-reflection profile based on Parent, Adult, Child ego-state style categories.
- Question format: 0-4 scale.
- Scales:
  - `cp` - critical/demanding parent;
  - `np` - nurturing parent;
  - `adult` - adult/rational mode;
  - `fc` - free child;
  - `ac` - adapted child.
- Scoring:
  - raw scores are summed per scale;
  - Parent = `cp + np`, max 64;
  - Adult = `adult`, max 32;
  - Child = `fc + ac`, max 64;
  - each group has intensity percent and balance percent.
- Result profile logic:
  - strongest group by balance percent is displayed as main mode;
  - report compares adult balance, parent subscales, and child subscales.
- Export payload includes `rawScores`, `totalRaw`, `groups`, answers, report, and respondent once selected.

### 5.2 Temperament

- Internal key: `temp`
- Public test id: `temp`
- Title: `Тест на тип темперамента`
- Tab: `Темперамент`
- Purpose: adapted self-report for extraversion/introversion and neuroticism/stability.
- Question format: 0-4 scale with some reverse-scored questions.
- Scales:
  - `e` - extraversion, with reverse items for introversion;
  - `n` - neuroticism/emotional reactivity, with reverse items for stability;
  - `l` - idealization/social desirability.
- Scoring:
  - reverse questions use `4 - v`;
  - extraversion percent from `r.e / 64`;
  - neuroticism percent from `r.n / 64`;
  - idealization percent from `r.l / 32`.
- Result profile logic:
  - `Сангвиник`: extraversion >= 55 and neuroticism < 55;
  - `Холерик`: extraversion >= 55 and neuroticism >= 55;
  - `Флегматик`: extraversion < 55 and neuroticism < 55;
  - `Меланхолик`: extraversion < 55 and neuroticism >= 55;
  - clarity is distance from center.
- Extra UI:
  - temperament map with quadrant dot.
- Export payload includes percentages, temperament, clarity, idealization note, answers, report, and respondent once selected.

### 5.3 Dosha Type Test

- Internal key: `dosha`
- Public test id: `dosha`
- Title: `Тест на определение типа дош`
- Tab: `Доши`
- Purpose: self-reflection profile for Vata / Pitta / Kapha tendencies.
- Question format: 30 questions, 0-4 scale.
- Scales:
  - `vata` - 10 questions;
  - `pitta` - 10 questions;
  - `kapha` - 10 questions.
- Scoring:
  - raw score per dosha is summed;
  - each dosha max is 40;
  - percent = `score / 40 * 100` rounded.
- Profile detection:
  - doshas are sorted by percent;
  - `dominantDosha` is highest;
  - `secondaryDosha` is second highest;
  - if gap between first and second is <= 10, profile is mixed: `<dominant> / <secondary>`;
  - otherwise profile is dominant only.
- Result bars/report:
  - bars render all three doshas sorted by percent;
  - summary tiles show profile, dominant dosha, and second dosha;
  - report blocks explain Vata, Pitta, Kapha, and how to read the profile.
- Disclaimer:
  - hint states the test is an orientation for self-reflection, not a medical conclusion;
  - copy payload asks analysis as self-reflection, not medical diagnosis.
- Copy/export/history:
  - requires respondent selection;
  - respondent is included in JSON and visible history label;
  - online mapper uses result profile for Supabase `profile` field.

### 5.4 Coping Strategies

- Internal key: `coping`
- Public test id: `coping`
- Title: `Стратегии совладающего поведения`
- Tab: `Стратегии поведения`
- Purpose: self-reflection around stress/coping behavior.
- Question format: 0-4 scale.
- Scales:
  - `active`, `planning`, `selfControl`, `distancing`, `emoSupport`, `practicalSupport`, `responsibility`, `positive`, `avoidance`, `distraction`, `venting`, `acceptance`, `selfBlame`, `denial`.
- Scoring:
  - each strategy has 2 questions;
  - max per strategy is 8;
  - percent = `score / 8 * 100`.
- Grouping:
  - problem solving group averages active/planning/practical support;
  - emotion group averages emotional support/positive/acceptance/venting;
  - control group averages self-control/distancing/responsibility;
  - avoid group averages avoidance/distraction/denial/self-blame.
- Result profile logic:
  - top 3 strategies are displayed;
  - report describes strongest strategies, strengths, risks, relationships, work, and what to try.
- Export payload includes raw scores, sorted strategies, top strategies, groups, answers, report, and respondent once selected.

### 5.5 Life Location Fit

- Internal key: `location`
- Public test id: `life-location-fit`
- Title: `Где нам лучше жить? / Life Location Fit Test`
- Tab: `Где жить?`
- Purpose: compare life-location priorities, including couple/family planning concerns.
- Question format: 0-4 scale.
- Categories:
  - lifestyle, climate, money, work, safety, healthcare, kids, social, culture, leisure, infrastructure, ecology, legal, travel, emotional.
- Some questions have `dealBreaker: true` metadata.
- Scoring:
  - category scores are summed and converted to percent;
  - top priorities are top category percentages;
  - deal-breakers activate when deal-breaker question answer is >= 3.
- Profile logic:
  - computes weighted profile scores for named location lifestyle profiles, such as `Calm Family Base`, `Dynamic European City Life`, `Nature & Freedom Lifestyle`, etc.;
  - highest profile becomes `lifestyleProfile`;
  - recommended location types are derived from category thresholds.
- Result payload includes extra top-level convenience fields for category scores, top priorities, deal-breakers, lifestyle profile, summary, recommended location types, couple conflicts, and reflection questions.

## 6. Result Payload Structure

The current payload is built in `render(res, a)` and stored in global `latest`.

Typical structure:

```js
{
  id: `${active}-${Date.now()}`,
  testId: publicTestId(),
  testName: tests[active].title,
  createdAt: new Date().toISOString(),
  scale: {
    min: 0,
    max: 4,
    description: "0 = совсем не про меня, 4 = очень про меня"
  },
  answers: [
    {
      questionNumber: 1,
      question: "...",
      scale: "...",
      category: "...",      // only when the test defines categories
      reverse: false,
      dealBreaker: false,
      answer: 0
    }
  ],
  result: { /* test-specific calculated result */ },
  report: [
    { title: "...", text: "..." }
  ],
  respondent: {
    preset: "dima" | "dasha" | "other",
    name: "Дима"
  },
  savedLocallyAt: "...",
  onlineSaveAttemptedFor: "preset:name",
  onlineSaveStatus: "disabled" | "saved" | "failed"
}
```

Notes:
- `respondent`, `savedLocallyAt`, `onlineSaveAttemptedFor`, and `onlineSaveStatus` are added after a valid respondent is selected/finalized.
- Location results also add top-level fields such as `categoryScores`, `topPriorities`, `dealBreakers`, `lifestyleProfile`, `summary`, `recommendedLocationTypes`, `potentialCoupleConflicts`, and `questionsForReflection`.
- Do not remove existing fields casually; older exports/history may depend on them.

## 7. Local Storage / History

- Local storage key: `selfTestsAppResultsV4`.
- History is read by `hist()` and written by `save(d)`.
- Current storage shape is an array of result payloads.
- Newest items are first.
- Maximum stored items: 30.
- History UI displays up to 8 items.
- Saved history item label currently uses:
  - respondent name or `Без имени`;
  - test name;
  - compact result profile;
  - date/time.
- Older localStorage entries may not contain `respondent` or newer online-save fields.

Important instruction:

```txt
Never break old localStorage history. If adding new fields, render older entries safely.
```

When adding fields:
- use optional chaining and fallbacks;
- keep older entries downloadable;
- avoid assuming `result` always has a specific shape;
- avoid migrating/destructively rewriting localStorage unless explicitly requested.

## 8. Online Saving / Supabase

Online saving is implemented as an optional static frontend feature.

### Config Location

In `/self-tests/index.html`:

```js
const ONLINE_RESULTS_CONFIG = {
  enabled: true,
  provider: "supabase",
  supabaseUrl: "",
  supabaseAnonKey: "",
  tableName: "test_results",
};
```

Current state:
- `supabaseUrl` is empty;
- `supabaseAnonKey` is empty;
- therefore online sync is automatically disabled;
- local history continues to work.

### How It Works

- `finalizeLatest()` enriches `latest` with respondent info and saves locally.
- If config is valid, `saveResultOnline(latest)` posts to Supabase REST API.
- It does not block result rendering.
- It returns normalized status:

```js
{
  enabled: boolean,
  success: boolean,
  status: "disabled" | "saved" | "failed",
  error?: string
}
```

### Supabase REST Endpoint

```txt
POST {SUPABASE_URL}/rest/v1/test_results
```

Headers:

```js
{
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal"
}
```

### Supabase Row Shape

Built by `toSupabaseRow(payload)`:

```js
{
  respondent_name: payload.respondent.name,
  respondent_preset: payload.respondent.preset,
  test_id: payload.testId || payload.test_id || null,
  test_name: payload.testName || null,
  result_type: payload.result?.type || payload.type || null,
  profile: resultProfile(payload),
  summary: payload.result?.summary || payload.summary || null,
  raw_payload: payload,
  user_agent: navigator.userAgent || null,
  page_url: window.location.href || null,
  app_version: APP_VERSION,
  source: "self-tests"
}
```

### SQL Setup File

Path:

```txt
/self-tests/supabase-test-results.sql
```

It includes:
- `create table if not exists public.test_results`;
- migration-safe respondent columns;
- `raw_payload jsonb`;
- indexes on created_at, test_id, result_type, respondent_name;
- RLS enabled;
- policy: anonymous inserts only.

### Security Notes

```txt
Never put Supabase service_role key into frontend code. Use only the public anon key.
```

Also:
- do not collect email, phone, cookies, login, or analytics unless explicitly requested;
- do not manually collect IP;
- do not enable anonymous SELECT unless explicitly requested;
- if permissions fail with 401/403, show failed sync status and keep local save.

## 9. Respondent / Person Selector

Implemented.

Presets:
- `Дима` -> `preset: "dima"`, `name: "Дима"`
- `Даша` -> `preset: "dasha"`, `name: "Даша"`
- `Другое` -> `preset: "other"`, custom name from input.

Behavior:
- selector is shown in the result area;
- choosing `Другое` displays text input with placeholder `Введите имя`;
- name is trimmed and capped at 64 chars;
- missing respondent blocks copy/export/download/online save;
- inline validation is used, no alert.

Respondent appears in:
- `latest.respondent`;
- local history item;
- history UI label;
- copy result text;
- export textarea;
- downloaded JSON;
- Supabase row fields `respondent_name` and `respondent_preset`;
- Supabase `raw_payload.respondent`.

## 10. Deployment / Publishing

Deployment model:
- Current working copy: `/Users/ds/codex/projects/self-test/self-tests`.
- This workspace is currently not a git repository.
- The app can be hosted by any static site host from the `/self-tests` folder.
- Original GitHub Pages site repository: `sveeetch/sveeetch.github.io`.
- Production URL: `https://sveeetch.github.io/self-tests/`.
- There is no required root `package.json`, bundler, or build command for this app.
- If publishing back to GitHub Pages later, confirm the target repository and active Pages branch before pushing.

Deployment checklist:

```txt
1. Run tests.
2. Check git status if the workspace has been initialized as a git repository.
3. Do not commit `.DS_Store`.
4. Commit relevant files only.
5. Push to production branch.
6. Open production URL.
7. Manually complete one test.
8. Verify result/copy/export/history.
```

Recommended commands:

```bash
node --test self-tests/dosha.test.mjs
git status --short
git diff -- self-tests/index.html self-tests/dosha.test.mjs self-tests/*.md self-tests/*.sql
```

If publishing back to a git-backed static host:

```bash
git add self-tests/index.html self-tests/dosha.test.mjs self-tests/ONLINE_RESULTS_SETUP.md self-tests/supabase-test-results.sql self-tests/PROJECT_CONTEXT.md
git commit -m "..."
git push origin master
```

Only include `PROJECT_CONTEXT.md` in a commit if the user wants this handoff document committed.

## 11. Common Future Tasks

### Adding a New Test

1. Add a new entry in the `tests` object.
2. Reuse the existing tab/question UI.
3. Define question array with scale key per question.
4. Add a scoring function, e.g. `calcNewTest(a)`.
5. Add routing in `calculateActive(a)`.
6. Add result/report logic in `blocks(res)`.
7. Add rendering branch in `render(res, a)` if generic rendering is not enough.
8. Ensure payload includes answers, result, report, respondent.
9. Ensure local history label can summarize the result.
10. Add or update regression tests.

Do not create new components or a framework unless the existing single-file architecture can no longer reasonably support the task.

### Updating Scoring Logic

- Add a regression test before changing logic.
- Preserve existing payload fields when possible.
- If renaming fields, support old localStorage/history entries safely.
- Update report rendering and history label logic if result profile shape changes.
- For wellness/health-adjacent tests, keep disclaimers as self-reflection, not diagnosis.

### Adding Online Saving Fields

1. Add fields to `latest` payload or result object.
2. Update `toSupabaseRow(payload)` if they should be top-level DB columns.
3. Keep `raw_payload` as full payload.
4. Update `/self-tests/supabase-test-results.sql` with migration-safe `add column if not exists`.
5. Update `/self-tests/ONLINE_RESULTS_SETUP.md` if setup changes.
6. Add tests for mapper and missing-field fallback.
7. Keep old local history safe.

### Publishing to Production

- Run `node --test self-tests/dosha.test.mjs`.
- Inspect `git status --short`.
- Do not stage `.DS_Store`.
- Commit only relevant `/self-tests` files.
- Push to the active GitHub Pages branch.
- Check production URL.
- If GitHub Pages cache lags, test a cache-busted URL like:
  - `https://sveeetch.github.io/self-tests/?v=<commit>`

## 12. Coding Rules / Project Conventions

- Keep the app lightweight and static.
- Avoid frameworks unless explicitly requested.
- Avoid adding a build step unless truly necessary.
- Reuse current styles, cards, tabs, buttons, bars, and result patterns.
- Keep UI copy mostly Russian because the app UI is Russian.
- Code comments should be in English.
- Do not modify unrelated root website files.
- Do not introduce backend server code; GitHub Pages is static.
- Use Supabase REST API directly with `fetch` for online save.
- Do not add medical claims. These tests are self-reflection tools.
- For health/wellness-related tests, include a disclaimer that results are not diagnosis or medical advice.
- Keep export/copy/download/history behavior working for every test.
- Prefer adding tests around behavior before changing shared save/export code.

## 13. Important Warnings

```txt
- Do not rewrite the whole app.
- Do not create a new design system.
- Do not remove existing local history.
- Do not break Copy result / Download JSON / Show export.
- Do not commit `.DS_Store`.
- Do not expose private keys.
- Do not use Supabase service_role key in frontend.
- Do not enable anonymous SELECT policies unless explicitly requested.
- Do not modify files outside `/self-tests` unless absolutely necessary.
```

Additional warning:
- The root repo currently has a dirty `.DS_Store` entry. Treat it as unrelated unless the user explicitly asks to clean it.

## 14. Current Known State at Time of Context Generation

Date of context generation: 2026-06-03.

Current available tests in the app:
- `pac` - `Родитель — Взрослый — Ребёнок`
- `temp` - `Тест на тип темперамента`
- `dosha` - `Тест на определение типа дош`
- `coping` - `Стратегии совладающего поведения`
- `life-location-fit` - `Где нам лучше жить? / Life Location Fit Test`

Recent changes currently present in the working tree:
- dosha test exists and was previously published in commit `c2eb5e9` (`Add dosha type self-test`);
- respondent selector and online-save functionality have been implemented locally in `/self-tests/index.html`;
- `/self-tests/dosha.test.mjs` has been expanded with respondent/export/Supabase regression tests;
- `/self-tests/supabase-test-results.sql` and `/self-tests/ONLINE_RESULTS_SETUP.md` exist locally;
- this context file is newly created locally.

Current git status observed before creating this file:
- `.DS_Store` modified (unrelated; do not commit);
- `/self-tests/index.html` modified;
- `/self-tests/dosha.test.mjs` modified;
- `/self-tests/ONLINE_RESULTS_SETUP.md` untracked;
- `/self-tests/supabase-test-results.sql` untracked.

Tests observed passing:

```bash
node --test self-tests/dosha.test.mjs
```

Result:
- 11 tests passed in `/Users/ds/codex/projects/self-test`.

Known non-useful test command:

```bash
npm test
```

Result:
- root placeholder only: `Error: no test specified`.

Manual configuration still needed:
- run `/self-tests/supabase-test-results.sql` in the existing Supabase project;
- paste existing Supabase Project URL and public anon key into `ONLINE_RESULTS_CONFIG` in `/self-tests/index.html`;
- never use service_role key in frontend.

Production deployment state:
- dosha-only feature was previously pushed to production branch;
- respondent/Supabase online-save changes are local at the time this context was generated unless a later agent/user commits and pushes them;
- do not publish unless the user explicitly asks.

Manual QA still recommended after any deployment:
1. Open `https://sveeetch.github.io/self-tests/`.
2. Confirm all tabs render.
3. Complete one dosha test.
4. Verify respondent selector blocks export until selected.
5. Verify `Дима`, `Даша`, and `Другое` flows.
6. Verify result bars and report blocks.
7. Verify copy result includes respondent and JSON.
8. Verify download JSON includes respondent.
9. Verify show export includes respondent.
10. Verify local history shows respondent.
11. If Supabase is configured, verify one row appears in `test_results`.
