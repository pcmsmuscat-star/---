import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';
import { NetworkDecor } from './NetworkDecor';
import { AppText } from './Text';

/** Standard scrolling page: light-blue background, header decoration, title row. */
export function Screen({
  title,
  headerRight,
  header,
  children,
  decor = true,
}: {
  title?: string;
  headerRight?: ReactNode;
  /** Replaces the default title row. */
  header?: ReactNode;
  children: ReactNode;
  decor?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      {decor && <NetworkDecor />}
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 140, paddingHorizontal: 16, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {header ?? (
          <View style={styles.titleRow}>
            {title ? (
              <AppText variant="title" accessibilityRole="header" style={{ flex: 1 }}>
                {title}
              </AppText>
            ) : (
              <View style={{ flex: 1 }} />
            )}
            {headerRight}
          </View>
        )}
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
    minHeight: 44,
  },
});
