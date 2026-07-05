import { ServerConfigError } from '@/lib/stream/server/apiErrors';
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
    console.error('[stream/token]', error);

    if (error instanceof ServerConfigError) {
      return Response.json({ error: 'Stream token service is unavailable' }, { status: 503 });
    }

    return Response.json({ error: 'Failed to create Stream token' }, { status: 500 });
  }
}
