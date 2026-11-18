import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AppText, Card, ChevronIcon, GlobeIcon, GradientRingIcon, LockIcon, MoreIcon, Screen, GuideIcon } from '@/components';
import { useLanguage, useT } from '@/i18n';
import { useLock } from '@/lock/LockProvider';
import { colors } from '@/theme/tokens';

function Row({
  icon,
  label,
  value,
  onPress,
  last,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  last?: boolean;
}) {
  const { isRTL } = useLanguage();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, !last && styles.divider, pressed && { opacity: 0.7 }]}
    >
      <GradientRingIcon size={40}>{icon}</GradientRingIcon>
      <AppText variant="body" weight="semibold" color={colors.steel} style={{ flex: 1 }}>
        {label}
      </AppText>
      {value ? (
        <AppText variant="meta" weight="semibold">
          {value}
        </AppText>
      ) : null}
      <ChevronIcon flip={isRTL} size={16} color={colors.muted} strokeWidth={2} />
    </Pressable>
  );
}

/** More (7.1). Phase 1: language switch, app-lock status, design gallery, disclaimer. */
export default function MoreScreen() {
  const t = useT();
  const { language, setLanguage } = useLanguage();
  const { enabled } = useLock();
  return (
    <Screen title={t('more.title')}>
      <Card style={{ paddingVertical: 4 }}>
        <Row
          icon={<GlobeIcon color={colors.blue} size={18} />}
          label={t('more.language')}
          value={language === 'ar' ? 'العربية' : 'English'}
          onPress={() => void setLanguage(language === 'ar' ? 'en' : 'ar')}
        />
        <Row
          icon={<LockIcon color={colors.blue} size={18} />}
          label={t('more.appLock')}
          value={enabled ? '✓' : '—'}
        />
        <Row
          icon={<MoreIcon color={colors.blue} size={18} />}
          label={t('more.gallery')}
          onPress={() => router.push('/gallery')}
        />
        <Row icon={<GuideIcon color={colors.blue} size={18} />} label={t('more.about')} last />
      </Card>
      <View style={{ paddingHorizontal: 12 }}>
        <AppText variant="meta" align="center">
          {t('more.disclaimer')}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 60 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
