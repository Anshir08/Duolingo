import { StyleSheet, Text, View } from 'react-native';

import type { PhraseItem } from '@/types/learning';
import { colors, fontFamily } from '@/theme';

type LessonDetailsPanelProps = {
  goal: string;
  phrases: PhraseItem[];
  teachingFocus: string;
  visible: boolean;
};

export function LessonDetailsPanel({
  goal,
  phrases,
  teachingFocus,
  visible,
}: LessonDetailsPanelProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>Lesson goal</Text>
      <Text style={styles.goal}>{goal}</Text>

      <Text style={styles.sectionLabel}>AI teacher focus</Text>
      <Text style={styles.focus}>{teachingFocus}</Text>

      <Text style={styles.sectionLabel}>Phrases</Text>
      {phrases.map((phrase) => (
        <View key={phrase.id} style={styles.phraseRow}>
          <Text style={styles.phrase}>{phrase.phrase}</Text>
          <Text style={styles.translation}>{phrase.translation}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: colors.neutral.surface,
    borderRadius: 18,
    padding: 16,
  },
  sectionLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
    marginBottom: 6,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  goal: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textPrimary,
    marginBottom: 8,
  },
  focus: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textPrimary,
    marginBottom: 8,
  },
  phraseRow: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  phrase: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
  translation: {
    marginTop: 2,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
  },
});
