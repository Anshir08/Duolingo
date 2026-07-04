import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '@/theme';

const feedbackItems = [
  { label: 'Speaking', value: 'Excellent', color: colors.primary.green },
  { label: 'Pronunciation', value: 'Great', color: colors.primary.blue },
  { label: 'Grammar', value: 'Good', color: colors.primary.purple },
] as const;

export function LessonFeedbackCard() {
  return (
    <View style={styles.card}>
      {feedbackItems.map((item, index) => (
        <View key={item.label} style={styles.itemWrap}>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <Text style={[styles.itemValue, { color: item.color }]}>{item.value}</Text>
          {index < feedbackItems.length - 1 ? <View style={styles.divider} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 18,
    shadowColor: colors.neutral.textPrimary,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemWrap: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  itemLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
    marginBottom: 6,
  },
  itemValue: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
  },
  divider: {
    position: 'absolute',
    right: 0,
    top: 8,
    bottom: 8,
    width: 1,
    backgroundColor: colors.neutral.border,
  },
});
