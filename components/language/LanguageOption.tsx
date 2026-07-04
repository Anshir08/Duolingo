import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Language } from '@/types/learning';
import { colors, fontFamily } from '@/theme';

type LanguageOptionProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageOption({ language, selected, onPress }: LanguageOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && styles.rowPressed,
      ]}
    >
      <View style={styles.flagWrap}>
        <Text style={styles.flag}>{language.flagEmoji}</Text>
      </View>

      <View style={styles.copy}>
        <Text style={styles.name}>{language.name}</Text>
        <Text style={styles.learners}>{language.learnersLabel}</Text>
      </View>

      {selected ? (
        <View style={styles.checkWrap}>
          <Text style={styles.check}>✓</Text>
        </View>
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  rowSelected: {
    borderColor: colors.primary.purple,
  },
  rowPressed: {
    opacity: 0.92,
  },
  flagWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    fontSize: 22,
  },
  copy: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
  learners: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
    marginTop: 2,
  },
  checkWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 16,
    color: colors.neutral.background,
  },
  chevron: {
    fontSize: 22,
    lineHeight: 24,
    color: colors.neutral.textSecondary,
  },
});
