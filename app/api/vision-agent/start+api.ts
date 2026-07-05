import { authenticateClerkRequest } from '@/lib/stream/server/clerkAuth';
import { userIsCallMember } from '@/lib/stream/server/callMembership';
import { startVisionAgentSession } from '@/lib/vision-agent/server/visionAgentClient';

type StartVisionAgentBody = {
  callId?: string;
  callType?: string;
};

export async function POST(request: Request) {
  try {
    const authUser = await authenticateClerkRequest(request);

    if (!authUser) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: StartVisionAgentBody;

    try {
      body = (await request.json()) as StartVisionAgentBody;
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (
      typeof body.callId !== 'string' ||
      typeof body.callType !== 'string' ||
      !body.callId.trim() ||
      !body.callType.trim()
    ) {
      return Response.json({ error: 'callId and callType are required' }, { status: 400 });
    }

    try {
      const isMember = await userIsCallMember(body.callType, body.callId, authUser.userId);

      if (!isMember) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch (error) {
      console.error('[vision-agent/start] call membership check failed', error);
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const session = await startVisionAgentSession(body.callId, body.callType);

    return Response.json({
      sessionId: session.session_id,
      callId: session.call_id,
      sessionStartedAt: session.session_started_at,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to start vision agent';
    const status = message.includes('CLERK_SECRET_KEY')
      ? 503
      : message.includes('VISION_AGENT_URL')
        ? 503
        : 500;

    return Response.json({ error: message }, { status });
  }
}
