import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import {
  AppText,
  Card,
  CheckIcon,
  ChevronIcon,
  ClockIcon,
  ErrorState,
  GradientCard,
  GradientRingIcon,
  IconButton,
  InrIcon,
  NetworkDecor,
  Num,
  OfflineBanner,
  PrimaryButton,
  Screen,
  SecondaryButton,
  SegmentedPill,
  SkeletonList,
  StatusChip,
  SyncChip,
  TabletPicture,
  ValuePill,
} from '@/components';
import { useLanguage, useT } from '@/i18n';
import { colors } from '@/theme/tokens';

/**
 * Hidden design gallery (More → Design gallery): every shared component,
 * so English and Arabic can be checked side by side.
 */
export default function GalleryScreen() {
  const t = useT();
  const { isRTL, language, setLanguage } = useLanguage();
  const [seg, setSeg] = useState<'a' | 'b'>('a');

  const back = (
    <IconButton
      icon={<ChevronIcon flip={!isRTL} color={colors.blue} size={20} strokeWidth={2.2} />}
      label={t('common.back')}
      onPress={() => router.back()}
    />
  );

  return (
    <Screen
      header={
        <View style={styles.row}>
          {back}
          <AppText variant="title" accessibilityRole="header" style={{ flex: 1 }}>
            {t('gallery.title')}
          </AppText>
        </View>
      }
    >
      <SegmentedPill
        accessibilityLabel={t('more.language')}
        value={language}
        onChange={(l) => void setLanguage(l)}
        segments={[
          { key: 'en', label: 'English' },
          { key: 'ar', label: 'العربية' },
        ]}
      />

      <AppText variant="section">{t('gallery.cards')}</AppText>
      <GradientCard>
        <NetworkDecor onGradient />
        <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
          <View>
            <AppText variant="bodyStrong" color={colors.white}>
              {t('gallery.heroLabel')}
            </AppText>
            <Num variant="hero" color={colors.white}>
              6 mg
            </Num>
          </View>
          <View style={styles.timeChip}>
            <ClockIcon color={colors.white} size={15} strokeWidth={2.2} />
            <Num variant="label" color={colors.white}>
              6:00 PM
            </Num>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 14 }]}>
          <View style={styles.tabletChip}>
            <TabletPicture colour="peach" score="half" size={40} />
            <Num variant="bodyStrong" color={colors.white}>
              1 × 5 mg
            </Num>
          </View>
          <View style={styles.tabletChip}>
            <TabletPicture colour="brown" size={32} />
            <Num variant="bodyStrong" color={colors.white}>
              1 × 1 mg
            </Num>
          </View>
        </View>
        <SecondaryButton
          label={t('gallery.primary')}
          icon={<CheckIcon color={colors.blue} size={18} strokeWidth={2.6} />}
          style={{ marginTop: 16 }}
        />
      </GradientCard>

      <Card style={{ gap: 12 }}>
        <View style={styles.row}>
          <GradientRingIcon>
            <InrIcon color={colors.blue} size={20} />
          </GradientRingIcon>
          <AppText variant="body" weight="semibold" color={colors.steel} style={{ flex: 1 }}>
            INR
          </AppText>
          <ValuePill value="2.5" />
        </View>
        <View style={styles.row}>
          <GradientRingIcon danger>
            <AppText variant="label" color={colors.urgent}>
              E
            </AppText>
          </GradientRingIcon>
          <AppText variant="body" weight="semibold" color={colors.steel} style={{ flex: 1 }}>
            {t('tabs.today')}
          </AppText>
          <ValuePill value="3.4" status="high" />
        </View>
      </Card>

      <AppText variant="section">{t('gallery.chips')}</AppText>
      <View style={[styles.row, { flexWrap: 'wrap' }]}>
        <StatusChip status="inRange" />
        <StatusChip status="high" />
        <StatusChip status="low" />
        <SyncChip state={{ kind: 'synced', minutes: 2 }} />
        <SyncChip state={{ kind: 'syncing' }} />
      </View>

      <AppText variant="section">{t('gallery.buttons')}</AppText>
      <PrimaryButton label={t('gallery.primary')} />
      <SecondaryButton label={t('gallery.secondary')} />
      <SegmentedPill
        accessibilityLabel="demo"
        value={seg}
        onChange={setSeg}
        segments={[
          { key: 'a', label: t('guide.food') },
          { key: 'b', label: t('guide.medicines') },
        ]}
      />

      <AppText variant="section">{t('gallery.tablets')}</AppText>
      <Card style={[styles.row, { flexWrap: 'wrap', gap: 14 }]}>
        <TabletPicture colour="white" score="half" />
        <TabletPicture colour="pink" />
        <TabletPicture colour="brown" score="quarter" />
        <TabletPicture colour="lavender" shape="oval" score="half" />
        <TabletPicture colour="blue" shape="capsule" />
        <TabletPicture colour="yellow" />
      </Card>

      <AppText variant="section">{t('gallery.states')}</AppText>
      <OfflineBanner />
      <SkeletonList rows={2} />
      <ErrorState onRetry={() => {}} />
      <AppText variant="meta" align="center">
        {isRTL ? 'RTL' : 'LTR'}
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabletChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});
