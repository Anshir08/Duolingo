import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { SocialProvider } from '@/components/auth/types';
import { colors, fontFamily } from '@/theme';

type SocialAuthButtonProps = {
  provider: SocialProvider;
  onPress?: (provider: SocialProvider) => void;
  disabled?: boolean;
};

const providerConfig: Record<SocialProvider, { label: string }> = {
  google: { label: 'Continue with Google' },
  facebook: { label: 'Continue with Facebook' },
  apple: { label: 'Continue with Apple' },
};

function SocialIcon({ provider }: { provider: SocialProvider }) {
  if (provider === 'google') {
    return (
      <View style={styles.googleIconWrap}>
        <Text style={styles.googleIcon}>G</Text>
      </View>
    );
  }

  if (provider === 'facebook') {
    return (
      <View style={[styles.iconCircle, styles.facebookCircle]}>
        <Text style={styles.facebookIcon}>f</Text>
      </View>
    );
  }

  return (
    <View style={[styles.iconCircle, styles.appleCircle]}>
      <Text style={styles.appleIcon}>&#63743;</Text>
    </View>
  );
}

export function SocialAuthButton({ provider, onPress, disabled }: SocialAuthButtonProps) {
  const config = providerConfig[provider];

  return (
    <Pressable
      onPress={() => onPress?.(provider)}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <View style={styles.iconSlot}>
        <SocialIcon provider={provider} />
      </View>
      <Text style={styles.label}>{config.label}</Text>
    </Pressable>
  );
}

export function SocialAuthButtons({
  onPress,
  disabled,
}: {
  onPress?: (provider: SocialProvider) => void;
  disabled?: boolean;
}) {
  return (
    <View>
      <SocialAuthButton provider="google" onPress={onPress} disabled={disabled} />
      <View style={styles.spacer} />
      <SocialAuthButton provider="facebook" onPress={onPress} disabled={disabled} />
      <View style={styles.spacer} />
      <SocialAuthButton provider="apple" onPress={onPress} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.neutral.background,
    position: 'relative',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  iconSlot: {
    position: 'absolute',
    left: 16,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookCircle: {
    backgroundColor: '#1877F2',
  },
  appleCircle: {
    backgroundColor: '#0D132B',
  },
  googleIconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: '#4285F4',
  },
  facebookIcon: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  appleIcon: {
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
  },
});
