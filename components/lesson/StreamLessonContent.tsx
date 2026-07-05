import { useAuth, useUser } from '@clerk/clerk-expo';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  type Call,
  type User,
} from '@stream-io/video-react-native-sdk';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AgentConnectionBanner } from '@/components/lesson/AgentConnectionBanner';
import { AudioLessonHeader } from '@/components/lesson/AudioLessonHeader';
import { CallSessionBanner } from '@/components/lesson/CallSessionBanner';
import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonDetailsPanel } from '@/components/lesson/LessonDetailsPanel';
import { LessonFeedbackCard } from '@/components/lesson/LessonFeedbackCard';
import { StreamLessonCaptionsContent } from '@/components/lesson/StreamLessonCaptionsContent';
import { TeacherPreview } from '@/components/lesson/TeacherPreview';
import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import { useLessonStreamCall } from '@/components/lesson/useLessonStreamCall';
import { useVisionAgentSession } from '@/components/lesson/useVisionAgentSession';
import { fetchStreamToken } from '@/components/stream/apiClient';
import { colors, fontFamily } from '@/theme';

type StreamLessonContentProps = {
  lessonData: AudioLessonData;
};

export default function StreamLessonContent({ lessonData }: StreamLessonContentProps) {
  return (
    <StreamVideoRoot>
      <StreamLessonScreen lessonData={lessonData} />
    </StreamVideoRoot>
  );
}

function StreamVideoRoot({ children }: { children: ReactNode }) {
  const { getToken, isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const [client, setClient] = useState<StreamVideoClient>();
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [connectAttempt, setConnectAttempt] = useState(0);

  const retryConnect = useCallback(() => {
    setConnectAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) {
      setClient(undefined);
      setConnectionError(null);
      return;
    }

    let cancelled = false;
    let videoClient: StreamVideoClient | undefined;

    const connectStreamUser = async () => {
      setConnectionError(null);

      try {
        const authToken = await getToken();

        if (!authToken) {
          throw new Error('Sign in again to start an audio lesson.');
        }

        const streamUser: User = {
          id: user.id,
          name: user.fullName ?? user.username ?? 'Learner',
          image: user.imageUrl,
        };

        const { token, apiKey } = await fetchStreamToken(authToken);

        if (cancelled) {
          return;
        }

        const tokenProvider = async () => {
          const nextAuthToken = await getToken();

          if (!nextAuthToken) {
            throw new Error('Sign in again to start an audio lesson.');
          }

          const nextTokenResponse = await fetchStreamToken(nextAuthToken);
          return nextTokenResponse.token;
        };

        videoClient = StreamVideoClient.getOrCreateInstance({
          apiKey,
          user: streamUser,
          token,
          tokenProvider,
        });

        setClient(videoClient);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error('[StreamVideoRoot] connectStreamUser failed', error);

        const message =
          error instanceof Error ? error.message : 'Unable to connect to the audio lesson.';

        setConnectionError(message);
        setClient(undefined);
      }
    };

    void connectStreamUser();

    return () => {
      cancelled = true;
      videoClient?.disconnectUser().catch(() => undefined);
      setClient(undefined);
    };
  }, [connectAttempt, getToken, isLoaded, isSignedIn, user?.id]);

  if (!isLoaded) {
    return (
      <View style={rootStyles.centered}>
        <ActivityIndicator color={colors.primary.purple} />
        <Text style={rootStyles.message}>Loading audio lesson...</Text>
      </View>
    );
  }

  if (!isSignedIn || !user?.id) {
    return children;
  }

  if (connectionError) {
    return (
      <View style={rootStyles.centered}>
        <Text style={rootStyles.errorTitle}>Couldn&apos;t connect to audio</Text>
        <Text style={rootStyles.message}>{connectionError}</Text>
        <Pressable onPress={retryConnect} style={rootStyles.retryButton}>
          <Text style={rootStyles.retryLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!client) {
    return (
      <View style={rootStyles.centered}>
        <ActivityIndicator color={colors.primary.purple} />
        <Text style={rootStyles.message}>Connecting to audio lesson...</Text>
      </View>
    );
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}

function StreamLessonScreen({ lessonData }: StreamLessonContentProps) {
  const { lesson, language, primaryGoal, teacherMessage } = lessonData;
  const callSession = useLessonStreamCall({ lessonData });
  const agentSession = useVisionAgentSession({
    callId: callSession.callId,
    callType: callSession.callType,
    enabled: callSession.status === 'joined' || callSession.status === 'muted',
  });
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  const controlsDisabled =
    callSession.status === 'connecting' ||
    callSession.status === 'error' ||
    callSession.status === 'ended';

  const handleEndCall = useCallback(async () => {
    await agentSession.stopAgent();
    await callSession.endCall();
  }, [agentSession, callSession]);

  return (
    <LessonStreamCallProvider call={callSession.call}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AudioLessonHeader
          lessonTitle={`${language.name} • ${lesson.title}`}
          callStatus={callSession.status}
          userName={callSession.userName}
          onBack={() => {
            void handleEndCall();
          }}
        />

        <CallSessionBanner
          status={callSession.status}
          userName={callSession.userName}
          errorMessage={callSession.errorMessage}
          onRetry={callSession.retryJoin}
        />

        <AgentConnectionBanner
          status={agentSession.status}
          errorMessage={agentSession.errorMessage}
          onRetry={agentSession.retryConnect}
        />

        {callSession.status === 'connecting' ? (
          <View style={styles.connectingRow}>
            <ActivityIndicator color={colors.primary.purple} />
            <Text style={styles.connectingText}>Starting audio lesson...</Text>
          </View>
        ) : null}

        {callSession.call ? (
          <StreamLessonCaptionsContent
            lessonData={lessonData}
            subtitlesEnabled={subtitlesEnabled}
            callStatus={callSession.status}
            micEnabled={callSession.micEnabled}
            controlsDisabled={controlsDisabled}
            endCallDisabled={callSession.status === 'connecting'}
            onToggleMic={() => {
              void callSession.toggleMic();
            }}
            onToggleSubtitles={() => setSubtitlesEnabled((current) => !current)}
            onEndCall={() => {
              void handleEndCall();
            }}
          />
        ) : (
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
                void handleEndCall();
              }}
              micDisabled={controlsDisabled}
              endCallDisabled={callSession.status === 'connecting'}
            />

            <LessonFeedbackCard />

            <LessonDetailsPanel
              goal={primaryGoal}
              phrases={lesson.phrases}
              teachingFocus={lesson.aiTeacher.teachingFocus}
              visible
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </LessonStreamCallProvider>
  );
}

function LessonStreamCallProvider({ call, children }: { call: Call | null; children: ReactNode }) {
  if (!call) {
    return children;
  }

  return <StreamCall call={call}>{children}</StreamCall>;
}

const rootStyles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 24,
    gap: 12,
  },
  errorTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  retryLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary.purple,
  },
});

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
  connectingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  connectingText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
  },
});
