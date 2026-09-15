/**
 * Renders README.md from profile/README.template.md.
 *
 * The template holds the prose; every list, card and number comes from
 * profile/data/*.json so the README and the generated SVGs can never drift
 * apart. Tokens look like {{ name }} and resolve against the map below.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { theme, paletteId } from './lib/theme.mjs';

const base = new URL('../profile/data/', import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, base), 'utf8'));

const profile = read('profile.json');
const projects = read('projects.json');
const stats = read('stats.json');

const chip = (s) => '`' + s + '`';
const num = (n) => (n === null || n === undefined ? '—' : n.toLocaleString('en-US'));

/* Featured work, one section per project.
 *
 * This used to be a two-column HTML table, and on a phone GitHub gave each
 * column half of a narrow screen: the prose shredded into one word per line
 * and the right column fell off the edge. Markdown that simply stacks reads
 * correctly at every width. */
function projectSections() {
  return projects.featured
    .map((p) => {
      const source = p.repo ? ` · [source](${p.repo})` : '';
      return [
        `### [${p.name}](${p.url})${source}`,
        `<sub>**${p.role}** · ${p.period}</sub>`,
        '',
        p.summary,
        '',
        ...p.highlights.map((h) => `- ${h}`),
        '',
        p.stack.map(chip).join(' '),
      ].join('\n');
    })
    .join('\n\n');
}

/* The three things I am actually hired for, straight from abrilcodes.com.
 * Stacked for the same reason as the project cards. */
function serviceSections() {
  return projects.services
    .map((svc) =>
      [`### ${svc.title}`, '', svc.summary, '', ...svc.points.map((pt) => `- ${pt}`)].join('\n')
    )
    .join('\n\n');
}

function experienceList() {
  return projects.experience
    .map((e) => {
      const org = e.url ? `[${e.org}](${e.url})` : e.org;
      return `- **${org}** — ${e.role} · <sub>${e.period}</sub><br/>${e.note}`;
    })
    .join('\n');
}

const badge = (label, color, logo, href) =>
  `[![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white)](${href})`;

const contact = [
  badge('abrilcodes.com', theme.primary.replace('#', ''), 'firefox', profile.links.website),
  badge('LinkedIn', '0A66C2', 'linkedin', profile.links.linkedin),
  badge('GitHub', '181717', 'github', profile.links.github),
  badge('Email', 'EA4335', 'gmail', `mailto:${profile.links.email}`),
].join('&nbsp;');

// Cache-bust on *content*, not on wall-clock time: a scheduled build that
// finds nothing new must leave README.md byte-identical so it never commits.
const fingerprint = createHash('sha256');
// snake.svg is committed by a different workflow, but it belongs in the
// fingerprint too: the cache-busting token is what makes camo re-fetch it.
for (const f of ['../assets/hero.svg', '../assets/skills.svg', '../assets/terminal.svg', '../assets/impact.svg', '../assets/snake.svg']) {
  try {
    fingerprint.update(readFileSync(new URL(f, import.meta.url)));
  } catch {
    fingerprint.update('missing');
  }
}
fingerprint.update(JSON.stringify({ profile, projects, paletteId, ...stats, generatedAt: null }));
const cacheBust = fingerprint.digest('hex').slice(0, 8);
const stamp = stats.generatedAt ? stats.generatedAt.slice(0, 10) : 'pending first sync';

/* Images must be referenced by their ABSOLUTE raw.githubusercontent.com URL,
 * never by a relative path.
 *
 * GitHub treats the two completely differently. An external URL is rewritten
 * to camo.githubusercontent.com, which is in the page's img-src allowlist and
 * serves a clean image. A relative path is rewritten to
 * /OWNER/REPO/raw/BRANCH/... instead, which 302s straight to
 * raw.githubusercontent.com with `Content-Security-Policy: ... sandbox` — and
 * the browser renders nothing. Every image in this README broke that way,
 * including the snake, which this repo does not even generate. It is also why
 * every stats and snake project documents an absolute raw URL. */
const BRANCH = process.env.PROFILE_BRANCH || 'main';
const assetBase = `https://raw.githubusercontent.com/${profile.handle}/${profile.handle}/${BRANCH}/assets`;

const tokens = {
  name: profile.name,
  handle: profile.handle,
  role: profile.role,
  tagline: profile.tagline,
  now: profile.now.map((n) => `- ${n}`).join('\n'),
  projects: projectSections(),
  // Generated from the data so the alt text can never drift from the card,
  // which is exactly how a stale claim survived a correction once already.
  impactAlt: projects.impact.map((i) => `${i.value} ${i.label}`).join(', '),
  services: serviceSections(),
  experience: experienceList(),
  intro: profile.intro,
  contact,
  education: `${profile.education.degree} — ${profile.education.school} · ${profile.education.period} · GPA ${profile.education.gpa}`,
  spokenLanguages: profile.languages.map((l) => `**${l.name}** (${l.level})`).join(' · '),
  stars: num(stats.stars),
  repos: num(stats.publicRepos),
  contributions: num(stats.contributionsLastYear),
  v: cacheBust,
  assets: assetBase,
  stamp,
  pagesLink: profile.links.pages
    ? `The stack explorer is live at **[${profile.links.pages}](${profile.links.pages})**.`
    : '',
};

let out = readFileSync(new URL('../profile/README.template.md', import.meta.url), 'utf8');

const unresolved = new Set();
out = out.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
  if (key in tokens) return tokens[key];
  unresolved.add(key);
  return match;
});

if (unresolved.size) {
  console.error(`build-readme: unknown token(s): ${[...unresolved].join(', ')}`);
  process.exit(1);
}

// Collapse the blank lines an empty token can leave behind.
out = out.replace(/\n{3,}/g, '\n\n');

writeFileSync(new URL('../README.md', import.meta.url), out);
console.log(`README.md  ${(out.length / 1024).toFixed(1)} KB  (build ${cacheBust})`);
