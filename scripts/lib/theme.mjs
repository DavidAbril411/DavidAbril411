// Palette derived from David's own stack app (style.css) and adapted so the
// cards stay legible on GitHub's light *and* dark backgrounds. The cards paint
// their own opaque ground, which is the only approach that also survives the
// GitHub mobile app (where `prefers-color-scheme` inside an SVG is ignored).
export const theme = {
  bg0: '#0d0817',
  bg1: '#191033',
  bg2: '#241546',
  panel: 'rgba(255,255,255,0.045)',
  panelStrong: 'rgba(255,255,255,0.075)',
  stroke: 'rgba(167,139,250,0.22)',
  strokeSoft: 'rgba(255,255,255,0.09)',

  primary: '#6c469f',
  secondary: '#927ac4',
  bright: '#a78bfa',
  hover: '#825ad1',

  cyan: '#7dd3fc',
  pink: '#f0abfc',
  teal: '#5eead4',
  amber: '#fbbf24',

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
