import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import type { LessonCallStatus } from '@/components/stream/constants';
import { STREAM_UNAVAILABLE_MESSAGE } from '@/components/stream/streamRuntime';

export function useOfflineLessonCall() {
  const router = useRouter();
  const { user } = useUser();
  const [micEnabled, setMicEnabled] = useState(true);
  const [status, setStatus] = useState<LessonCallStatus>('error');

  const userName = user?.fullName ?? user?.username ?? 'Learner';

  const toggleMic = useCallback(async () => {
    setMicEnabled((current) => {
      const next = !current;
      setStatus(next ? 'joined' : 'muted');
      return next;
    });
  }, []);

  const endCall = useCallback(async () => {
    setStatus('ended');
    router.back();
  }, [router]);

  const retryJoin = useCallback(() => {
    setStatus('error');
  }, []);

  return {
    call: null,
    status,
    micEnabled,
    userName,
    errorMessage: STREAM_UNAVAILABLE_MESSAGE,
    toggleMic,
    endCall,
    retryJoin,
  };
}
