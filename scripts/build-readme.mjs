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

/* Featured work as a two-column table — the closest Markdown gets to a bento
 * grid, and unlike an SVG every project title stays a real, clickable link. */
function projectCards() {
  const cell = (p) =>
    [
      `### [${p.name}](${p.url})`,
      `**${p.role}** · ${p.period}`,
      '',
      p.summary,
      '',
      ...p.highlights.map((h) => `- ${h}`),
      '',
      p.stack.map(chip).join(' '),
    ].join('\n');

  const rows = [];
  for (let i = 0; i < projects.featured.length; i += 2) {
    const pair = projects.featured.slice(i, i + 2);
    const cells = pair
      .map((p) => `<td width="50%" valign="top">\n\n${cell(p)}\n\n</td>`)
      .join('\n');
    const filler = pair.length === 1 ? '\n<td width="50%"></td>' : '';
    rows.push(`<tr>\n${cells}${filler}\n</tr>`);
  }
  return `<table>\n${rows.join('\n')}\n</table>`;
}

function impactRow() {
  const cell = (i) =>
    `<td align="center" width="33%">\n\n### ${i.value}\n\n**${i.label}**<br/><sub>${i.detail}</sub>\n\n</td>`;
  const rows = [];
  for (let i = 0; i < projects.impact.length; i += 3) {
    rows.push(`<tr>\n${projects.impact.slice(i, i + 3).map(cell).join('\n')}\n</tr>`);
  }
  return `<table>\n${rows.join('\n')}\n</table>`;
}

/* The three things I am actually hired for, straight from abrilcodes.com. */
function serviceRow() {
  const cells = projects.services
    .map(
      (svc) =>
        `<td width="33%" valign="top">\n\n#### ${svc.glyph} ${svc.title}\n\n${svc.summary}\n\n` +
        svc.points.map((pt) => `- ${pt}`).join('\n') +
        `\n\n</td>`
    )
    .join('\n');
  return `<table>\n<tr>\n${cells}\n</tr>\n</table>`;
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
for (const f of ['../assets/hero.svg', '../assets/skills.svg', '../assets/terminal.svg']) {
  try {
    fingerprint.update(readFileSync(new URL(f, import.meta.url)));
  } catch {
    fingerprint.update('missing');
  }
}
fingerprint.update(JSON.stringify({ profile, projects, paletteId, ...stats, generatedAt: null }));
const cacheBust = fingerprint.digest('hex').slice(0, 8);
const stamp = stats.generatedAt ? stats.generatedAt.slice(0, 10) : 'pending first sync';

const tokens = {
  name: profile.name,
  handle: profile.handle,
  role: profile.role,
  tagline: profile.tagline,
  now: profile.now.map((n) => `- ${n}`).join('\n'),
  projects: projectCards(),
  impact: impactRow(),
  services: serviceRow(),
  experience: experienceList(),
  intro: profile.intro,
  contact,
  education: `${profile.education.degree} — ${profile.education.school} · ${profile.education.period} · GPA ${profile.education.gpa}`,
  spokenLanguages: profile.languages.map((l) => `**${l.name}** (${l.level})`).join(' · '),
  stars: num(stats.stars),
  repos: num(stats.publicRepos),
  contributions: num(stats.contributionsLastYear),
  v: cacheBust,
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
