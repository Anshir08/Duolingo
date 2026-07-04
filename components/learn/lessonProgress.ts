export type LessonDisplayStatus = 'completed' | 'in_progress' | 'upcoming';

export function getMockLessonStatus(lessonIndex: number): LessonDisplayStatus {
  if (lessonIndex < 2) {
    return 'completed';
  }

  if (lessonIndex === 2) {
    return 'in_progress';
  }

  return 'upcoming';
}

export function getCompletedLessonCount(lessonsLength: number): number {
  return Math.min(2, lessonsLength);
}
