import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';

import { identifyClerkUser } from '@/lib/posthog/identity';
import { useLanguageStore } from '@/store/languageStore';

export function PostHogIdentitySync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id || !hasHydrated) {
      return;
    }

    void identifyClerkUser(user.id, selectedLanguageId);
  }, [hasHydrated, isLoaded, isSignedIn, selectedLanguageId, user?.id]);

  return null;
}
