<div align="center">
  <img src="{{ assets }}/hero.svg?v={{ v }}" alt="{{ name }} — {{ role }}" width="100%">
</div>

<div align="center">

{{ contact }}

</div>

{{ intro }}

## Now

{{ now }}

<sub>{{ education }} · {{ spokenLanguages }}</sub>

## What I get hired for

{{ services }}

## Selected work

{{ projects }}

### Where I have done it

{{ experience }}

## Impact, in numbers

<img src="{{ assets }}/impact.svg?v={{ v }}" alt="Six impact numbers: 95% faster route calculation, 40% less time on the road, 25% fewer operational errors, 20% fewer inventory gaps, 8+ clients delivered, zero security incidents" width="100%">

## `gitfetch --profile`

<img src="{{ assets }}/terminal.svg?v={{ v }}" alt="Terminal-style summary of {{ name }}'s GitHub profile" width="100%">

<sub>The language ribbon reflects my <b>public</b> repositories only — most production work (Cappy, Calei, client systems) lives in private repos, so treat it as a sample, not as a skill profile.</sub>

## What I actually ship with

<img src="{{ assets }}/skills.svg?v={{ v }}" alt="Skills grouped by domain: frontend and mobile, backend and APIs, data and infra, AI engineering" width="100%">

<sub>Bars are honest: <b>daily / production</b> means I work in it most weeks, <b>shipped with</b> means it is in something real that users touch, <b>working knowledge</b> means I can be productive in it but would not call myself an expert.</sub>

## Contributions

<img src="{{ assets }}/snake.svg?v={{ v }}" alt="Snake eating my GitHub contribution graph" width="100%">

## How I work

- **End-to-end ownership.** Cappy is mine from the PostGIS query to the App Store listing; Calei went from a Kotlin prototype to a multi-tenant SaaS with a paying client in production.
- **Performance is a feature.** A C++20 routing engine cut average route calculation by 95% — the kind of number a customer feels on a Monday morning.
- **AI with a scoreboard.** I use LLMs daily, in products and in my own workflow, and I keep them honest with evaluation sets and tests instead of vibes.
- **I ship where the users are.** Web, native Android, cross-platform mobile, self-hosted VPS, and three clouds — whatever the problem actually needs.

<details>
<summary><b>How this README builds itself</b></summary>

<br/>

This profile has no third-party widget services in it. The public instances of the popular stats
generators are rate limited, and the upstream project itself now points people at generating
**static SVGs inside their own repository** instead. So everything here is generated and committed
by this repo:

```
profile/
  README.template.md    prose + {{ … }} placeholders
  data/profile.json     identity, the typing lines, what I am doing now
  data/skills.json      every skill, grouped, with an honest tier
  data/projects.json    featured work and the impact numbers
  data/stats.json       cached GitHub numbers (refreshed by CI)
scripts/
  gen-hero.mjs          the animated header (SMIL, no runtime deps)
  gen-skills.mjs        the skills bento grid
  gen-terminal.mjs      the gitfetch-style card
  gen-stats.mjs         GitHub GraphQL -> data/stats.json
  build-readme.mjs      template + data -> README.md
```

A scheduled GitHub Action re-runs the pipeline, and the cache-busting token is a **hash of the
generated content** rather than a timestamp — so a build that finds nothing new produces no diff
and no commit. Edit the JSON, and the SVGs and the prose move together.

```bash
node scripts/gen-stats.mjs   # needs GITHUB_TOKEN; falls back to the cache
node scripts/gen-hero.mjs && node scripts/gen-skills.mjs && node scripts/gen-terminal.mjs
node scripts/build-readme.mjs
```

The `stack/` folder is a small app I wrote to track my own learning — it is the ancestor of the
skills card above. {{ pagesLink }}

</details>

<div align="center">
<sub>Generated from <code>profile/data</code> · last GitHub sync {{ stamp }} · build <code>{{ v }}</code></sub>
</div>
