import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AudioLessonHeader } from '@/components/lesson/AudioLessonHeader';
import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonDetailsPanel } from '@/components/lesson/LessonDetailsPanel';
import { LessonFeedbackCard } from '@/components/lesson/LessonFeedbackCard';
import { TeacherPreview } from '@/components/lesson/TeacherPreview';
import { getAudioLessonData } from '@/components/lesson/useAudioLessonData';
import { colors } from '@/theme';

export default function AudioLessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lessonData = useMemo(() => (id ? getAudioLessonData(id) : null), [id]);
  const [micEnabled, setMicEnabled] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  if (!lessonData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary.purple} />
      </View>
    );
  }

  const { lesson, language, primaryGoal, teacherMessage } = lessonData;

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
  },
});
