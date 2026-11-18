import JSTabs from 'expo-router/tabs';
import { TabBar } from '@/components';
import { useT } from '@/i18n';

export default function TabsLayout() {
  const t = useT();
  return (
    <JSTabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <JSTabs.Screen name="index" options={{ title: t('tabs.today') }} />
      <JSTabs.Screen name="inr" options={{ title: t('tabs.inr') }} />
      <JSTabs.Screen name="symptoms" options={{ title: t('tabs.symptoms') }} />
      <JSTabs.Screen name="guide" options={{ title: t('tabs.guide') }} />
      <JSTabs.Screen name="more" options={{ title: t('tabs.more') }} />
    </JSTabs>
  );
}
