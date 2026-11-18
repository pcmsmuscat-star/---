import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/i18n';
import { colors, gradient, radius, shadow, TOUCH_TARGET } from '@/theme/tokens';
import { AppText } from './Text';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

export function PrimaryButton({ label, onPress, icon, disabled, style, accessibilityHint }: ButtonProps) {
  const { isRTL } = useLanguage();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryWrap, { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: isRTL ? 1 : 0, y: 0 }}
        end={{ x: isRTL ? 0 : 1, y: 1 }}
        style={styles.primary}
      >
        {icon}
        <AppText variant="button">{label}</AppText>
      </LinearGradient>
    </Pressable>
  );
}

/** White button; `onGradient` gives blue text for use on gradient cards. */
export function SecondaryButton({ label, onPress, icon, disabled, style }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.secondary, { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style]}
    >
      {icon}
      <AppText variant="button" color={colors.blue}>
        {label}
      </AppText>
    </Pressable>
  );
}

export type Segment<K extends string> = { key: K; label: string };

/** White pill track; the active segment is filled with the gradient. */
export function SegmentedPill<K extends string>({
  segments,
  value,
  onChange,
  accessibilityLabel,
}: {
  segments: Segment<K>[];
  value: K;
  onChange: (key: K) => void;
  accessibilityLabel: string;
}) {
  const { isRTL } = useLanguage();
  return (
    <View accessibilityRole="tablist" accessibilityLabel={accessibilityLabel} style={styles.track}>
      {segments.map((s) => {
        const active = s.key === value;
        return (
          <Pressable
            key={s.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(s.key)}
            style={styles.segment}
          >
            {active ? (
              <LinearGradient
                colors={[colors.blue, colors.cyan]}
                start={{ x: isRTL ? 1 : 0, y: 0 }}
                end={{ x: isRTL ? 0 : 1, y: 1 }}
                style={styles.segmentFill}
              >
                <AppText variant="bodyStrong" color={colors.white}>
                  {s.label}
                </AppText>
              </LinearGradient>
            ) : (
              <View style={styles.segmentFill}>
                <AppText variant="bodyStrong" color={colors.muted}>
                  {s.label}
                </AppText>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

/** Round icon-only button (bell, back). Always needs a screen-reader label. */
export function IconButton({ icon, label, onPress }: { icon: ReactNode; label: string; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.8 : 1 }]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryWrap: {
    borderRadius: radius.button,
    ...shadow.hero,
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
  },
  primary: {
    minHeight: 56,
    borderRadius: radius.button,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondary: {
    minHeight: 56,
    borderRadius: radius.button,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadow.card,
  },
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 4,
    gap: 4,
    ...shadow.card,
  },
  segment: { flex: 1, minHeight: TOUCH_TARGET + 2 },
  segmentFill: {
    flex: 1,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  iconButton: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    borderRadius: TOUCH_TARGET / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
});
