import { authenticateClerkRequest } from '@/lib/stream/server/clerkAuth';
import { stopVisionAgentSession } from '@/lib/vision-agent/server/visionAgentClient';

type StopVisionAgentBody = {
  callId?: string;
  sessionId?: string;
};

export async function POST(request: Request) {
  try {
    const authUser = await authenticateClerkRequest(request);

    if (!authUser) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as StopVisionAgentBody;

    if (!body.callId || !body.sessionId) {
      return Response.json({ error: 'callId and sessionId are required' }, { status: 400 });
    }

    await stopVisionAgentSession(body.callId, body.sessionId);

    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to stop vision agent';
    const status = message.includes('CLERK_SECRET_KEY')
      ? 503
      : message.includes('VISION_AGENT_URL')
        ? 503
        : 500;

    return Response.json({ error: message }, { status });
  }
}
