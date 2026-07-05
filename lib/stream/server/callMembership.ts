import { getStreamServerClient } from '@/lib/stream/server/streamClient';

export async function userIsCallMember(
  callType: string,
  callId: string,
  userId: string,
): Promise<boolean> {
  const call = getStreamServerClient().video.call(callType, callId);
  const result = await call.queryMembers({
    filter_conditions: { user_id: { $eq: userId } },
    limit: 1,
  });

  return result.members.length > 0;
}
