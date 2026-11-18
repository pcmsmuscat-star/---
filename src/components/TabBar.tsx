import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useLanguage } from '@/i18n';
import { colors } from '@/theme/tokens';
import { GuideIcon, InrIcon, MoreIcon, SymptomsIcon, TodayIcon } from './icons';
import { AppText } from './Text';

const icons: Record<string, (color: string) => ReactNode> = {
  index: (c) => <TodayIcon color={c} strokeWidth={2} />,
  inr: (c) => <InrIcon color={c} strokeWidth={2} />,
  symptoms: (c) => <SymptomsIcon color={c} strokeWidth={2} />,
  guide: (c) => <GuideIcon color={c} strokeWidth={2} />,
  more: (c) => <MoreIcon color={c} strokeWidth={2} />,
};

/**
 * White bottom bar with five tabs. The active tab's icon is lifted into a
 * 54 px gradient circle. Order follows the reading direction automatically
 * because the root view sets `direction`.
 */
export function TabBar({ state, descriptors, emitter, navigateToTab, insets }: BottomTabBarProps) {
  const { isRTL } = useLanguage();
  return (
    <View accessibilityRole="tablist" style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) + 8 }]}>
      {state.routes.map((route, index) => {
        const focused = index === state.index;
        const { options } = descriptors[route.key];
        const label = typeof options.title === 'string' ? options.title : route.name;
        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigateToTab(route.key);
        };
        const icon = icons[route.name]?.(focused ? colors.white : colors.muted);
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={label}
            onPress={onPress}
            style={styles.item}
          >
            {focused ? (
              <LinearGradient
                colors={[colors.blue, colors.cyan]}
                start={{ x: isRTL ? 1 : 0, y: 0 }}
                end={{ x: isRTL ? 0 : 1, y: 1 }}
                style={styles.activeBubble}
              >
                {icon}
              </LinearGradient>
            ) : (
              <View style={styles.iconSlot}>{icon}</View>
            )}
            <AppText
              variant="label"
              weight={focused ? 'bold' : 'medium'}
              color={focused ? colors.blue : colors.muted}
              align="center"
              numberOfLines={1}
              style={{ fontSize: 12 }}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingHorizontal: 6,
    alignItems: 'flex-end',
    shadowColor: colors.navy,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  item: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  iconSlot: { height: 26, justifyContent: 'center' },
  activeBubble: {
    width: 54,
    height: 54,
    marginTop: -32,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.blue,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
});
