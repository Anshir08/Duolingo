export const LANGUAGE_IDS = [
  'spanish',
  'french',
  'japanese',
  'korean',
  'german',
  'chinese',
] as const;

export type LanguageId = (typeof LANGUAGE_IDS)[number];

export type Language = {
  id: LanguageId;
  name: string;
  nativeName: string;
  flagEmoji: string;
  description: string;
  learnersLabel: string;
};

export type LessonImageKey =
  | 'palace'
  | 'treasure'
  | 'earth'
  | 'streak-fire'
  | 'mascot-welcome'
  | 'mascot-auth';

export type LessonType = 'vocabulary' | 'phrases' | 'audio' | 'mixed';

export type ActivityType = 'vocabulary' | 'listening' | 'speaking' | 'matching';

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
};

export type PhraseItem = {
  id: string;
  phrase: string;
  translation: string;
  context?: string;
};

export type LessonGoal = {
  id: string;
  description: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  prompt: string;
};

export type AITeacherPrompt = {
  systemPrompt: string;
  openingLine: string;
  teachingFocus: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
  type: LessonType;
  imageKey: LessonImageKey;
  xpReward: number;
  estimatedMinutes: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  aiTeacher: AITeacherPrompt;
};

export type Unit = {
  id: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
  lessonIds: string[];
};
