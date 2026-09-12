import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { theme as t, esc, monoWidth, round } from './lib/theme.mjs';

const profile = JSON.parse(readFileSync(new URL('../profile/data/profile.json', import.meta.url), 'utf8'));

const W = 1000;
const H = 300;
const R = 24;

/* ---------------------------------------------------------------- typing --
 * Every phrase owns a clip rect whose width is driven across the *whole*
 * cycle, so a phrase is naturally clipped to zero width outside its own slot
 * and no opacity juggling is needed. One shared caret follows the active
 * width, which keeps the animation to a single extra element.
 */
function typing({ phrases, x, y, size, cycleDur }) {
  const slot = cycleDur / phrases.length;
  const TYPE = 0.34, HOLD = 0.86; // fractions of a slot
  const clips = [];
  const texts = [];
  const caretStops = [];

  phrases.forEach((phrase, i) => {
    const w = monoWidth(phrase, size);
    const s = i * slot;
    const keys = [s, s + slot * TYPE, s + slot * HOLD, s + slot];
    const times = [];
    const values = [];

    if (i === 0) {
      times.push(0);
      values.push(0);
    } else {
      times.push(0, keys[0] / cycleDur);
      values.push(0, 0);
    }
    times.push(keys[1] / cycleDur, keys[2] / cycleDur, keys[3] / cycleDur);
    values.push(w, w, 0);
    if (i === phrases.length - 1) {
      // already lands on 1.0
    } else {
      times.push(1);
      values.push(0);
    }

    const kt = times.map(round).join(';');
    const vals = values.map(round).join(';');

    clips.push(
      `<clipPath id="type${i}"><rect x="${x}" y="${y - size}" height="${size * 1.45}" width="0">` +
        `<animate attributeName="width" values="${vals}" keyTimes="${kt}" dur="${cycleDur}s" repeatCount="indefinite"/>` +
      `</rect></clipPath>`
    );
    texts.push(
      `<text x="${x}" y="${y}" clip-path="url(#type${i})" font-family="${t.fontMono}" font-size="${size}" fill="${t.textSoft}">${esc(phrase)}</text>`
    );

    caretStops.push({ times, values: values.map((v) => x + v) });
  });

  // Merge every phrase's caret track into one monotonic timeline.
  const merged = new Map();
  caretStops.forEach(({ times, values }) => {
    times.forEach((time, idx) => {
      const key = round(time);
      const v = values[idx];
      // A phrase at rest sits at the left margin; an active one wins the slot.
      if (!merged.has(key) || v > merged.get(key)) merged.set(key, v);
    });
  });
  const sorted = [...merged.entries()].sort((a, b) => a[0] - b[0]);
  const caret =
    `<rect y="${y - size + 2}" width="2.5" height="${size * 1.06}" rx="1.25" fill="${t.bright}" x="${x}">` +
      `<animate attributeName="x" values="${sorted.map(([, v]) => round(v)).join(';')}" ` +
        `keyTimes="${sorted.map(([k]) => round(k)).join(';')}" dur="${cycleDur}s" repeatCount="indefinite"/>` +
      `<animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.45;0.5;0.95;1" dur="1.05s" repeatCount="indefinite"/>` +
    `</rect>`;

  return { defs: clips.join(''), body: texts.join('') + caret };
}

/* ------------------------------------------------------------------ chips */
function chips(items, x, y) {
  let cursor = x;
  return items
    .map(({ label, color }) => {
      const w = label.length * 7.05 + 34;
      const el =
        `<g transform="translate(${round(cursor)} ${y})">` +
          `<rect width="${round(w)}" height="28" rx="14" fill="${t.panel}" stroke="${t.strokeSoft}"/>` +
          `<circle cx="15" cy="14" r="3.5" fill="${color}">` +
            `<animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite"/>` +
          `</circle>` +
          `<text x="26" y="18.5" font-family="${t.fontSans}" font-size="12.5" fill="${t.textSoft}">${esc(label)}</text>` +
        `</g>`;
      cursor += w + 10;
      return el;
    })
    .join('');
}

/* ------------------------------------------------------------------- grid */
function grid() {
  const lines = [];
  for (let x = 0; x <= W; x += 40) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${t.strokeSoft}" stroke-width="0.6"/>`);
  }
  for (let y = 0; y <= H; y += 40) {
    lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${t.strokeSoft}" stroke-width="0.6"/>`);
  }
  return `<g mask="url(#gridFade)" opacity="0.72">${lines.join('')}</g>`;
}

/* ------------------------------------------------------------------ blobs */
function blob(cx, cy, r, color, dur, dx, dy, delay = 0) {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" filter="url(#soft)" opacity="0.5">` +
      `<animateTransform attributeName="transform" type="translate" ` +
        `values="0 0; ${dx} ${dy}; ${-dx * 0.6} ${dy * 0.4}; 0 0" dur="${dur}s" ` +
        `begin="${delay}s" repeatCount="indefinite" calcMode="spline" ` +
        `keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"/>` +
    `</circle>`
  );
}

