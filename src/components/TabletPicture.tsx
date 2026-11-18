import { View } from 'react-native';

export type TabletColour =
  | 'white'
  | 'pink'
  | 'brown'
  | 'lavender'
  | 'green'
  | 'tan'
  | 'blue'
  | 'peach'
  | 'teal'
  | 'yellow';
export type TabletShape = 'round' | 'oval' | 'capsule';
export type ScoreLine = 'none' | 'half' | 'quarter';

export const tabletPalette: Record<TabletColour, string> = {
  white: '#FFFFFF',
  pink: '#F4A9C0',
  brown: '#93613F',
  lavender: '#C6B4E6',
  green: '#9CCB8F',
  tan: '#D9BC8E',
  blue: '#8FB3E3',
  peach: '#F6C3A1',
  teal: '#5FB8AC',
  yellow: '#F3DA6B',
};

const darkTablets: TabletColour[] = ['brown', 'teal'];

/**
 * Draws a tablet from its colour, shape and score line so doses show as pictures.
 * Never mirrored in RTL. Decorative: the dose text next to it carries the meaning.
 */
export function TabletPicture({
  colour,
  shape = 'round',
  score = 'none',
  size = 40,
  customHex,
}: {
  colour: TabletColour;
  shape?: TabletShape;
  score?: ScoreLine;
  size?: number;
  customHex?: string;
}) {
  const w = shape === 'round' ? size : shape === 'oval' ? size * 1.35 : size * 1.5;
  const h = shape === 'round' ? size : shape === 'oval' ? size * 0.85 : size * 0.68;
  const line = darkTablets.includes(colour) ? 'rgba(255,255,255,0.4)' : 'rgba(80,40,20,0.28)';
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: w,
        height: h,
        borderRadius: shape === 'oval' ? h / 2 : shape === 'capsule' ? h / 2 : w / 2,
        backgroundColor: customHex ?? tabletPalette[colour],
        borderWidth: colour === 'white' ? 1 : 0,
        borderColor: '#D5DCE6',
        borderBottomWidth: Math.max(2, size * 0.08),
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'ltr',
      }}
    >
      {score !== 'none' && (
        <View style={{ position: 'absolute', width: w * 0.64, height: 2, borderRadius: 1, backgroundColor: line }} />
      )}
      {score === 'quarter' && (
        <View style={{ position: 'absolute', height: h * 0.64, width: 2, borderRadius: 1, backgroundColor: line }} />
      )}
    </View>
  );
}
