import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useRef, useState } from 'react';

import { startVisionAgent, stopVisionAgent } from '@/components/stream/apiClient';
import type { AgentConnectionStatus } from '@/components/stream/constants';

type UseVisionAgentSessionOptions = {
  callId: string | null;
  callType: string | null;
  enabled: boolean;
};

export function useVisionAgentSession({
  callId,
  callType,
  enabled,
}: UseVisionAgentSessionOptions) {
  const { getToken, isSignedIn } = useAuth();
  const [status, setStatus] = useState<AgentConnectionStatus>('idle');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const callIdRef = useRef<string | null>(null);
  const stopAgentRef = useRef<() => Promise<void>>(async () => undefined);

  const stopAgent = useCallback(async () => {
    const activeSessionId = sessionIdRef.current;
    const activeCallId = callIdRef.current;

    sessionIdRef.current = null;
    callIdRef.current = null;
    setSessionId(null);

    if (!activeSessionId || !activeCallId) {
      return;
    }

    try {
      const authToken = await getToken();

      if (!authToken) {
        return;
      }

      await stopVisionAgent(authToken, {
        callId: activeCallId,
        sessionId: activeSessionId,
      });
    } catch {
      // Best-effort cleanup when leaving the lesson screen.
    }
  }, [getToken]);

  stopAgentRef.current = stopAgent;

  useEffect(() => {
    if (!enabled || !callId || !callType || !isSignedIn) {
      return;
    }

    let cancelled = false;

    const connectAgent = async () => {
      setStatus('connecting');
      setErrorMessage(null);

      try {
        const authToken = await getToken();

        if (!authToken) {
          throw new Error('Sign in again to connect the AI teacher.');
        }

        const session = await startVisionAgent(authToken, { callId, callType });

        if (cancelled) {
          await stopVisionAgent(authToken, {
            callId: session.callId,
            sessionId: session.sessionId,
          }).catch(() => undefined);
          return;
        }

        sessionIdRef.current = session.sessionId;
        callIdRef.current = session.callId;
        setSessionId(session.sessionId);
        setStatus('connected');
      } catch (error) {
        if (cancelled) {
          return;
        }

        const message =
          error instanceof Error ? error.message : 'Unable to connect the AI teacher.';

        setStatus('failed');
        setErrorMessage(message);
        setSessionId(null);
      }
    };

    connectAgent();

    return () => {
      cancelled = true;
      void stopAgentRef.current();
    };
  }, [callId, callType, enabled, getToken, isSignedIn]);

  const retryConnect = useCallback(() => {
    if (!enabled || !callId || !callType) {
      return;
    }

    setStatus('idle');
    setErrorMessage(null);
    setSessionId(null);
    sessionIdRef.current = null;
    callIdRef.current = null;

    void (async () => {
      setStatus('connecting');

      try {
        const authToken = await getToken();

        if (!authToken) {
          throw new Error('Sign in again to connect the AI teacher.');
        }

        const session = await startVisionAgent(authToken, { callId, callType });
        sessionIdRef.current = session.sessionId;
        callIdRef.current = session.callId;
        setSessionId(session.sessionId);
        setStatus('connected');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to connect the AI teacher.';
        setStatus('failed');
        setErrorMessage(message);
      }
    })();
  }, [callId, callType, enabled, getToken]);

  return {
    status,
    sessionId,
    errorMessage,
    stopAgent,
    retryConnect,
  };
}
