import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '@/theme';

type AuthPrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export function AuthPrimaryButton({ label, onPress }: AuthPrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

type AuthDividerProps = {
  label?: string;
};

export function AuthDivider({ label = 'or continue with' }: AuthDividerProps) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

type AuthFooterLinkProps = {
  prompt: string;
  linkLabel: string;
  onPress: () => void;
};

export function AuthFooterLink({ prompt, linkLabel, onPress }: AuthFooterLinkProps) {
  return (
    <View style={styles.footerRow}>
      <Text style={styles.footerPrompt}>{prompt} </Text>
      <Pressable onPress={onPress}>
        <Text style={styles.footerLink}>{linkLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.purple,
    borderRadius: 16,
    paddingVertical: 16,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutral.background,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  footerPrompt: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
  },
  footerLink: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 22,
    color: colors.primary.purple,
  },
});
