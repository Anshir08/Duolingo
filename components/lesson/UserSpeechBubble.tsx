import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '@/theme';

type UserSpeechBubbleProps = {
  caption: string;
  visible: boolean;
};

export function UserSpeechBubble({ caption, visible }: UserSpeechBubbleProps) {
  if (!visible || !caption) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>You said</Text>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#EAF2FF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D6E8FF',
    gap: 4,
  },
  label: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.primary.blue,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  caption: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
});
