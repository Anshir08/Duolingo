import { lazy, Suspense, useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { OfflineAudioLessonContent } from '@/components/lesson/OfflineAudioLessonContent';
import { useLessonAnalytics } from '@/components/lesson/useLessonAnalytics';
import { getAudioLessonData } from '@/components/lesson/useAudioLessonData';
import { canUseStreamVideo } from '@/components/stream/streamRuntime';
import { colors, fontFamily } from '@/theme';

const StreamLessonContent = lazy(() => import('@/components/lesson/StreamLessonContent'));

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lessonResult = useMemo(() => getAudioLessonData(id), [id]);
  const lessonData = lessonResult.status === 'found' ? lessonResult.data : null;

  useLessonAnalytics(lessonData);

  if (lessonResult.status === 'not-found') {
    return <LessonNotFound />;
  }

  if (!canUseStreamVideo()) {
    return <OfflineAudioLessonContent lessonData={lessonResult.data} />;
  }

  return (
    <Suspense
      fallback={
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary.purple} />
          <Text style={styles.loadingText}>Loading audio lesson...</Text>
        </View>
      }
    >
      <StreamLessonContent lessonData={lessonResult.data} />
    </Suspense>
  );
}

function LessonNotFound() {
  const router = useRouter();

  return (
    <View style={styles.loading}>
      <Text style={styles.errorTitle}>Lesson not found</Text>
      <Text style={styles.errorMessage}>
        This lesson is unavailable or the link is invalid.
      </Text>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backLabel}>Go back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 24,
    gap: 12,
  },
  loadingText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
  },
  errorTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.neutral.textPrimary,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  backButton: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary.purple,
  },
});
