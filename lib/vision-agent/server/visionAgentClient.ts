export function getVisionAgentBaseUrl() {
  const url = process.env.VISION_AGENT_URL;

  if (!url) {
    throw new Error('Missing VISION_AGENT_URL for vision agent proxy');
  }

  return url.replace(/\/$/, '');
}

export type VisionAgentStartSessionResponse = {
  session_id: string;
  call_id: string;
  session_started_at: string;
};

const REQUEST_TIMEOUT_MS = 30_000;

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Vision agent request timed out. Please try again.');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function startVisionAgentSession(callId: string, callType: string) {
  const baseUrl = getVisionAgentBaseUrl();
  const response = await fetchWithTimeout(`${baseUrl}/calls/${encodeURIComponent(callId)}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ call_type: callType }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('[vision-agent] start session failed', response.status, detail);
    throw new Error('Failed to start vision agent session');
  }

  return response.json() as Promise<VisionAgentStartSessionResponse>;
}

export async function stopVisionAgentSession(callId: string, sessionId: string) {
  const baseUrl = getVisionAgentBaseUrl();
  const response = await fetchWithTimeout(
    `${baseUrl}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok && response.status !== 404) {
    const detail = await response.text();
    console.error('[vision-agent] stop session failed', response.status, detail);
    throw new Error('Failed to stop vision agent session');
  }
}
