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

export async function startVisionAgentSession(callId: string, callType: string) {
  const baseUrl = getVisionAgentBaseUrl();
  const response = await fetch(`${baseUrl}/calls/${encodeURIComponent(callId)}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ call_type: callType }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Vision agent start failed (${response.status})`);
  }

  return response.json() as Promise<VisionAgentStartSessionResponse>;
}

export async function stopVisionAgentSession(callId: string, sessionId: string) {
  const baseUrl = getVisionAgentBaseUrl();
  const response = await fetch(
    `${baseUrl}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok && response.status !== 404) {
    const detail = await response.text();
    throw new Error(detail || `Vision agent stop failed (${response.status})`);
  }
}
