import { getLanguageById } from '@/data/languages';
import { getLessonById } from '@/data/lessons';
import type { Language, Lesson } from '@/types/learning';

export type AudioLessonData = {
  lesson: Lesson;
  language: Language;
  primaryGoal: string;
  teacherMessage: string;
};

export type AudioLessonLookupResult =
  | { status: 'found'; data: AudioLessonData }
  | { status: 'not-found' };

export function getAudioLessonData(lessonId: string | undefined): AudioLessonLookupResult {
  if (!lessonId) {
    return { status: 'not-found' };
  }

  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return { status: 'not-found' };
  }

  const language = getLanguageById(lesson.languageId);

  if (!language) {
    return { status: 'not-found' };
  }

  return {
    status: 'found',
    data: {
      lesson,
      language,
      primaryGoal: lesson.goals[0]?.description ?? lesson.description,
      teacherMessage: lesson.aiTeacher.openingLine,
    },
  };
}
