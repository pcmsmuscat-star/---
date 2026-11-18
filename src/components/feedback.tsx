import { useEffect, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, View, type DimensionValue } from 'react-native';
import { useT } from '@/i18n';
import { colors, radius } from '@/theme/tokens';
import { Card } from './cards';
import { PrimaryButton, SecondaryButton } from './controls';
import { OfflineIcon } from './icons';
import { AppText } from './Text';

export function OfflineBanner() {
  const t = useT();
  return (
    <View accessibilityRole="alert" style={styles.offline}>
      <OfflineIcon size={20} color={colors.white} />
      <AppText variant="meta" color={colors.white} style={{ flex: 1 }}>
        {t('sync.offline')}
      </AppText>
    </View>
  );
}

/** Loading placeholder for lists (skeleton, not a spinner). */
export function Skeleton({ width = '100%', height = 16, rounded = 8 }: { width?: DimensionValue; height?: number; rounded?: number }) {
  const [opacity] = useState(() => new Animated.Value(0.5));
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return (
    <Animated.View
      accessibilityElementsHidden
      style={{ width, height, borderRadius: rounded, backgroundColor: colors.tint, opacity }}
    />
  );
}

export function SkeletonList({ rows = 4 }: { rows?: number }) {
  return (
    <Card style={{ gap: 18 }}>
      {Array.from({ length: rows }, (_, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Skeleton width={44} height={44} rounded={22} />
          <View style={{ flex: 1, gap: 8 }}>
            <Skeleton width="60%" />
            <Skeleton width="40%" height={12} />
          </View>
        </View>
      ))}
    </Card>
  );
}

/** First-use state: short explanation + main action. */
export function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
  children,
}: {
  icon?: ReactNode;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}) {
  return (
    <Card style={{ alignItems: 'center', gap: 12, paddingVertical: 28 }}>
      {icon && <View style={styles.emptyIcon}>{icon}</View>}
      <AppText variant="heading" align="center">
        {title}
      </AppText>
      <AppText variant="body" color={colors.muted} align="center">
        {body}
      </AppText>
      {children}
      {actionLabel && <PrimaryButton label={actionLabel} onPress={onAction} style={{ alignSelf: 'stretch', marginTop: 4 }} />}
    </Card>
  );
}

export function ErrorState({ onRetry, message }: { onRetry: () => void; message?: string }) {
  const t = useT();
  return (
    <Card style={{ gap: 12, alignItems: 'center' }}>
      <AppText variant="bodyStrong" align="center">
        {message ?? t('common.errorGeneric')}
      </AppText>
      <SecondaryButton label={t('common.tryAgain')} onPress={onRetry} style={{ alignSelf: 'stretch' }} />
    </Card>
  );
}

const styles = StyleSheet.create({
  offline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.navy,
    borderRadius: radius.button,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
