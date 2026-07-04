import { getUnitsByLanguageId } from '@/data/units';
import { getLessonsByUnitId } from '@/data/lessons';
import {
  getCompletedLessonCount,
  getMockLessonStatus,
  type LessonDisplayStatus,
} from '@/components/learn/lessonProgress';
import { useLanguageStore } from '@/store/languageStore';
import type { Lesson, Unit } from '@/types/learning';

export type LessonListItem = {
  lesson: Lesson;
  status: LessonDisplayStatus;
  index: number;
};

export type LearnScreenData = {
  unit: Unit;
  lessons: LessonListItem[];
  activeLesson: Lesson;
  completedCount: number;
  totalCount: number;
};

export function useLearnScreenData(): LearnScreenData | null {
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);

  if (!selectedLanguageId) {
    return null;
  }

  const units = getUnitsByLanguageId(selectedLanguageId);
  const unit = units[units.length - 1] ?? units[0];

  if (!unit) {
    return null;
  }

  const unitLessons = getLessonsByUnitId(unit.id);

  if (unitLessons.length === 0) {
    return null;
  }

  const lessons = unitLessons.map((lesson, index) => ({
    lesson,
    status: getMockLessonStatus(index),
    index,
  }));

  const activeLesson =
    lessons.find((item) => item.status === 'in_progress')?.lesson ??
    lessons[lessons.length - 1]?.lesson ??
    unitLessons[0];

  return {
    unit,
    lessons,
    activeLesson,
    completedCount: getCompletedLessonCount(unitLessons.length),
    totalCount: unitLessons.length,
  };
}
