import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Language, Lesson, Unit } from '@/types/learning';
import { colors, fontFamily, images, lessonImages } from '@/theme';

type ContinueLearningCardProps = {
  language: Language;
  unit: Unit;
  lesson: Lesson;
  levelLabel: string;
};

export function ContinueLearningCard({
  language,
  unit,
  lesson,
  levelLabel,
}: ContinueLearningCardProps) {
  const illustration = lessonImages[lesson.imageKey] ?? images.palace;

  return (
    <View style={styles.card}>
      <View style={styles.gradientGlow} />
      <View style={styles.content}>
        <Text style={styles.label}>Continue learning</Text>
        <Text style={styles.language}>{language.name}</Text>
        <Text style={styles.unit}>
          {levelLabel} • Unit {unit.order}
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonLabel}>Continue</Text>
        </Pressable>
      </View>

      <Image source={illustration} style={styles.illustration} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: colors.primary.purple,
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 168,
    marginBottom: 24,
  },
  gradientGlow: {
    position: 'absolute',
    right: -30,
    top: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primary.blue,
    opacity: 0.45,
  },
  content: {
    maxWidth: '58%',
    zIndex: 1,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  language: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.neutral.background,
    marginBottom: 4,
  },
  unit: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.neutral.background,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary.purple,
  },
  illustration: {
    position: 'absolute',
    right: 8,
    bottom: 0,
    width: 130,
    height: 130,
  },
});
