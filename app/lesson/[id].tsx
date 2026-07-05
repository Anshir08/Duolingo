import { lazy, Suspense, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { OfflineAudioLessonContent } from '@/components/lesson/OfflineAudioLessonContent';
import { StreamLessonErrorBoundary } from '@/components/lesson/StreamLessonErrorBoundary';
import { useLessonAnalytics } from '@/components/lesson/useLessonAnalytics';
import { getAudioLessonData } from '@/components/lesson/useAudioLessonData';
import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import { canUseStreamVideo } from '@/components/stream/streamRuntime';
import { colors, fontFamily } from '@/theme';

const StreamLessonContent = lazy(() => import('@/components/lesson/StreamLessonContent'));

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [streamLoadKey, setStreamLoadKey] = useState(0);
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
    <StreamLessonErrorBoundary
      key={streamLoadKey}
      fallback={(retry) => (
        <StreamLessonLoadFallback
          lessonData={lessonResult.data}
          onRetry={() => {
            setStreamLoadKey((current) => current + 1);
            retry();
          }}
        />
      )}
    >
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
    </StreamLessonErrorBoundary>
  );
}

type StreamLessonLoadFallbackProps = {
  lessonData: AudioLessonData;
  onRetry: () => void;
};

function StreamLessonLoadFallback({ lessonData, onRetry }: StreamLessonLoadFallbackProps) {
  const [useOfflineFallback, setUseOfflineFallback] = useState(false);

  if (useOfflineFallback) {
    return <OfflineAudioLessonContent lessonData={lessonData} />;
  }

  return (
    <View style={styles.loading}>
      <Text style={styles.errorTitle}>Couldn&apos;t load live lesson</Text>
      <Text style={styles.errorMessage}>
        The live lesson module failed to load. Retry or continue in preview mode.
      </Text>
      <Pressable onPress={onRetry} style={styles.backButton}>
        <Text style={styles.backLabel}>Retry</Text>
      </Pressable>
      <Pressable onPress={() => setUseOfflineFallback(true)} style={styles.secondaryButton}>
        <Text style={styles.secondaryLabel}>Continue in preview mode</Text>
      </Pressable>
    </View>
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
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
  },
});
