import { StyleSheet, View } from 'react-native';
import {
  AppText,
  BellIcon,
  Card,
  EmptyState,
  GradientRingIcon,
  GuideIcon,
  IconButton,
  InrIcon,
  Logo,
  Screen,
  SyncChip,
  TodayIcon,
} from '@/components';
import { useLanguage, useT } from '@/i18n';
import { formatLongDate } from '@/lib/dates';
import { colors } from '@/theme/tokens';

/**
 * Today (2.1). Phase 1 shows the first-use empty state; the dose card,
 * INR cards and time-in-range arrive in phase 3 once data exists.
 */
export default function TodayScreen() {
  const t = useT();
  const { language } = useLanguage();

  const header = (
    <View style={{ gap: 14 }}>
      <View style={styles.brandRow}>
        <Logo size={40} label={t('app.name')} />
        <View style={{ flex: 1 }}>
          <AppText variant="section" color={colors.blue} weight="extrabold">
            {language === 'ar' ? t('app.nameAr') : `${t('app.name')} ${t('app.nameAr')}`}
          </AppText>
          <AppText variant="meta">{formatLongDate(new Date(), language)}</AppText>
        </View>
        <IconButton icon={<BellIcon color={colors.blue} size={20} />} label={t('common.notifications')} />
      </View>
      <View style={styles.brandRow}>
        <AppText variant="title" accessibilityRole="header" style={{ flex: 1 }}>
          {t('today.title')}
        </AppText>
        <SyncChip state={{ kind: 'notSynced' }} />
      </View>
    </View>
  );

  const steps = [
    { key: 'tablets', label: t('today.stepTablets'), icon: <TodayIcon color={colors.blue} size={20} /> },
    { key: 'plan', label: t('today.stepPlan'), icon: <GuideIcon color={colors.blue} size={20} /> },
    { key: 'inr', label: t('today.stepInr'), icon: <InrIcon color={colors.blue} size={20} /> },
  ];

  return (
    <Screen header={header}>
      <EmptyState title={t('today.emptyTitle')} body={t('today.emptyBody')} actionLabel={t('today.start')}>
        <Card style={styles.checklist}>
          {steps.map((s, i) => (
            <View key={s.key} style={[styles.step, i < steps.length - 1 && styles.stepDivider]}>
              <GradientRingIcon>{s.icon}</GradientRingIcon>
              <AppText variant="body" weight="semibold" color={colors.steel} style={{ flex: 1 }}>
                {s.label}
              </AppText>
            </View>
          ))}
        </Card>
      </EmptyState>
      <AppText variant="meta" align="center" style={{ paddingHorizontal: 12 }}>
        {t('more.disclaimer')}
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checklist: { alignSelf: 'stretch', paddingVertical: 4, shadowOpacity: 0, elevation: 0, backgroundColor: colors.bg },
  step: { flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 64 },
  stepDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
