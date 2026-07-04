import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Tabs } from 'expo-router';

import { CustomTabBar } from '@/components/navigation/CustomTabBar';
import type { CustomTabBarProps } from '@/components/navigation/CustomTabBar';
import { useLanguageStore } from '@/store/languageStore';

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...(props as CustomTabBarProps)} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
      <Tabs.Screen name="ai-teacher" options={{ title: 'AI Teacher' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
