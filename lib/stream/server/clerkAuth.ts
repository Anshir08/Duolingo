import { createClerkClient, verifyToken } from '@clerk/backend';

export type AuthenticatedClerkUser = {
  userId: string;
  name: string;
};

export async function authenticateClerkRequest(
  request: Request,
): Promise<AuthenticatedClerkUser | null> {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  const sessionToken = authorization.slice('Bearer '.length).trim();
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Missing CLERK_SECRET_KEY for server auth');
  }

  const verified = await verifyToken(sessionToken, { secretKey });
  const userId = verified.sub;

  if (!userId) {
    return null;
  }

  const clerk = createClerkClient({ secretKey });
  const user = await clerk.users.getUser(userId);
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    'Learner';

  return { userId, name };
}
