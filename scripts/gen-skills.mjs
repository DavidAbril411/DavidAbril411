import { writeFileSync, readFileSync } from 'node:fs';
import { theme as t, esc, round } from './lib/theme.mjs';

const skills = JSON.parse(readFileSync(new URL('../profile/data/skills.json', import.meta.url), 'utf8'));

const W = 1000;
const PAD = 22;
const GAP = 16;
const COLS = 2;
const TILE_W = (W - PAD * 2 - GAP * (COLS - 1)) / COLS;
const ROW_H = 27;
const HEAD_H = 66;
const TILE_PAD_B = 16;

const ACCENTS = { frontend: t.bright, backend: t.cyan, data: t.teal, ai: t.pink };

const GLYPHS = {
  layers: 'M12 3 21 8 12 13 3 8Z M3 12 12 17 21 12 M3 16 12 21 21 16',
  server: 'M4 4h16v6H4z M4 14h16v6H4z M7.5 7h.01 M7.5 17h.01',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  spark: 'M12 3 13.9 9.6 20.5 11.5 13.9 13.4 12 20 10.1 13.4 3.5 11.5 10.1 9.6Z',
};

const BAR_W = 118;

function tile(group, gx, gy, index) {
  const accent = ACCENTS[group.id] ?? t.bright;
  const h = HEAD_H + group.items.length * ROW_H + TILE_PAD_B;
  const baseDelay = index * 0.22;

  const rows = group.items
    .map((item, i) => {
      const weight = skills.tiers[item.tier]?.weight ?? 0.5;
      const y = HEAD_H + i * ROW_H;
      const barX = TILE_W - 20 - BAR_W;
      const delay = round(baseDelay + i * 0.075);
      const fill = round(BAR_W * weight);
      return (
        `<g opacity="0">` +
          `<animate attributeName="opacity" values="0;1" dur="0.5s" begin="${delay}s" fill="freeze"/>` +
          `<text x="20" y="${y + 4}" font-family="${t.fontSans}" font-size="12.5" fill="${t.textSoft}">${esc(item.name)}</text>` +
          `<rect x="${barX}" y="${y - 4}" width="${BAR_W}" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>` +
          `<rect x="${barX}" y="${y - 4}" width="0" height="6" rx="3" fill="${accent}" opacity="0.9">` +
            `<animate attributeName="width" values="0;${fill}" dur="0.9s" begin="${delay}s" fill="freeze" ` +
              `calcMode="spline" keySplines="0.16 1 0.3 1"/>` +
          `</rect>` +
        `</g>`
      );
    })
    .join('');

  return { h, svg:
    `<g transform="translate(${gx} ${gy})">` +
      `<rect width="${round(TILE_W)}" height="${h}" rx="18" fill="${t.panel}" stroke="${t.strokeSoft}"/>` +
      `<rect width="${round(TILE_W)}" height="${h}" rx="18" fill="url(#tileGlow${group.id})" opacity="0.5"/>` +
      `<g transform="translate(20 18)">` +
        `<rect width="30" height="30" rx="9" fill="${accent}" opacity="0.14"/>` +
        `<g transform="translate(3 3) scale(1)" fill="none" stroke="${accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">` +
          `<path d="${GLYPHS[group.glyph]}" transform="scale(1)"/>` +
        `</g>` +
      `</g>` +
      `<text x="62" y="39" font-family="${t.fontSans}" font-size="14.5" font-weight="600" fill="${t.text}">${esc(group.label)}</text>` +
      rows +
    `</g>`,
  };
}

// Lay the tiles out column-major-safe: fill row by row, tracking row heights.
const placed = [];
let y = PAD;
for (let i = 0; i < skills.groups.length; i += COLS) {
  const row = skills.groups.slice(i, i + COLS);
  let rowH = 0;
  row.forEach((group, c) => {
    const x = PAD + c * (TILE_W + GAP);
    const { h, svg } = tile(group, round(x), y, i + c);
    rowH = Math.max(rowH, h);
    placed.push(svg);
  });
  y += rowH + GAP;
}

const LEGEND_H = 34;
const H = y - GAP + PAD + LEGEND_H;

const legend = Object.entries(skills.tiers)
  .map(([, cfg], i) => {
    const x = PAD + 4 + i * 190;
    const w = round(26 * (cfg.weight));
    return (
      `<g transform="translate(${x} ${H - PAD - 14})">` +
        `<rect width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.07)"/>` +
        `<rect width="${w}" height="5" rx="2.5" fill="${t.bright}" opacity="0.9"/>` +
        `<text x="36" y="6" font-family="${t.fontSans}" font-size="11.5" fill="${t.muted}">${esc(cfg.label)}</text>` +
      `</g>`
    );
  })
  .join('');

const glows = skills.groups
  .map((g) => {
    const accent = ACCENTS[g.id] ?? t.bright;
    return `<radialGradient id="tileGlow${g.id}" cx="0.12" cy="0.05" r="0.9">` +
      `<stop offset="0" stop-color="${accent}" stop-opacity="0.16"/>` +
      `<stop offset="1" stop-color="${accent}" stop-opacity="0"/>` +
    `</radialGradient>`;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${round(H)}" viewBox="0 0 ${W} ${round(H)}" role="img" aria-label="Skills by domain">
  <title>Skills by domain</title>
  <defs>
    <linearGradient id="skillBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bg0}"/>
      <stop offset="1" stop-color="${t.bg1}"/>
    </linearGradient>
    ${glows}
    <clipPath id="skillCard"><rect width="${W}" height="${round(H)}" rx="24"/></clipPath>
  </defs>
  <g clip-path="url(#skillCard)">
    <rect width="${W}" height="${round(H)}" fill="url(#skillBg)"/>
    ${placed.join('')}
    ${legend}
    <rect width="${W}" height="${round(H)}" rx="24" fill="none" stroke="${t.stroke}"/>
  </g>
</svg>
`;

writeFileSync(new URL('../assets/skills.svg', import.meta.url), svg);
console.log(`assets/skills.svg  ${(svg.length / 1024).toFixed(1)} KB  (${W}x${round(H)})`);
