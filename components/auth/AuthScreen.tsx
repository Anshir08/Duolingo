import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AuthDivider,
  AuthFooterLink,
  AuthPrimaryButton,
} from '@/components/auth/AuthElements';
import { AuthInput } from '@/components/auth/AuthInput';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import type { AuthMode } from '@/components/auth/types';
import { useClerkEmailAuth } from '@/components/auth/useClerkEmailAuth';
import { VerificationModal } from '@/components/auth/VerificationModal';
import { colors, fontFamily } from '@/theme';

type AuthScreenProps = {
  mode: AuthMode;
};

const copy: Record<
  AuthMode,
  {
    title: string;
    subtitle: string;
    primaryLabel: string;
    footerPrompt: string;
    footerLinkLabel: string;
    footerRoute: '/sign-in' | '/sign-up';
  }
> = {
  'sign-up': {
    title: 'Create your account',
    subtitle: 'Start your language journey today ✨',
    primaryLabel: 'Sign Up',
    footerPrompt: 'Already have an account?',
    footerLinkLabel: 'Log in',
    footerRoute: '/sign-in',
  },
  'sign-in': {
    title: 'Welcome back',
    subtitle: 'Sign in to continue your language journey ✨',
    primaryLabel: 'Sign In',
    footerPrompt: "Don't have an account?",
    footerLinkLabel: 'Sign up',
    footerRoute: '/sign-up',
  },
};

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const content = copy[mode];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { startAuth, verifyCode, startSocialAuth, isLoading, getClerkErrorMessage } =
    useClerkEmailAuth(mode);

  const handlePrimaryPress = async () => {
    setAuthError(null);

    try {
      await startAuth(email.trim(), mode === 'sign-up' ? password : undefined);
      setVerificationVisible(true);
    } catch (error) {
      setAuthError(getClerkErrorMessage(error));
    }
  };

  const handleSocialPress = async (provider: Parameters<typeof startSocialAuth>[0]) => {
    setAuthError(null);

    try {
      await startSocialAuth(provider);
    } catch (error) {
      setAuthError(getClerkErrorMessage(error));
    }
  };

  const handleVerifyCode = async (code: string) => {
    setAuthError(null);

    try {
      await verifyCode(code);
      setVerificationVisible(false);
    } catch (error) {
      setAuthError(getClerkErrorMessage(error));
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>

        <View style={styles.illustrationWrap}>
          <Text style={[styles.star, styles.starLeft]}>✦</Text>
          <Text style={[styles.star, styles.starRight]}>✦</Text>
          <Image
            source={require('@/assets/images/mascot-auth.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>

        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {mode === 'sign-up' ? (
          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showToggle
          />
        ) : null}

        {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

        <AuthPrimaryButton
          label={isLoading ? 'Please wait...' : content.primaryLabel}
          onPress={handlePrimaryPress}
        />

        {isLoading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary.purple} />
          </View>
        ) : null}

        <AuthDivider />

        <SocialAuthButtons onPress={handleSocialPress} disabled={isLoading} />

        <AuthFooterLink
          prompt={content.footerPrompt}
          linkLabel={content.footerLinkLabel}
          onPress={() => router.push(content.footerRoute)}
        />

        {mode === 'sign-up' ? <View nativeID="clerk-captcha" /> : null}
      </ScrollView>

      <VerificationModal
        visible={verificationVisible}
        onClose={() => setVerificationVisible(false)}
        onComplete={handleVerifyCode}
        errorMessage={authError}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 4,
  },
  backIcon: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.neutral.textPrimary,
  },
  title: {
    marginTop: 8,
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.neutral.textPrimary,
  },
  subtitle: {
    marginTop: 8,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginTop: 8,
    marginBottom: 8,
  },
  mascot: {
    width: 160,
    height: 160,
  },
  star: {
    position: 'absolute',
    fontSize: 18,
    color: colors.semantic.warning,
  },
  starLeft: {
    top: 24,
    left: 72,
    color: colors.semantic.warning,
  },
  starRight: {
    top: 40,
    right: 72,
    color: colors.primary.blue,
  },
  errorText: {
    marginTop: -4,
    marginBottom: 8,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.semantic.error,
  },
  loadingRow: {
    alignItems: 'center',
    marginTop: 12,
  },
});
