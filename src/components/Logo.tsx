import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, gradient } from '@/theme/tokens';

/**
 * Ittizan mark: gradient tile, protective ring, white drop, yellow pulse dot.
 * No crosses, hearts or shields (brand rule).
 */
export function Logo({ size = 40, label }: { size?: number; label?: string }) {
  return (
    <View
      accessible={!!label}
      accessibilityRole={label ? 'image' : undefined}
      accessibilityLabel={label}
      style={{ width: size, height: size, borderRadius: size * 0.29, overflow: 'hidden' }}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Svg width={size * 0.7} height={size * 0.7} viewBox="0 0 48 48">
          <Circle cx={24} cy={24} r={17} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2.6} />
          <Path d="M24 11c5 6.5 8.5 11 8.5 15a8.5 8.5 0 0 1-17 0c0-4 3.5-8.5 8.5-15z" fill={colors.white} />
          <Circle cx={38.7} cy={15.5} r={4} fill={colors.yellow} />
        </Svg>
      </LinearGradient>
    </View>
  );
}
