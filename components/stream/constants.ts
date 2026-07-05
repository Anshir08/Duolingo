export const LESSON_CALL_TYPE = 'audio_room';
export const AI_TEACHER_USER_ID = 'ai-language-teacher';

export type LessonCallStatus =
  | 'connecting'
  | 'joined'
  | 'muted'
  | 'error'
  | 'ended';

export type AgentConnectionStatus = 'idle' | 'connecting' | 'connected' | 'failed';
