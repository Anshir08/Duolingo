import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AudioLessonHeader } from '@/components/lesson/AudioLessonHeader';
import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonDetailsPanel } from '@/components/lesson/LessonDetailsPanel';
import { LessonFeedbackCard } from '@/components/lesson/LessonFeedbackCard';
import { TeacherPreview } from '@/components/lesson/TeacherPreview';
import { getAudioLessonData } from '@/components/lesson/useAudioLessonData';
import { colors, fontFamily } from '@/theme';

export default function AudioLessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lessonResult = useMemo(() => getAudioLessonData(id), [id]);
  const [micEnabled, setMicEnabled] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  if (lessonResult.status === 'not-found') {
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

  const { lesson, language, primaryGoal, teacherMessage } = lessonResult.data;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AudioLessonHeader
        lessonTitle={`${language.name} • ${lesson.title}`}
        onBack={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TeacherPreview
          message={teacherMessage}
          languageName={language.name}
          teachingFocus={lesson.aiTeacher.teachingFocus}
        />

        <LessonControls
          micEnabled={micEnabled}
          subtitlesEnabled={subtitlesEnabled}
          onToggleMic={() => setMicEnabled((current) => !current)}
          onToggleSubtitles={() => setSubtitlesEnabled((current) => !current)}
          onEndCall={() => router.back()}
        />

        <LessonFeedbackCard />

        <LessonDetailsPanel
          goal={primaryGoal}
          phrases={lesson.phrases}
          teachingFocus={lesson.aiTeacher.teachingFocus}
          visible={subtitlesEnabled}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 24,
    gap: 12,
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
