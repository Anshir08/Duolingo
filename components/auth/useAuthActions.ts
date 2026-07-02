import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import { useCallback } from 'react';

import type { AuthMode } from '@/components/auth/types';

export function useAuthActions(mode: AuthMode) {
  const getClerkErrorMessage = useCallback((error: unknown) => {
    if (isClerkAPIResponseError(error)) {
      return error.errors[0]?.longMessage ?? error.errors[0]?.message ?? 'Authentication failed';
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Authentication failed';
  }, []);

  return {
    getClerkErrorMessage,
    mode,
  };
}
