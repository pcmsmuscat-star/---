import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, Logo, NetworkDecor, Num, PrimaryButton } from '@/components';
import { useT } from '@/i18n';
import { colors, TOUCH_TARGET } from '@/theme/tokens';
import { useLock } from './LockProvider';
import { PIN_MAX_LENGTH, PIN_MIN_LENGTH } from './logic';
import { verifyPin } from './pin';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'] as const;

/** Full-screen lock shown over the app. Digits are never mirrored. */
export function LockScreen() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const { method, unlock } = useLock();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const tryBiometric = useCallback(async () => {
    try {
      const [hardware, enrolled] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);
      if (!hardware || !enrolled) return;
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: t('lock.title') });
      if (result.success) unlock();
    } catch {
      // Biometrics unavailable (e.g. web preview): the PIN pad still works.
    }
  }, [t, unlock]);

  useEffect(() => {
    if (method === 'biometric') void tryBiometric();
  }, [method, tryBiometric]);

  const press = async (k: (typeof KEYS)[number]) => {
    setError(false);
    if (k === 'del') return setPin((p) => p.slice(0, -1));
    if (!k || pin.length >= PIN_MAX_LENGTH) return;
    const next = pin + k;
    setPin(next);
    if (next.length >= PIN_MIN_LENGTH && (await verifyPin(next))) {
      setPin('');
      unlock();
    } else if (next.length === PIN_MAX_LENGTH) {
      setError(true);
      setPin('');
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]} accessibilityViewIsModal>
      <NetworkDecor />
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Logo size={72} />
        <AppText variant="heading" align="center" accessibilityRole="header">
          {t('lock.title')}
        </AppText>
        <AppText variant="body" color={colors.muted} align="center">
          {error ? t('lock.wrongPin') : method === 'pin' ? t('lock.enterPin') : t('lock.body')}
        </AppText>
        <View style={styles.dots} accessibilityLabel={`${pin.length} / ${PIN_MAX_LENGTH}`}>
          {Array.from({ length: PIN_MAX_LENGTH }, (_, i) => (
            <View key={i} style={[styles.dot, i < pin.length && styles.dotOn, error && styles.dotError]} />
          ))}
        </View>
      </View>

      <View style={styles.pad}>
        {KEYS.map((k, i) =>
          k === '' ? (
            <View key={i} style={styles.key} />
          ) : (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={k === 'del' ? t('lock.delete') : k}
              onPress={() => void press(k)}
              style={({ pressed }) => [styles.key, styles.keyButton, pressed && { backgroundColor: colors.tint }]}
            >
              <Num variant="heading" align="center" color={colors.navy}>
                {k === 'del' ? '⌫' : k}
              </Num>
            </Pressable>
          ),
        )}
      </View>

      <PrimaryButton label={t('lock.useBiometric')} onPress={() => void tryBiometric()} style={{ marginHorizontal: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.bg,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  dots: { flexDirection: 'row', gap: 12, marginTop: 8, direction: 'ltr' },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: colors.ringSoft },
  dotOn: { backgroundColor: colors.blue, borderColor: colors.blue },
  dotError: { borderColor: colors.high },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 40,
    direction: 'ltr',
  },
  key: { width: 76, height: 64, minHeight: TOUCH_TARGET, alignItems: 'center', justifyContent: 'center' },
  keyButton: { borderRadius: 20, backgroundColor: colors.surface },
});
