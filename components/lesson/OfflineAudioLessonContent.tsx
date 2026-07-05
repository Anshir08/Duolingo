import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AudioLessonHeader } from '@/components/lesson/AudioLessonHeader';
import { CallSessionBanner } from '@/components/lesson/CallSessionBanner';
import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonDetailsPanel } from '@/components/lesson/LessonDetailsPanel';
import { LessonFeedbackCard } from '@/components/lesson/LessonFeedbackCard';
import { TeacherPreview } from '@/components/lesson/TeacherPreview';
import { useOfflineLessonCall } from '@/components/lesson/useOfflineLessonCall';
import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import { colors } from '@/theme';

type OfflineAudioLessonContentProps = {
  lessonData: AudioLessonData;
};

export function OfflineAudioLessonContent({ lessonData }: OfflineAudioLessonContentProps) {
  const router = useRouter();
  const { lesson, language, primaryGoal, teacherMessage } = lessonData;
  const callSession = useOfflineLessonCall();
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AudioLessonHeader
        lessonTitle={`${language.name} • ${lesson.title}`}
        callStatus={callSession.status}
        userName={callSession.userName}
        onBack={() => router.back()}
      />

      <CallSessionBanner
        status={callSession.status}
        userName={callSession.userName}
        errorMessage={callSession.errorMessage}
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
          micEnabled={callSession.micEnabled}
          subtitlesEnabled={subtitlesEnabled}
          onToggleMic={() => {
            void callSession.toggleMic();
          }}
          onToggleSubtitles={() => setSubtitlesEnabled((current) => !current)}
          onEndCall={() => {
            void callSession.endCall();
          }}
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
});
