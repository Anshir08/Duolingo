import AsyncStorage from '@react-native-async-storage/async-storage';

import { posthog } from '@/lib/posthog';
import type { LanguageId } from '@/types/learning';

const IDENTIFY_STORAGE_PREFIX = 'posthog-user-identified:';

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function identifyClerkUser(
  userId: string,
  preferredLanguage: LanguageId | null,
) {
  if (!posthog) {
    return;
  }

  const storageKey = `${IDENTIFY_STORAGE_PREFIX}${userId}`;
  const hasIdentifiedBefore = await AsyncStorage.getItem(storageKey);
  const languageValue = preferredLanguage ?? null;

  if (!hasIdentifiedBefore) {
    posthog.identify(userId, {
      $set_once: {
        signup_date: toIsoDate(new Date()),
        preferred_language: languageValue,
      },
      $set: {
        preferred_language: languageValue,
      },
    });
    await AsyncStorage.setItem(storageKey, '1');
    return;
  }

  posthog.identify(userId, {
    $set: {
      preferred_language: languageValue,
    },
  });
}
