import { useUser } from '@clerk/clerk-expo';
import { ScrollView, StyleSheet } from 'react-native';

import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonDetailsPanel } from '@/components/lesson/LessonDetailsPanel';
import { LessonFeedbackCard } from '@/components/lesson/LessonFeedbackCard';
import { LiveCaptionsTranscript } from '@/components/lesson/LiveCaptionsTranscript';
import { TeacherPreview } from '@/components/lesson/TeacherPreview';
import { UserSpeechBubble } from '@/components/lesson/UserSpeechBubble';
import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import { useLiveLessonCaptions } from '@/components/lesson/useLiveLessonCaptions';
import type { LessonCallStatus } from '@/components/stream/constants';

type StreamLessonCaptionsContentProps = {
  lessonData: AudioLessonData;
  subtitlesEnabled: boolean;
  callStatus: LessonCallStatus;
  micEnabled: boolean;
  controlsDisabled: boolean;
  endCallDisabled: boolean;
  onToggleMic: () => void;
  onToggleSubtitles: () => void;
  onEndCall: () => void;
};

export function StreamLessonCaptionsContent({
  lessonData,
  subtitlesEnabled,
  callStatus,
  micEnabled,
  controlsDisabled,
  endCallDisabled,
  onToggleMic,
  onToggleSubtitles,
  onEndCall,
}: StreamLessonCaptionsContentProps) {
  const { user } = useUser();
  const { lesson, language, primaryGoal, teacherMessage } = lessonData;
  const captionsActive =
    subtitlesEnabled && (callStatus === 'joined' || callStatus === 'muted');
  const { entries, latestTeacherCaption, latestUserCaption } = useLiveLessonCaptions(
    captionsActive,
    user?.id,
  );

  const teacherBubbleText = latestTeacherCaption || teacherMessage;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <TeacherPreview
        message={teacherBubbleText}
        languageName={language.name}
        teachingFocus={lesson.aiTeacher.teachingFocus}
        isLiveCaption={Boolean(latestTeacherCaption)}
      />

      <UserSpeechBubble caption={latestUserCaption} visible={captionsActive} />

      <LessonControls
        micEnabled={micEnabled}
        subtitlesEnabled={subtitlesEnabled}
        onToggleMic={onToggleMic}
        onToggleSubtitles={onToggleSubtitles}
        onEndCall={onEndCall}
        micDisabled={controlsDisabled}
        endCallDisabled={endCallDisabled}
      />

      <LiveCaptionsTranscript entries={entries} visible={captionsActive} />

      <LessonFeedbackCard />

      <LessonDetailsPanel
        goal={primaryGoal}
        phrases={lesson.phrases}
        teachingFocus={lesson.aiTeacher.teachingFocus}
        visible
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