const type = typing({
  phrases: profile.typing,
  x: 202,
  y: 204,
  size: 17,
  cycleDur: profile.typing.length * 3.8,
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(profile.name)} — ${esc(profile.role)}">
  <title>${esc(profile.name)} — ${esc(profile.role)}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bg0}"/>
      <stop offset="0.55" stop-color="${t.bg1}"/>
      <stop offset="1" stop-color="${t.bg2}"/>
    </linearGradient>
    <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${t.text}"/>
      <stop offset="0.42" stop-color="${t.text}"/>
      <stop offset="0.5" stop-color="${t.bright}"/>
      <stop offset="0.58" stop-color="${t.text}"/>
      <stop offset="1" stop-color="${t.text}"/>
      <animate attributeName="x1" values="-1;1" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="0;2" dur="6s" repeatCount="indefinite"/>
    </linearGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bright}"/>
      <stop offset="0.5" stop-color="${t.cyan}"/>
      <stop offset="1" stop-color="${t.pink}"/>
    </linearGradient>
    <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${t.bright}" stop-opacity="0"/>
      <stop offset="0.5" stop-color="${t.bright}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${t.bright}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${t.bright}" stop-opacity="0"/>
      <stop offset="0.35" stop-color="${t.bright}" stop-opacity="0.7"/>
      <stop offset="0.65" stop-color="${t.cyan}" stop-opacity="0.6"/>
      <stop offset="1" stop-color="${t.pink}" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="46"/>
    </filter>
    <mask id="gridFade">
      <radialGradient id="gf" cx="0.5" cy="0.5" r="0.62">
        <stop offset="0" stop-color="#fff" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <rect width="${W}" height="${H}" fill="url(#gf)"/>
    </mask>
    <clipPath id="card"><rect width="${W}" height="${H}" rx="${R}"/></clipPath>
    ${type.defs}
  </defs>

  <g clip-path="url(#card)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    ${blob(190, 90, 130, t.blobA, 22, 120, 60)}
    ${blob(760, 220, 150, t.blobB, 26, -140, -70, 3)}
    ${blob(520, 40, 110, t.blobC, 30, 90, 120, 6)}
    ${grid()}

    <!-- light sweeping across the card -->
    <rect x="-420" y="0" width="420" height="${H}" fill="url(#sweep)" opacity="0.32">
      <animate attributeName="x" values="-420;${W}" dur="7s" repeatCount="indefinite"/>
    </rect>

    <!-- monogram -->
    <g transform="translate(108 150)">
      <circle r="52" fill="none" stroke="url(#ring)" stroke-width="1.6" stroke-dasharray="6 10" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite"/>
      </circle>
      <circle r="43" fill="none" stroke="${t.bright}" stroke-width="1" stroke-dasharray="70 200" opacity="0.75">
        <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="11s" repeatCount="indefinite"/>
      </circle>
      <circle r="36" fill="${t.panelStrong}" stroke="${t.stroke}"/>
      <text text-anchor="middle" y="11" font-family="${t.fontSans}" font-size="30" font-weight="600" fill="url(#shimmer)">DA</text>
    </g>

    <!-- identity -->
    <text x="202" y="96" font-family="${t.fontSans}" font-size="12.5" letter-spacing="3.4" fill="${t.bright}" opacity="0.95">${esc(profile.role.toUpperCase())} &#183; ${esc(profile.location.toUpperCase())}</text>
    <text x="200" y="146" font-family="${t.fontSans}" font-size="42" font-weight="700" fill="url(#shimmer)">${esc(profile.name)}</text>
    <text x="202" y="172" font-family="${t.fontSans}" font-size="14.5" fill="${t.muted}">${esc(profile.tagline)}</text>

    <text x="182" y="204" font-family="${t.fontMono}" font-size="17" fill="${t.teal}">&#8250;</text>
    ${type.body}

    ${chips(
      [
        { label: 'Graduating Dec 2026', color: t.cyan },
        { label: 'EU citizen · Italian passport', color: t.teal },
        { label: 'Open to remote roles · EU', color: t.pink },
      ],
      200,
      234
    )}

    <rect width="${W}" height="${H}" rx="${R}" fill="none" stroke="${t.stroke}" stroke-width="1"/>
    <rect x="24" y="0" width="${W - 48}" height="1.4" fill="url(#edge)"/>
  </g>
</svg>
`;

mkdirSync(new URL('../assets/', import.meta.url), { recursive: true });
writeFileSync(new URL('../assets/hero.svg', import.meta.url), svg);
console.log(`assets/hero.svg  ${(svg.length / 1024).toFixed(1)} KB`);
