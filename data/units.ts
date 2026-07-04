import type { LanguageId, Unit } from '@/types/learning';

export const units: Unit[] = [
  {
    id: 'unit-es-1',
    languageId: 'spanish',
    order: 1,
    title: 'Unit 1: Greetings',
    description: 'Say hello, introduce yourself, and start simple conversations.',
    lessonIds: ['es-lesson-1', 'es-lesson-2'],
  },
  {
    id: 'unit-es-2',
    languageId: 'spanish',
    order: 2,
    title: 'Unit 2: Everyday Spanish',
    description: 'Learn numbers, common phrases, and useful daily expressions.',
    lessonIds: ['es-lesson-3', 'es-lesson-4', 'es-lesson-5', 'es-lesson-6', 'es-lesson-7', 'es-lesson-8'],
  },
  {
    id: 'unit-fr-1',
    languageId: 'french',
    order: 1,
    title: 'Unit 1: First Steps',
    description: 'Master basic French greetings and polite introductions.',
    lessonIds: ['fr-lesson-1', 'fr-lesson-2'],
  },
  {
    id: 'unit-fr-2',
    languageId: 'french',
    order: 2,
    title: 'Unit 2: Around Town',
    description: 'Order food, ask for directions, and handle simple situations.',
    lessonIds: ['fr-lesson-3', 'fr-lesson-4', 'fr-lesson-5'],
  },
  {
    id: 'unit-ja-1',
    languageId: 'japanese',
    order: 1,
    title: 'Unit 1: Foundations',
    description: 'Learn essential Japanese greetings and self-introductions.',
    lessonIds: ['ja-lesson-1', 'ja-lesson-2'],
  },
  {
    id: 'unit-ja-2',
    languageId: 'japanese',
    order: 2,
    title: 'Unit 2: Daily Life',
    description: 'Practice numbers, thanks, and phrases for everyday situations.',
    lessonIds: ['ja-lesson-3', 'ja-lesson-4', 'ja-lesson-5'],
  },
  {
    id: 'unit-ko-1',
    languageId: 'korean',
    order: 1,
    title: 'Unit 1: Hangul Basics',
    description: 'Learn Korean greetings and essential beginner phrases.',
    lessonIds: ['ko-lesson-1', 'ko-lesson-2', 'ko-lesson-3'],
  },
  {
    id: 'unit-ko-2',
    languageId: 'korean',
    order: 2,
    title: 'Unit 2: Everyday Korean',
    description: 'Practice daily expressions and simple conversations.',
    lessonIds: ['ko-lesson-4', 'ko-lesson-5'],
  },
  {
    id: 'unit-de-1',
    languageId: 'german',
    order: 1,
    title: 'Unit 1: First Words',
    description: 'Start with German greetings and introductions.',
    lessonIds: ['de-lesson-1', 'de-lesson-2', 'de-lesson-3'],
  },
  {
    id: 'unit-de-2',
    languageId: 'german',
    order: 2,
    title: 'Unit 2: Around Town',
    description: 'Handle travel, shopping, and daily situations in German.',
    lessonIds: ['de-lesson-4', 'de-lesson-5'],
  },
  {
    id: 'unit-zh-1',
    languageId: 'chinese',
    order: 1,
    title: 'Unit 1: Mandarin Basics',
    description: 'Learn Chinese greetings and beginner vocabulary.',
    lessonIds: ['zh-lesson-1', 'zh-lesson-2', 'zh-lesson-3'],
  },
  {
    id: 'unit-zh-2',
    languageId: 'chinese',
    order: 2,
    title: 'Unit 2: Daily Mandarin',
    description: 'Practice numbers, directions, and common phrases.',
    lessonIds: ['zh-lesson-4', 'zh-lesson-5'],
  },
];

export function getUnitsByLanguageId(languageId: LanguageId): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((unit) => unit.id === unitId);
}
