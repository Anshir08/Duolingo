import { useAuth, useUser } from '@clerk/clerk-expo';
import {
  CallingState,
  useStreamVideoClient,
  type Call,
} from '@stream-io/video-react-native-sdk';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import { createLessonCall } from '@/components/stream/apiClient';
import { buildCreateLessonCallPayload } from '@/components/stream/lessonCallPayload';
import type { LessonCallStatus } from '@/components/stream/constants';

type UseLessonStreamCallOptions = {
  lessonData: AudioLessonData;
};

export function useLessonStreamCall({ lessonData }: UseLessonStreamCallOptions) {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const { lesson, language } = lessonData;
  const primaryGoal = lessonData.primaryGoal;

  const [call, setCall] = useState<Call | null>(null);
  const [callId, setCallId] = useState<string | null>(null);
  const [callType, setCallType] = useState<string | null>(null);
  const [status, setStatus] = useState<LessonCallStatus>('connecting');
  const [micEnabled, setMicEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [joinAttempt, setJoinAttempt] = useState(0);

  const userName = user?.fullName ?? user?.username ?? 'Learner';

  useEffect(() => {
    if (!client || !isSignedIn) {
      return;
    }

    let cancelled = false;
    let activeCall: Call | null = null;

    const leaveJoinedCall = async (callToLeave: Call) => {
      if (callToLeave.state.callingState === CallingState.LEFT) {
        return;
      }

      await callToLeave.stopClosedCaptions().catch(() => undefined);
      await callToLeave.leave().catch(() => undefined);
    };

    const joinLessonCall = async () => {
      setStatus('connecting');
      setErrorMessage(null);
      setCallId(null);
      setCallType(null);

      try {
        const authToken = await getToken();

        if (!authToken) {
          throw new Error('Sign in again to start an audio lesson.');
        }

        const session = await createLessonCall(
          authToken,
          buildCreateLessonCallPayload(lessonData),
        );

        if (cancelled) {
          return;
        }

        const nextCall = client.call(session.callType, session.callId, { reuseInstance: true });
        activeCall = nextCall;
        setCall(nextCall);
        setCallId(session.callId);
        setCallType(session.callType);

        await nextCall.join();

        if (cancelled) {
          await leaveJoinedCall(nextCall);
          activeCall = null;
          return;
        }

        await nextCall.camera.disable();

        if (cancelled) {
          await leaveJoinedCall(nextCall);
          activeCall = null;
          return;
        }

        await nextCall.microphone.enable();
        nextCall.updateClosedCaptionSettings({
          maxVisibleCaptions: 0,
          visibilityDurationMs: 0,
        });
        await nextCall.startClosedCaptions().catch(() => undefined);

        if (cancelled) {
          await leaveJoinedCall(nextCall);
          activeCall = null;
          return;
        }

        setMicEnabled(true);
        setStatus('joined');
      } catch (error) {
        if (activeCall) {
          await leaveJoinedCall(activeCall);
          activeCall = null;
        }

        if (cancelled) {
          return;
        }

        const message =
          error instanceof Error ? error.message : 'Unable to connect to the audio lesson.';

        setStatus('error');
        setErrorMessage(message);
        setCall(null);
        setCallId(null);
        setCallType(null);
      }
    };

    joinLessonCall();

    return () => {
      cancelled = true;

      if (activeCall) {
        if (activeCall.state.callingState !== CallingState.LEFT) {
          activeCall.stopClosedCaptions().catch(() => undefined);
          activeCall.leave().catch(() => undefined);
        }
      }

      setCall(null);
      setCallId(null);
      setCallType(null);
    };
  }, [
    client,
    getToken,
    isSignedIn,
    joinAttempt,
    language.id,
    language.name,
    lesson.aiTeacher.openingLine,
    lesson.aiTeacher.systemPrompt,
    lesson.aiTeacher.teachingFocus,
    lesson.goals,
    lesson.id,
    lesson.phrases,
    lesson.title,
    lesson.vocabulary,
    primaryGoal,
  ]);

  const toggleMic = useCallback(async () => {
    if (!call || status === 'ended' || status === 'error' || status === 'connecting') {
      return;
    }

    const nextMicEnabled = !micEnabled;

    try {
      if (nextMicEnabled) {
        await call.microphone.enable();
        setStatus('joined');
      } else {
        await call.microphone.disable();
        setStatus('muted');
      }

      setMicEnabled(nextMicEnabled);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update the microphone.';
      setErrorMessage(message);
      setStatus('error');
    }
  }, [call, micEnabled, status]);

  const endCall = useCallback(async () => {
    if (call && call.state.callingState !== CallingState.LEFT) {
      await call.stopClosedCaptions().catch(() => undefined);
      await call.leave().catch(() => undefined);
    }

    setStatus('ended');
    router.back();
  }, [call, router]);

  const retryJoin = useCallback(() => {
    setJoinAttempt((current) => current + 1);
  }, []);

  return {
    call,
    callId,
    callType,
    status,
    micEnabled,
    userName,
    errorMessage,
    toggleMic,
    endCall,
    retryJoin,
  };
}
