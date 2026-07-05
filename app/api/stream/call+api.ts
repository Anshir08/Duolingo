import { AI_TEACHER_USER_ID, LESSON_CALL_TYPE } from '@/components/stream/constants';
import { authenticateClerkRequest } from '@/lib/stream/server/clerkAuth';
import { buildLessonCallCustom } from '@/lib/stream/server/lessonCallCustom';
import { getStreamServerClient } from '@/lib/stream/server/streamClient';

type LessonVocabularyItem = {
  word?: string;
  translation?: string;
  pronunciation?: string;
};

type LessonPhraseItem = {
  phrase?: string;
  translation?: string;
};

type LessonGoalItem = {
  description?: string;
};

type CreateCallBody = {
  lessonId?: string;
  languageId?: string;
  lessonTitle?: string;
  languageName?: string;
  teachingFocus?: string;
  primaryGoal?: string;
  systemPrompt?: string;
  openingLine?: string;
  vocabulary?: LessonVocabularyItem[];
  phrases?: LessonPhraseItem[];
  goals?: LessonGoalItem[];
};

export async function POST(request: Request) {
  try {
    const authUser = await authenticateClerkRequest(request);

    if (!authUser) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as CreateCallBody;

    if (!body.lessonId || !body.languageId) {
      return Response.json({ error: 'lessonId and languageId are required' }, { status: 400 });
    }

    const streamClient = getStreamServerClient();

    await streamClient.upsertUsers([
      {
        id: authUser.userId,
        name: authUser.name,
        role: 'user',
      },
      {
        id: AI_TEACHER_USER_ID,
        name: 'AI Teacher',
        role: 'user',
      },
    ]);

    const callId = `lesson-${body.lessonId}-${authUser.userId.slice(0, 8)}-${Date.now()}`;
    const call = streamClient.video.call(LESSON_CALL_TYPE, callId);

    await call.getOrCreate({
      data: {
        created_by_id: authUser.userId,
        members: [
          { user_id: authUser.userId, role: 'host' },
          { user_id: AI_TEACHER_USER_ID, role: 'admin' },
        ],
        custom: buildLessonCallCustom({
          lessonId: body.lessonId,
          languageId: body.languageId,
          lessonTitle: body.lessonTitle,
          languageName: body.languageName,
          teachingFocus: body.teachingFocus,
          learnerName: authUser.name,
          primaryGoal: body.primaryGoal,
          systemPrompt: body.systemPrompt,
          openingLine: body.openingLine,
          vocabulary: body.vocabulary,
          phrases: body.phrases,
          goals: body.goals,
        }),
        settings_override: {
          transcription: {
            mode: 'available',
            closed_caption_mode: 'available',
            language: 'en',
          },
        },
      },
    });

    await call.goLive({ start_closed_caption: true });

    return Response.json({
      callId,
      callType: LESSON_CALL_TYPE,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create Stream call';
    const status = message.includes('CLERK_SECRET_KEY') ? 503 : 500;

    return Response.json({ error: message }, { status });
  }
}
