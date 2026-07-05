import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import type { CreateLessonCallPayload } from '@/components/stream/apiClient';

export function buildCreateLessonCallPayload(lessonData: AudioLessonData): CreateLessonCallPayload {
  const { lesson, language, primaryGoal } = lessonData;

  return {
    lessonId: lesson.id,
    languageId: language.id,
    lessonTitle: lesson.title,
    languageName: language.name,
    teachingFocus: lesson.aiTeacher.teachingFocus,
    primaryGoal,
    systemPrompt: lesson.aiTeacher.systemPrompt,
    openingLine: lesson.aiTeacher.openingLine,
    vocabulary: lesson.vocabulary.map((item) => ({
      word: item.word,
      translation: item.translation,
      pronunciation: item.pronunciation,
    })),
    phrases: lesson.phrases.map((item) => ({
      phrase: item.phrase,
      translation: item.translation,
    })),
    goals: lesson.goals.map((item) => ({
      description: item.description,
    })),
  };
}
