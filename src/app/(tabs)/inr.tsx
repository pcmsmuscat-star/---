import { Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText, EmptyState, InrIcon, PlusIcon, Screen } from '@/components';
import { useLanguage, useT } from '@/i18n';
import { colors, gradient } from '@/theme/tokens';

/** INR overview (4.1). Chart and results list arrive in phase 4. */
export default function InrScreen() {
  const t = useT();
  const { isRTL } = useLanguage();
  const addButton = (
    <Pressable accessibilityRole="button" accessibilityLabel={t('inr.add')}>
      <LinearGradient
        colors={gradient}
        start={{ x: isRTL ? 1 : 0, y: 0 }}
        end={{ x: isRTL ? 0 : 1, y: 1 }}
        style={{ minHeight: 48, borderRadius: 999, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', gap: 6 }}
      >
        <PlusIcon color={colors.white} size={18} strokeWidth={2.6} />
        <AppText variant="bodyStrong" color={colors.white}>
          {t('inr.add')}
        </AppText>
      </LinearGradient>
    </Pressable>
  );
  return (
    <Screen title={t('inr.title')} headerRight={addButton}>
      <EmptyState
        icon={<InrIcon color={colors.blue} size={28} />}
        title={t('inr.emptyTitle')}
        body={t('inr.emptyBody')}
        actionLabel={t('inr.add')}
      />
    </Screen>
  );
}
