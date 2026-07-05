import '../global.css';

import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { PostHogIdentitySync } from '@/components/analytics/PostHogIdentitySync';
import { fontFamily, poppinsFontFiles } from '@/theme/fonts';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file');
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [fontFamily.regular]: poppinsFontFiles[0],
    [fontFamily.medium]: poppinsFontFiles[1],
    [fontFamily.semibold]: poppinsFontFiles[2],
    [fontFamily.bold]: poppinsFontFiles[3],
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <PostHogIdentitySync />
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="language-selection" />
            <Stack.Screen name="lesson/[id]" />
            <Stack.Screen name="sso-callback" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
          </Stack>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
