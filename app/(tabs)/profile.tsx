import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

import { TabPlaceholderScreen } from '@/components/navigation/TabPlaceholderScreen';
import { clearLanguageStorage, useLanguageStore } from '@/store/languageStore';
import { colors, fontFamily } from '@/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isClearingStorage, setIsClearingStorage] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      await signOut();
    } catch {
      // Clerk may reject once the session is already cleared.
    } finally {
      setIsSigningOut(false);
    }

    router.replace('/onboarding');
  };

  const handleClearLanguageStorage = async () => {
    if (isClearingStorage) {
      return;
    }

    setIsClearingStorage(true);

    try {
      await clearLanguageStorage();
      router.replace('/language-selection');
    } finally {
      setIsClearingStorage(false);
    }
  };

  return (
    <TabPlaceholderScreen
      title="Profile"
      subtitle="Manage your learning language or sign out of your account."
    >
      <View style={styles.actions}>
        {selectedLanguageId ? (
          <Text style={styles.meta}>Selected language: {selectedLanguageId}</Text>
        ) : null}

        <Link href="/language-selection" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonLabelPurple}>Choose a Language</Text>
          </Pressable>
        </Link>

        <Pressable
          onPress={handleClearLanguageStorage}
          disabled={isClearingStorage}
          style={[styles.button, isClearingStorage && styles.buttonDisabled]}
        >
          <Text style={styles.buttonLabelMuted}>
            {isClearingStorage ? 'Clearing...' : 'Clear language storage (test)'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSignOut}
          disabled={isSigningOut}
          style={[styles.button, isSigningOut && styles.buttonDisabled]}
        >
          <Text style={styles.buttonLabelMuted}>{isSigningOut ? 'Signing out...' : 'Log out'}</Text>
        </Pressable>
      </View>
    </TabPlaceholderScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    width: '100%',
    marginTop: 32,
    gap: 12,
  },
  meta: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonLabelPurple: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary.purple,
  },
  buttonLabelMuted: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
  },
});
