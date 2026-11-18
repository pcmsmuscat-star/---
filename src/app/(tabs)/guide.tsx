import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, GradientCard, NetworkDecor, Screen, SegmentedPill } from '@/components';
import { useT } from '@/i18n';
import { colors } from '@/theme/tokens';

/** Guide home (6.1). Bilingual, pharmacist-reviewed content arrives in phase 6. */
export default function GuideScreen() {
  const t = useT();
  const [section, setSection] = useState<'food' | 'medicines'>('food');
  return (
    <Screen title={t('guide.title')}>
      <SegmentedPill
        accessibilityLabel={t('guide.title')}
        value={section}
        onChange={setSection}
        segments={[
          { key: 'food', label: t('guide.food') },
          { key: 'medicines', label: t('guide.medicines') },
        ]}
      />
      <GradientCard>
        <NetworkDecor onGradient />
        <View style={styles.keyRow}>
          <View style={styles.infoBadge}>
            <AppText variant="bodyStrong" weight="extrabold" color={colors.navy} align="center">
              i
            </AppText>
          </View>
          <AppText variant="body" color={colors.white} style={{ flex: 1 }}>
            {section === 'food' ? t('guide.foodKey') : t('guide.medKey')}
          </AppText>
        </View>
      </GradientCard>
      <AppText variant="meta" align="center">
        {t('guide.comingSoon')}
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  infoBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
