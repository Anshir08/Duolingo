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

async function postJson<TResponse>(
  path: string,
  authToken: string,
  body?: unknown,
): Promise<TResponse> {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.json() as Promise<TResponse>;
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
