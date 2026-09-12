import { writeFileSync, readFileSync } from 'node:fs';
import { theme as t, esc, monoWidth, round } from './lib/theme.mjs';

const base = new URL('../profile/data/', import.meta.url);
const profile = JSON.parse(readFileSync(new URL('profile.json', base), 'utf8'));
const stats = JSON.parse(readFileSync(new URL('stats.json', base), 'utf8'));

const W = 1000;
const CHROME = 40;
const PAD = 26;
const LINE_H = 23;
const FS = 13.5;
const LEFT = 210; // width of the prompt-art column

const num = (n) => (n === null || n === undefined ? '—' : n.toLocaleString('en-US'));

const rows = [
  ['Role', profile.role, t.text],
  ['Focus', 'React Native · NestJS · PostgreSQL / PostGIS', t.textSoft],
  ['Building', 'Cappy · Calei · Abril Codes', t.textSoft],
  ['Repos', `${num(stats.publicRepos)} public`, t.textSoft],
  ['Stars', num(stats.stars), t.textSoft],
  ['Commits', `${num(stats.commitsLastYear)} in the last year`, t.textSoft],
  ['Contribs', `${num(stats.contributionsLastYear)} in the last year`, t.textSoft],
  ['Degree', 'B.S. Computer Engineering · Dec 2026 · GPA 8.75/10', t.textSoft],
  ['Location', `${profile.location} · ${profile.passport}`, t.textSoft],
  ['Languages', 'Spanish (native) · English (B2)', t.textSoft],
  ['Status', 'open to remote roles across the EU', t.teal],
];

const LABEL_W = 11; // characters, dot-padded like a real fetch tool
const dotted = (label) => label + ' ' + '.'.repeat(Math.max(1, LABEL_W - label.length)) + ' ';

const prompt = 'david@github ~ $ gitfetch --profile';
const promptW = monoWidth(prompt, FS);

const bodyX = LEFT + PAD;
let y = CHROME + PAD + 18;

const header =
  `<text x="${bodyX}" y="${y}" font-family="${t.fontMono}" font-size="${FS}" font-weight="600" fill="${t.bright}">` +
    `${esc(stats.login || profile.handle)}<tspan fill="${t.muted}">@</tspan><tspan fill="${t.cyan}">github</tspan>` +
  `</text>`;
y += 8;
const rule = `<line x1="${bodyX}" y1="${y}" x2="${W - PAD}" y2="${y}" stroke="${t.strokeSoft}"/>`;
y += LINE_H;

const lines = rows
  .map(([label, value, color], i) => {
    const delay = round(1.3 + i * 0.11);
    const ly = y + i * LINE_H;
    const el =
      `<g opacity="0" transform="translate(0 4)">` +
        `<animate attributeName="opacity" values="0;1" dur="0.35s" begin="${delay}s" fill="freeze"/>` +
        `<animateTransform attributeName="transform" type="translate" values="0 4;0 0" dur="0.35s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>` +
        `<text x="${bodyX}" y="${ly}" font-family="${t.fontMono}" font-size="${FS}">` +
          `<tspan fill="${t.bright}">${esc(dotted(label))}</tspan>` +
          `<tspan fill="${color}">${esc(value)}</tspan>` +
        `</text>` +
      `</g>`;
    return el;
  })
  .join('');

y += rows.length * LINE_H + 6;

/* language ribbon ------------------------------------------------------- */
let ribbon = '';
if (stats.languages?.length) {
  const barW = W - bodyX - PAD;
  const totalPct = stats.languages.reduce((a, l) => a + l.pct, 0) || 1;
  let cx = 0;
  const segs = stats.languages
    .map((l, i) => {
      const w = (l.pct / totalPct) * barW;
      const seg = `<rect x="${round(cx)}" y="0" width="0" height="8" fill="${l.color}">` +
        `<animate attributeName="width" values="0;${round(w)}" dur="0.7s" begin="${round(2.6 + i * 0.09)}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>` +
      `</rect>`;
      cx += w;
      return seg;
    })
    .join('');
  const legend = stats.languages
    .map((l, i) => {
      const lx = i * 160;
      return `<g transform="translate(${lx} 28)">` +
        `<circle cx="4" cy="-4" r="4" fill="${l.color}"/>` +
        `<text x="14" y="0" font-family="${t.fontMono}" font-size="11.5" fill="${t.muted}">${esc(l.name)} ${l.pct}%</text>` +
      `</g>`;
    })
    .join('');
  ribbon =
    `<g transform="translate(${bodyX} ${y})" opacity="0">` +
      `<animate attributeName="opacity" values="0;1" dur="0.4s" begin="2.5s" fill="freeze"/>` +
      `<rect width="${round(barW)}" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>` +
      `<g clip-path="url(#ribbonClip)">${segs}</g>` +
      `${legend}` +
    `</g>`;
  y += 46;
} else {
  ribbon =
    `<g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.4s" begin="2.5s" fill="freeze"/>` +
      `<text x="${bodyX}" y="${y + 6}" font-family="${t.fontMono}" font-size="11.5" fill="${t.muted}">` +
        `language breakdown syncs on the next scheduled build` +
      `</text>` +
    `</g>`;
  y += 26;
}

