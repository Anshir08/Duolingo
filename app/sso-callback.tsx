import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { colors } from '@/theme';

export default function SSOCallbackScreen() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary.purple} />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return <Redirect href="/sign-in" />;
}
