import { authenticateClerkRequest } from '@/lib/stream/server/clerkAuth';
import { getStreamApiKey, getStreamServerClient } from '@/lib/stream/server/streamClient';

export async function POST(request: Request) {
  try {
    const authUser = await authenticateClerkRequest(request);

    if (!authUser) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const streamClient = getStreamServerClient();

    await streamClient.upsertUsers([
      {
        id: authUser.userId,
        name: authUser.name,
        role: 'user',
      },
    ]);

    const token = streamClient.generateUserToken({
      user_id: authUser.userId,
      validity_in_seconds: 60 * 60,
    });

    return Response.json({
      token,
      apiKey: getStreamApiKey(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create Stream token';
    const status = message.includes('CLERK_SECRET_KEY') ? 503 : 500;

    return Response.json({ error: message }, { status });
  }
}
