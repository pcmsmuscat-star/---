/**
 * Ittizan design tokens. Values match the approved design canvas.
 * Status colours are always paired with text and/or an arrow (never colour alone).
 */
export const colors = {
  bg: '#F2F7FD',
  surface: '#FFFFFF',
  tint: '#E3EEFC',
  border: '#EDF2F9',
  inputBorder: '#CFDDF1',
  ringSoft: '#B9D3F6',
  decor: '#C9DCF5',
  decorNode: '#B7D0F2',

  navy: '#0E2A5C',
  steel: '#2C5A93',
  muted: '#4A5F80',
  blue: '#1E6BF0',
  blueDark: '#1E5BC6',
  sky: '#1AA6E6',
  cyan: '#26CFD6',
  yellow: '#FFC93C',
  yellowSoft: '#FFF6DC',
  yellowText: '#5A4300',
  white: '#FFFFFF',

  inRangeBg: '#DDF5F1',
  inRangeText: '#0B6B61',
  highBg: '#FDEBDD',
  highText: '#8A3505',
  high: '#B54708',
  lowBg: '#E3EDF8',
  lowText: '#174C87',
  urgent: '#B42318',
  urgentBg: '#FDE8E6',
} as const;

/** Blue → sky → cyan, drawn at 135° (mirrored to 225° in Arabic). */
export const gradient = [colors.blue, colors.sky, colors.cyan] as const;

export const radius = {
  input: 16,
  button: 18,
  card: 24,
  hero: 28,
  pill: 999,
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const shadow = {
  card: {
    shadowColor: colors.navy,
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  hero: {
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 18 },
    elevation: 8,
  },
} as const;

/** Minimum touch target from the accessibility rules. */
export const TOUCH_TARGET = 44;
