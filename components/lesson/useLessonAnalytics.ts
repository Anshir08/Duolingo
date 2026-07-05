import { useEffect, useRef } from 'react';

import type { AudioLessonData } from '@/components/lesson/useAudioLessonData';
import { captureLessonAbandoned, captureLessonStarted } from '@/lib/posthog/events';

export function useLessonAnalytics(lessonData: AudioLessonData | null) {
  const startedAtRef = useRef<number>(Date.now());
  const completedRef = useRef(false);

  useEffect(() => {
    if (!lessonData) {
      return;
    }

    startedAtRef.current = Date.now();
    completedRef.current = false;

    captureLessonStarted({
      lesson_id: lessonData.lesson.id,
      language: lessonData.language.id,
      lesson_number: lessonData.lesson.order,
    });

    return () => {
      if (completedRef.current) {
        return;
      }

      const timeIntoLessonSeconds = Math.max(
        0,
        Math.floor((Date.now() - startedAtRef.current) / 1000),
      );

      captureLessonAbandoned({
        lesson_id: lessonData.lesson.id,
        time_into_lesson_seconds: timeIntoLessonSeconds,
      });
    };
  }, [lessonData]);

  return {
    markLessonCompleted: () => {
      completedRef.current = true;
    },
  };
}
