<div align="center">
  <img src="assets/hero.svg?v=816f6a6f" alt="David Abril Perrig — Full-Stack Developer" width="100%">
</div>

<div align="center">

[![abrilcodes.com](https://img.shields.io/badge/abrilcodes.com-6c469f?style=for-the-badge&logo=firefox&logoColor=white)](https://abrilcodes.com)&nbsp;[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/david-abril-perrig)&nbsp;[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DavidAbril411)&nbsp;[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:davidabril411@gmail.com)

</div>

## Now

- Finishing **B.S. Computer Engineering** at UBP — graduating **Dec 2026**, GPA 8.75/10
- Building **Cappy** solo and taking it to the App Store & Google Play
- Scaling **Calei** into a multi-tenant SaaS, already in production with a paying client
- Open to **remote roles across the EU** — relocating to Spain in **July 2027**

<sub>B.S. Computer Engineering — Universidad Blas Pascal (UBP) · Mar 2022 – Dec 2026 · GPA 8.75 / 10 · **Spanish** (Native) · **English** (B2 — professional working)</sub>

## Selected work

<table>
<tr>
<td width="50%" valign="top">

### [Cappy](https://github.com/DavidAbril411/Capi)
**Founder & Sole Developer** · 2025 – present

Geolocated trades marketplace for LATAM. Users describe a problem in plain language and an LLM layer picks the right trade and the best nearby professionals — measured against a custom eval set of real queries.

- Built solo: mobile app, backend, payments, infra, trademark
- Real-time proximity matching with PostgreSQL + PostGIS
- Launching on the App Store and Google Play

`React Native (Expo)` `Node.js` `Express` `Drizzle` `PostgreSQL` `PostGIS` `Clerk` `MercadoPago` `Mapbox` `Cloudinary`

</td>
<td width="50%" valign="top">

### [Calei](https://calei.com.ar)
**Co-Founder & Technical Lead** · 2025 – present

B2B SaaS for delivery and distribution management, in production powering the daily operations of a distribution company.

- −95% average route-calculation time with a C++20 engine (Vroom + OSRM)
- Native Android app, NestJS API and Next.js dashboard on a self-hosted VPS
- Multi-tenant: JWT tenant id, Postgres Row-Level Security, seeded roles, 50+ features

`Kotlin` `NestJS` `MySQL` `TypeORM` `Next.js` `C++20` `Docker` `nginx`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### [Abril Codes](https://abrilcodes.com)
**Founder & Lead Developer** · Jan 2025 – present

Boutique software studio delivering custom software, cross-platform apps and production AI integrations with a designer and a software engineer/PM.

- Scalable POS architecture on GCP and Azure — −20% inventory discrepancies
- Client-side AI in production: Transformers.js in-browser, TensorFlow Lite on Android

`Java` `Spring Boot` `Next.js` `GCP` `Azure` `Transformers.js` `TensorFlow Lite`

</td>
<td width="50%" valign="top">

### [ApartaMe — Mindfactory](https://apartame.co)
**Software Developer (internship → traineeship)** · Jun 2024 – Jun 2025

Property rental platform. A year of professional full-stack work in an Agile cross-functional team.

- Next.js frontends and secure NestJS REST APIs with strict DTO validation
- AWS S3 hardened with IAM policies; relational modeling and SQL tuning that cut API latency on complex searches

`Next.js` `NestJS` `AWS S3` `IAM` `SQL`

</td>
</tr>
</table>

## Impact, in numbers

<table>
<tr>
<td align="center" width="25%">

### 95%

**faster route calculation**<br/><sub>C++20 · Vroom + OSRM</sub>

</td>
<td align="center" width="25%">

### 8+

**freelance clients delivered**<br/><sub>since Nov 2021</sub>

</td>
<td align="center" width="25%">

### 20%

**fewer inventory gaps**<br/><sub>POS on GCP / Azure</sub>

</td>
<td align="center" width="25%">

### 0

**security incidents**<br/><sub>hardened Linux VPS fleet</sub>

</td>
</tr>
</table>

## `gitfetch --profile`

<img src="assets/terminal.svg?v=816f6a6f" alt="Terminal-style summary of David Abril Perrig's GitHub profile" width="100%">

## What I actually ship with

<img src="assets/skills.svg?v=816f6a6f" alt="Skills grouped by domain: frontend and mobile, backend and APIs, data and infra, AI engineering" width="100%">

<sub>Bars are honest: <b>daily / production</b> means I work in it most weeks, <b>shipped with</b> means it is in something real that users touch, <b>working knowledge</b> means I can be productive in it but would not call myself an expert.</sub>

## Contributions

<img src="assets/snake.svg" alt="Snake eating my GitHub contribution graph" width="100%">

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
skills card above. 

</details>

<div align="center">
<sub>Generated from <code>profile/data</code> · last GitHub sync pending first sync · build <code>816f6a6f</code></sub>
</div>
