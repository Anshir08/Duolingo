import { getLanguageById } from '@/data/languages';
import { getLessonsByLanguageId, getLessonsByUnitId } from '@/data/lessons';
import { getUnitsByLanguageId } from '@/data/units';
import { useLanguageStore } from '@/store/languageStore';
import type { Language, LanguageId, Lesson, Unit } from '@/types/learning';

const GREETINGS: Record<LanguageId, string> = {
  spanish: 'Hola',
  french: 'Bonjour',
  japanese: 'こんにちは',
  korean: '안녕',
  german: 'Hallo',
  chinese: '你好',
};

export type TodaysPlanItem = {
  id: string;
  title: string;
  subtitle: string;
  type: 'lesson' | 'conversation' | 'words';
  completed: boolean;
};

export type HomeData = {
  language: Language;
  greeting: string;
  currentUnit: Unit;
  currentLesson: Lesson;
  levelLabel: string;
  dailyXp: { current: number; goal: number };
  streak: number;
  todaysPlan: TodaysPlanItem[];
};

function createStarterUnit(language: Language): Unit {
  return {
    id: `${language.id}-starter-unit`,
    languageId: language.id,
    order: 1,
    title: `Unit 1: ${language.name} Basics`,
    description: language.description,
    lessonIds: [`${language.id}-starter-lesson`],
  };
}

function createStarterLesson(language: Language, unitId: string): Lesson {
  return {
    id: `${language.id}-starter-lesson`,
    unitId,
    languageId: language.id,
    order: 1,
    title: 'Getting started',
    description: language.description,
    type: 'mixed',
    imageKey: 'palace',
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [{ id: 'starter-goal', description: `Learn your first ${language.name} phrases.` }],
    vocabulary: [
      { id: 'starter-v1', word: 'Hello', translation: 'Hello' },
      { id: 'starter-v2', word: 'Thanks', translation: 'Thanks' },
      { id: 'starter-v3', word: 'Please', translation: 'Please' },
      { id: 'starter-v4', word: 'Goodbye', translation: 'Goodbye' },
      { id: 'starter-v5', word: 'Yes', translation: 'Yes' },
    ],
    phrases: [],
    activities: [],
    aiTeacher: {
      systemPrompt: '',
      openingLine: '',
      teachingFocus: `Introductory ${language.name}`,
    },
  };
}

function buildHomeData(languageId: LanguageId): HomeData | null {
  const language = getLanguageById(languageId);

  if (!language) {
    return null;
  }

  const units = getUnitsByLanguageId(languageId);
  let currentUnit = units[units.length - 1] ?? units[0];
  let unitLessons = currentUnit ? getLessonsByUnitId(currentUnit.id) : [];
  const allLessons = getLessonsByLanguageId(languageId);
  let currentLesson =
    unitLessons.find((lesson) => lesson.type === 'audio' || lesson.title.toLowerCase().includes('café')) ??
    unitLessons[unitLessons.length - 1] ??
    allLessons[0];

  if (!currentUnit || !currentLesson) {
    currentUnit = createStarterUnit(language);
    unitLessons = [createStarterLesson(language, currentUnit.id)];
    currentLesson = unitLessons[0];
  }

  const vocabularyLesson =    unitLessons.find((lesson) => lesson.type === 'vocabulary') ?? currentLesson;

  const earnedXp = unitLessons
    .slice(0, Math.max(unitLessons.indexOf(currentLesson), 1))
    .reduce((total, lesson) => total + lesson.xpReward, 0);

  const dailyGoal = 20;
  const dailyCurrent = Math.min(dailyGoal, Math.max(earnedXp, 15));

  return {
    language,
    greeting: GREETINGS[languageId],
    currentUnit,
    currentLesson,
    levelLabel: 'A1',
    dailyXp: { current: dailyCurrent, goal: dailyGoal },
    streak: 12,
    todaysPlan: [
      {
        id: 'plan-lesson',
        title: 'Lesson',
        subtitle: currentLesson.title,
        type: 'lesson',
        completed: true,
      },
      {
        id: 'plan-conversation',
        title: 'AI Conversation',
        subtitle: `${currentLesson.estimatedMinutes} min speaking`,
        type: 'conversation',
        completed: false,
      },
      {
        id: 'plan-words',
        title: 'New words',
        subtitle: `${vocabularyLesson.vocabulary.length} words`,
        type: 'words',
        completed: false,
      },
    ],
  };
}

export function useHomeData(): HomeData | null {
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);

  if (!selectedLanguageId) {
    return null;
  }

  return buildHomeData(selectedLanguageId);
}