const H = y + PAD;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${round(H)}" viewBox="0 0 ${W} ${round(H)}" role="img" aria-label="Terminal-style profile summary">
  <title>gitfetch --profile</title>
  <defs>
    <linearGradient id="termBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0714"/>
      <stop offset="1" stop-color="#150d2b"/>
    </linearGradient>
    <linearGradient id="promptGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bright}"/>
      <stop offset="1" stop-color="${t.cyan}"/>
    </linearGradient>
    <radialGradient id="termGlow" cx="0.12" cy="0.9" r="0.8">
      <stop offset="0" stop-color="${t.primary}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${t.primary}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="termCard"><rect width="${W}" height="${round(H)}" rx="16"/></clipPath>
    <clipPath id="ribbonClip"><rect width="${W}" height="8" rx="4"/></clipPath>
    <clipPath id="promptClip">
      <rect x="${bodyX}" y="0" width="0" height="${round(H)}">
        <animate attributeName="width" values="0;${round(promptW)}" dur="1.1s" begin="0.15s" fill="freeze" calcMode="linear"/>
      </rect>
    </clipPath>
  </defs>

  <g clip-path="url(#termCard)">
    <rect width="${W}" height="${round(H)}" fill="url(#termBg)"/>
    <rect width="${W}" height="${round(H)}" fill="url(#termGlow)"/>

    <!-- window chrome -->
    <rect width="${W}" height="${CHROME}" fill="rgba(255,255,255,0.04)"/>
    <line x1="0" y1="${CHROME}" x2="${W}" y2="${CHROME}" stroke="${t.strokeSoft}"/>
    <circle cx="24" cy="${CHROME / 2}" r="6" fill="#ff5f57"/>
    <circle cx="46" cy="${CHROME / 2}" r="6" fill="#febc2e"/>
    <circle cx="68" cy="${CHROME / 2}" r="6" fill="#28c840"/>
    <text x="${W / 2}" y="${CHROME / 2 + 4.5}" text-anchor="middle" font-family="${t.fontMono}" font-size="12" fill="${t.muted}">david@abrilcodes — zsh</text>

    <!-- prompt art column -->
    <g transform="translate(${PAD} ${CHROME + PAD})">
      <rect width="${LEFT - PAD - 10}" height="${round(H - CHROME - PAD * 2)}" rx="14" fill="rgba(255,255,255,0.03)" stroke="${t.strokeSoft}"/>
      <g transform="translate(${(LEFT - PAD - 10) / 2} ${(H - CHROME - PAD * 2) / 2})">
        <g transform="translate(0 -70)">
          <circle r="26" fill="none" stroke="${t.stroke}" stroke-dasharray="4 8">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="22s" repeatCount="indefinite"/>
          </circle>
          <text text-anchor="middle" y="7" font-family="${t.fontSans}" font-size="19" font-weight="600" fill="${t.textSoft}">DA</text>
        </g>
        <g transform="translate(-14 0)">
          <text text-anchor="middle" y="10" font-family="${t.fontMono}" font-size="70" font-weight="700" fill="url(#promptGrad)">&#8250;</text>
          <rect x="14" y="-6" width="30" height="6" rx="3" fill="url(#promptGrad)">
            <animate attributeName="opacity" values="1;1;0.15;0.15;1" keyTimes="0;0.45;0.5;0.95;1" dur="1.1s" repeatCount="indefinite"/>
          </rect>
        </g>
        <text text-anchor="middle" y="52" font-family="${t.fontMono}" font-size="9.5" letter-spacing="1.4" fill="${t.muted}">SHIP · MEASURE · SHIP</text>
      </g>
    </g>

    <!-- typed command -->
    <g clip-path="url(#promptClip)">
      <text x="${bodyX}" y="${CHROME + PAD - 6}" font-family="${t.fontMono}" font-size="${FS}" fill="${t.muted}">${esc(prompt)}</text>
    </g>
    <rect y="${CHROME + PAD - 17}" width="7.5" height="15" fill="${t.bright}" opacity="0.85" x="${bodyX}">
      <animate attributeName="x" values="${bodyX};${round(bodyX + promptW)}" dur="1.1s" begin="0.15s" fill="freeze"/>
      <animate attributeName="opacity" values="0.85;0.85;0;0;0.85" keyTimes="0;0.45;0.5;0.95;1" dur="1s" repeatCount="indefinite"/>
    </rect>

    ${header}
    ${rule}
    ${lines}
    ${ribbon}

    <rect width="${W}" height="${round(H)}" rx="16" fill="none" stroke="${t.stroke}"/>
  </g>
</svg>
`;

writeFileSync(new URL('../assets/terminal.svg', import.meta.url), svg);
console.log(`assets/terminal.svg  ${(svg.length / 1024).toFixed(1)} KB  (${W}x${round(H)})`);
