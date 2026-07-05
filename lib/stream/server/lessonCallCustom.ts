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

export type LessonCallCustomInput = {
  lessonId: string;
  languageId: string;
  lessonTitle?: string;
  languageName?: string;
  teachingFocus?: string;
  learnerName: string;
  primaryGoal?: string;
  systemPrompt?: string;
  openingLine?: string;
  vocabulary?: LessonVocabularyItem[];
  phrases?: LessonPhraseItem[];
  goals?: LessonGoalItem[];
};

export function buildLessonCallCustom(input: LessonCallCustomInput) {
  const vocabulary = (input.vocabulary ?? [])
    .slice(0, 8)
    .map((item) => ({
      word: item.word ?? '',
      translation: item.translation ?? '',
      ...(item.pronunciation ? { pronunciation: item.pronunciation } : {}),
    }))
    .filter((item) => item.word && item.translation);

  const phrases = (input.phrases ?? [])
    .slice(0, 6)
    .map((item) => ({
      phrase: item.phrase ?? '',
      translation: item.translation ?? '',
    }))
    .filter((item) => item.phrase && item.translation);

  const goals = (input.goals ?? [])
    .slice(0, 4)
    .map((item) => ({ description: item.description ?? '' }))
    .filter((item) => item.description);

  return {
    lessonId: input.lessonId,
    languageId: input.languageId,
    lessonTitle: input.lessonTitle ?? '',
    languageName: input.languageName ?? '',
    teachingFocus: input.teachingFocus ?? '',
    learnerName: input.learnerName,
    primaryGoal: input.primaryGoal ?? '',
    systemPrompt: input.systemPrompt ?? '',
    openingLine: input.openingLine ?? '',
    vocabulary,
    phrases,
    goals,
  };
}
