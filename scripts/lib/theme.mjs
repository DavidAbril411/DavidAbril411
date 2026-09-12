import { readFileSync } from 'node:fs';

// The palette lives in data, not in code. theme.json's "active" is the
// persisted choice and the only one CI honours: these generators and the
// snake workflow both read it, so changing it repaints the whole profile.
// PROFILE_PALETTE is a local preview override for these generators alone —
// it never reaches the snake, which is always rendered from "active".
const themeFile = JSON.parse(readFileSync(new URL('../../profile/data/theme.json', import.meta.url), 'utf8'));
const paletteName = process.env.PROFILE_PALETTE || themeFile.active;
const palette = themeFile.palettes[paletteName];
if (!palette) {
  throw new Error(`unknown palette "${paletteName}" — have: ${Object.keys(themeFile.palettes).join(', ')}`);
}

export const paletteId = paletteName;
export const snakeColors = palette.snake;

export const theme = {
  ...palette,
  // Neutrals and surfaces are shared by every palette: the cards paint their
  // own opaque ground, which is the only thing that also works in the GitHub
  // mobile app, where `prefers-color-scheme` inside an SVG is ignored.
  panel: 'rgba(255,255,255,0.045)',
  panelStrong: 'rgba(255,255,255,0.075)',
  stroke: 'rgba(255,255,255,0.18)',
  strokeSoft: 'rgba(255,255,255,0.09)',

  text: '#f2eeff',
  textSoft: '#cfc6e8',
  muted: '#9b92b8',

  fontSans: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontMono: "'SFMono-Regular', 'JetBrains Mono', Consolas, 'Liberation Mono', Menlo, monospace",
};

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Monospace advance width is a fixed ratio of the font size, which lets the
// typing animation place its caret exactly without measuring glyphs.
export const MONO_ADVANCE = 0.6;
export const monoWidth = (text, size) => text.length * size * MONO_ADVANCE;

export const round = (n) => Math.round(n * 1000) / 1000;
