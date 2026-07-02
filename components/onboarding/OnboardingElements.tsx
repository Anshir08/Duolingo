import { Image, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { colors, fontFamily } from '@/theme';

type SpeechBubbleProps = {
  label: string;
  backgroundColor: string;
  textColor: string;
  style: ViewStyle;
};

export function SpeechBubble({ label, backgroundColor, textColor, style }: SpeechBubbleProps) {
  return (
    <View style={[styles.bubble, { backgroundColor }, style]}>
      <Text style={[styles.bubbleText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

type BrandHeaderProps = {
  name?: string;
};

export function BrandHeader({ name = 'muolingo' }: BrandHeaderProps) {
  return (
    <View style={styles.brandRow}>
      <Image
        source={require('@/assets/images/moscot-logo.png')}
        style={styles.brandLogo}
        resizeMode="contain"
      />
      <Text style={styles.brandName}>{name}</Text>
    </View>
  );
}

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      <Text style={styles.buttonText}>{label}</Text>
      <Text style={styles.buttonChevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: {
    width: 36,
    height: 36,
  },
  brandName: {
    marginLeft: 8,
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.neutral.textPrimary,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 2,
  },
  bubbleText: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.purple,
    borderRadius: 16,
    paddingVertical: 16,
    position: 'relative',
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
  buttonChevron: {
    position: 'absolute',
    right: 24,
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 24,
    color: colors.neutral.background,
  },
});
