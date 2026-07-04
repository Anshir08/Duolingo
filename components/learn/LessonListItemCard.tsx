import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import type { LessonDisplayStatus } from '@/components/learn/lessonProgress';
import type { Lesson } from '@/types/learning';
import { colors, fontFamily, lessonImages } from '@/theme';

type LessonListItemProps = {
  lesson: Lesson;
  lessonNumber: number;
  status: LessonDisplayStatus;
  totalLessons: number;
  onPress: () => void;
};

export function LessonListItemCard({
  lesson,
  lessonNumber,
  status,
  totalLessons,
  onPress,
}: LessonListItemProps) {
  const thumbnail = lessonImages[lesson.imageKey];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        status === 'in_progress' && styles.cardActive,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.copy}>
        <Text style={styles.title}>
          Lesson {lessonNumber}: {lesson.title}
        </Text>

        {status === 'in_progress' ? (
          <Text style={styles.inProgress}>In progress</Text>
        ) : null}

        {status === 'upcoming' ? (
          <Text style={styles.meta}>0 / {totalLessons} lessons</Text>
        ) : null}
      </View>

      {status === 'completed' ? (
        <View style={styles.completedBadge}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      ) : null}

      {status === 'in_progress' && thumbnail ? (
        <Image source={thumbnail} style={styles.thumbnail} resizeMode="contain" />
      ) : null}

      {status === 'upcoming' ? (
        <View style={styles.lockWrap}>
          <SymbolView
            name={{ ios: 'lock.fill', android: 'lock', web: 'lock' }}
            size={18}
            tintColor={colors.neutral.textSecondary}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: colors.neutral.textPrimary,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardActive: {
    borderColor: colors.primary.purple,
    borderWidth: 2,
  },
  cardPressed: {
    opacity: 0.94,
  },
  copy: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.neutral.textPrimary,
  },
  inProgress: {
    marginTop: 4,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary.purple,
  },
  meta: {
    marginTop: 4,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 18,
    color: colors.neutral.background,
  },
  thumbnail: {
    width: 44,
    height: 44,
  },
  lockWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
