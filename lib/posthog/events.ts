import { posthog } from '@/lib/posthog';

export function captureLanguageSelected(properties: {
  language_code: string;
  language_name: string;
}) {
  posthog?.capture('language_selected', properties);
}

export function captureLessonStarted(properties: {
  lesson_id: string;
  language: string;
  lesson_number: number;
}) {
  posthog?.capture('lesson_started', properties);
}

export function captureLessonAbandoned(properties: {
  lesson_id: string;
  time_into_lesson_seconds: number;
  last_question_index: number;
}) {
  posthog?.capture('lesson_abandoned', properties);
}
