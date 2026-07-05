export type StreamTokenResponse = {
  token: string;
  apiKey: string;
};

export type CreateLessonCallPayload = {
  lessonId: string;
  languageId: string;
  lessonTitle: string;
  languageName: string;
  teachingFocus: string;
  primaryGoal: string;
  systemPrompt: string;
  openingLine: string;
  vocabulary: Array<{
    word: string;
    translation: string;
    pronunciation?: string;
  }>;
  phrases: Array<{
    phrase: string;
    translation: string;
  }>;
  goals: Array<{
    description: string;
  }>;
};

export type CreateLessonCallResponse = {
  callId: string;
  callType: string;
};

export type StartVisionAgentResponse = {
  sessionId: string;
  callId: string;
  sessionStartedAt: string;
};

const REQUEST_TIMEOUT_MS = 30_000;

async function readErrorMessage(response: Response): Promise<string> {
  const fallback = `Request failed (${response.status})`;

  try {
    const text = await response.text();

    if (!text) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(text) as { error?: string; message?: string };
      return parsed.error ?? parsed.message ?? fallback;
    } catch {
      return text;
    }
  } catch {
    return fallback;
  }
}

async function postJson<TResponse>(
  path: string,
  authToken: string,
  body?: unknown,
): Promise<TResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response));
    }

    return response.json() as Promise<TResponse>;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
export function fetchStreamToken(authToken: string) {
  return postJson<StreamTokenResponse>('/api/stream/token', authToken);
}

export function createLessonCall(authToken: string, payload: CreateLessonCallPayload) {
  return postJson<CreateLessonCallResponse>('/api/stream/call', authToken, payload);
}

export function startVisionAgent(
  authToken: string,
  payload: { callId: string; callType: string },
) {
  return postJson<StartVisionAgentResponse>('/api/vision-agent/start', authToken, payload);
}

export function stopVisionAgent(
  authToken: string,
  payload: { callId: string; sessionId: string },
) {
  return postJson<{ ok: boolean }>('/api/vision-agent/stop', authToken, payload);
}
