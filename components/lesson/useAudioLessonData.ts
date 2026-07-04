import { getLanguageById } from '@/data/languages';
import { getLessonById } from '@/data/lessons';
import type { Language, Lesson } from '@/types/learning';

export type AudioLessonData = {
  lesson: Lesson;
  language: Language;
  primaryGoal: string;
  teacherMessage: string;
};

export function getAudioLessonData(lessonId: string): AudioLessonData | null {
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return null;
  }

  const language = getLanguageById(lesson.languageId);

  if (!language) {
    return null;
  }

  return {
    lesson,
    language,
    primaryGoal: lesson.goals[0]?.description ?? lesson.description,
    teacherMessage: lesson.aiTeacher.openingLine,
  };
}
