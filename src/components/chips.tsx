import { StyleSheet, View } from 'react-native';
import { useT } from '@/i18n';
import type { InrStatus } from '@/domain/inr';
import { colors, radius } from '@/theme/tokens';
import { AppText, Num } from './Text';

const statusColors: Record<InrStatus, { bg: string; fg: string }> = {
  inRange: { bg: colors.inRangeBg, fg: colors.inRangeText },
  high: { bg: colors.highBg, fg: colors.highText },
  low: { bg: colors.lowBg, fg: colors.lowText },
};

/** Status is always written out (with ↑/↓), never colour alone. */
export function StatusChip({ status }: { status: InrStatus }) {
  const t = useT();
  const c = statusColors[status];
  return (
    <View style={[styles.chip, { backgroundColor: c.bg }]}>
      <AppText variant="label" color={c.fg}>
        {t(`status.${status}`)}
      </AppText>
    </View>
  );
}

/** Outlined value pill, e.g. "6 mg" or "3.4". */
export function ValuePill({ value, status }: { value: string; status?: InrStatus }) {
  const tone =
    status === 'high'
      ? { border: '#F5C29B', fg: '#A2440A', bg: '#FFF4EC' }
      : status === 'low'
        ? { border: '#A9C4E8', fg: colors.lowText, bg: '#EEF4FC' }
        : { border: colors.ringSoft, fg: colors.blue, bg: colors.surface };
  return (
    <View style={[styles.pill, { borderColor: tone.border, backgroundColor: tone.bg }]}>
      <Num variant="bodyStrong" weight="extrabold" color={tone.fg} align="center">
        {value}
      </Num>
    </View>
  );
}

export type SyncState = { kind: 'synced'; minutes: number } | { kind: 'syncing' } | { kind: 'notSynced' };

export function SyncChip({ state }: { state: SyncState }) {
  const t = useT();
  const label =
    state.kind === 'synced'
      ? t('sync.synced', { minutes: state.minutes })
      : state.kind === 'syncing'
        ? t('sync.syncing')
        : t('sync.notSynced');
  const dot = state.kind === 'notSynced' ? colors.muted : colors.cyan;
  return (
    <View accessibilityRole="text" accessibilityLabel={label} style={[styles.chip, styles.sync]}>
      <View style={[styles.dot, { backgroundColor: dot }]} />
      <AppText variant="label" color={colors.steel}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  sync: { backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  pill: {
    minWidth: 60,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
});
