import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { AlertIcon, AppText, Card, EmptyState, PhoneIcon, Screen, SymptomsIcon } from '@/components';
import { useT } from '@/i18n';
import { colors, radius } from '@/theme/tokens';

/** [Set per country] Emergency number; Oman uses 9999. Make configurable in More → Contacts (phase 7). */
const EMERGENCY_NUMBER = '9999';

/** Symptoms overview (5.1). The urgent-care box is permanent on this tab. */
export default function SymptomsScreen() {
  const t = useT();
  return (
    <Screen title={t('symptoms.title')}>
      <Card style={{ gap: 12 }}>
        <View style={styles.urgentRow}>
          <View style={styles.urgentIcon}>
            <AlertIcon color={colors.urgent} size={22} strokeWidth={2} />
          </View>
          <AppText variant="body" color="#5A1A12" style={{ flex: 1 }}>
            {t('symptoms.urgent')}
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('symptoms.callEmergency')}
          onPress={() => void Linking.openURL(`tel:${EMERGENCY_NUMBER}`)}
          style={({ pressed }) => [styles.urgentButton, { opacity: pressed ? 0.85 : 1 }]}
        >
          <PhoneIcon color={colors.white} size={18} strokeWidth={2.2} />
          <AppText variant="button">{t('symptoms.callEmergency')}</AppText>
        </Pressable>
      </Card>
      <EmptyState
        icon={<SymptomsIcon color={colors.blue} size={28} />}
        title={t('symptoms.emptyTitle')}
        body={t('symptoms.emptyBody')}
        actionLabel={t('symptoms.report')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  urgentRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  urgentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.urgentBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgentButton: {
    minHeight: 52,
    borderRadius: radius.input,
    backgroundColor: colors.urgent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
