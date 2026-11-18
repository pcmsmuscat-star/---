import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider, useLanguage } from '@/i18n';
import { LockProvider, useLock } from '@/lock/LockProvider';
import { LockScreen } from '@/lock/LockScreen';
import { fontAssets } from '@/theme/fonts';
import { colors } from '@/theme/tokens';

void SplashScreen.preventAutoHideAsync();

function Shell() {
  const { isRTL, ready } = useLanguage();
  const { locked } = useLock();
  const [fontsLoaded] = useFonts(fontAssets);
  const show = fontsLoaded && ready;

  useEffect(() => {
    if (show) void SplashScreen.hideAsync();
  }, [show]);

  if (!show) return null;

  return (
    // `direction` mirrors every row, margin and position below it when Arabic is on,
    // so switching language takes effect immediately without a restart.
    <View style={{ flex: 1, direction: isRTL ? 'rtl' : 'ltr', backgroundColor: colors.bg }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="gallery" options={{ presentation: 'card' }} />
      </Stack>
      {locked && <LockScreen />}
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <LockProvider>
          <Shell />
        </LockProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
