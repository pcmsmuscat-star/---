import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/i18n';
import { colors, gradient, radius, shadow } from '@/theme/tokens';

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/** Blue → cyan hero card (today's dose, INR chart, weekly totals…). */
export function GradientCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { isRTL } = useLanguage();
  return (
    <View style={[styles.heroShadow, style]}>
      <LinearGradient
        colors={gradient}
        start={{ x: isRTL ? 1 : 0, y: 0 }}
        end={{ x: isRTL ? 0 : 1, y: 1 }}
        style={styles.hero}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

/** 44 px white circle with a 3 px gradient ring (list and menu icons). */
export function GradientRingIcon({ children, size = 44, danger }: { children: ReactNode; size?: number; danger?: boolean }) {
  const { isRTL } = useLanguage();
  return (
    <LinearGradient
      colors={danger ? [colors.urgent, '#E8701F'] : gradient}
      start={{ x: isRTL ? 1 : 0, y: 0 }}
      end={{ x: isRTL ? 0 : 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: size / 2, padding: 3 }}
    >
      <View style={styles.ringInner}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
    ...shadow.card,
  },
  heroShadow: {
    borderRadius: radius.hero,
    backgroundColor: colors.blue,
    ...shadow.hero,
  },
  hero: {
    borderRadius: radius.hero,
    padding: 20,
    overflow: 'hidden',
  },
  ringInner: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
