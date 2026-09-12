import { writeFileSync, readFileSync } from 'node:fs';
import { theme as t, esc, round } from './lib/theme.mjs';

const projects = JSON.parse(readFileSync(new URL('../profile/data/projects.json', import.meta.url), 'utf8'));

/* The impact numbers used to be an HTML table, which is exactly the thing that
 * falls apart on a phone: GitHub gives every column a fixed share of a narrow
 * screen and the text shreds into one word per line. An SVG is an image, so it
 * scales with the column instead of fighting it. */

const W = 1000;
const PAD = 22;
const GAP = 14;
const COLS = 3;
const TILE_W = (W - PAD * 2 - GAP * (COLS - 1)) / COLS;
const TILE_H = 116;

const ACCENTS = [t.bright, t.cyan, t.teal, t.pink, t.bright, t.cyan];

const tiles = projects.impact.map((item, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (TILE_W + GAP);
  const y = PAD + row * (TILE_H + GAP);
  const accent = ACCENTS[i % ACCENTS.length];
  const delay = round(i * 0.09);

  return (
    `<g transform="translate(${round(x)} ${y})" opacity="0">` +
      `<animate attributeName="opacity" values="0;1" dur="0.5s" begin="${delay}s" fill="freeze"/>` +
      `<rect width="${round(TILE_W)}" height="${TILE_H}" rx="16" fill="${t.panel}" stroke="${t.strokeSoft}"/>` +
      `<rect x="20" y="22" width="0" height="3" rx="1.5" fill="${accent}">` +
        `<animate attributeName="width" values="0;34" dur="0.7s" begin="${round(delay + 0.15)}s" fill="freeze" ` +
          `calcMode="spline" keySplines="0.16 1 0.3 1"/>` +
      `</rect>` +
      `<text x="20" y="70" font-family="${t.fontSans}" font-size="38" font-weight="700" fill="${accent}">${esc(item.value)}</text>` +
      `<text x="20" y="91" font-family="${t.fontSans}" font-size="13" font-weight="600" fill="${t.text}">${esc(item.label)}</text>` +
      `<text x="20" y="107" font-family="${t.fontSans}" font-size="11" fill="${t.muted}">${esc(item.detail)}</text>` +
    `</g>`
  );
});

const rows = Math.ceil(projects.impact.length / COLS);
const H = PAD * 2 + rows * TILE_H + (rows - 1) * GAP;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Impact in numbers">
  <title>${projects.impact.map((i) => `${i.value} ${i.label}`).join(' · ')}</title>
  <defs>
    <linearGradient id="impactBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bg0}"/>
      <stop offset="1" stop-color="${t.bg1}"/>
    </linearGradient>
    <clipPath id="impactCard"><rect width="${W}" height="${H}" rx="24"/></clipPath>
  </defs>
  <g clip-path="url(#impactCard)">
    <rect width="${W}" height="${H}" fill="url(#impactBg)"/>
    ${tiles.join('')}
    <rect width="${W}" height="${H}" rx="24" fill="none" stroke="${t.stroke}"/>
  </g>
</svg>
`;

writeFileSync(new URL('../assets/impact.svg', import.meta.url), svg);
console.log(`assets/impact.svg  ${(svg.length / 1024).toFixed(1)} KB  (${W}x${H})`);
