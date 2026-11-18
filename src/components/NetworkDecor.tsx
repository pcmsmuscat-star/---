import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useLanguage } from '@/i18n';
import { colors } from '@/theme/tokens';

const nodes = [
  [180, 20],
  [270, 70],
  [370, 40],
  [330, 150],
] as const;

/** Faint "network lines and dots" header decoration. Purely decorative. */
export function NetworkDecor({ onGradient }: { onGradient?: boolean }) {
  const { isRTL } = useLanguage();
  const stroke = onGradient ? 'rgba(255,255,255,0.16)' : colors.decor;
  const fill = onGradient ? 'rgba(255,255,255,0.28)' : colors.surface;
  const nodeStroke = onGradient ? 'transparent' : colors.decorNode;
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[StyleSheet.absoluteFill, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
    >
      <Svg width="100%" height={220} viewBox="0 0 390 220" preserveAspectRatio="xMaxYMin slice">
        {!onGradient && <Circle cx={350} cy={20} r={120} fill="#E1EDFC" />}
        <Line x1={180} y1={20} x2={270} y2={70} stroke={stroke} strokeWidth={1.2} />
        <Line x1={270} y1={70} x2={370} y2={40} stroke={stroke} strokeWidth={1.2} />
        <Line x1={270} y1={70} x2={330} y2={150} stroke={stroke} strokeWidth={1.2} />
        {nodes.map(([x, y]) => (
          <Circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} fill={fill} stroke={nodeStroke} strokeWidth={1.5} />
        ))}
      </Svg>
    </View>
  );
}
