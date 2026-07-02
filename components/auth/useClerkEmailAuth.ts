import { useOAuth, useSignIn, useSignUp } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { type AuthMode, type SocialProvider } from '@/components/auth/types';
import { useAuthActions } from '@/components/auth/useAuthActions';

export function useClerkEmailAuth(mode: AuthMode) {
  const router = useRouter();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });
  const facebookOAuth = useOAuth({ strategy: 'oauth_facebook' });
  const appleOAuth = useOAuth({ strategy: 'oauth_apple' });
  const { getClerkErrorMessage } = useAuthActions(mode);
  const [isLoading, setIsLoading] = useState(false);

  const isReady = mode === 'sign-up' ? isSignUpLoaded : isSignInLoaded;

  const completeSession = useCallback(
    async (
      sessionId: string | null | undefined,
      setActive?: (params: { session: string }) => Promise<void>,
    ) => {
      if (!sessionId || !setActive) {
        throw new Error('Authentication did not return a session.');
      }

      await setActive({ session: sessionId });
      router.replace('/');
    },
    [router],
  );

  const startAuth = useCallback(
    async (email: string, password?: string) => {
      if (!isReady) {
        throw new Error('Clerk is still loading.');
      }

      setIsLoading(true);

      try {
        if (mode === 'sign-up') {
          if (!signUp) {
            throw new Error('Sign up is unavailable.');
          }

          await signUp.create({
            emailAddress: email,
            password: password ?? '',
          });
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          return;
        }

        if (!signIn) {
          throw new Error('Sign in is unavailable.');
        }

        await signIn.create({ identifier: email });

        const emailCodeFactor = signIn.supportedFirstFactors?.find(
          (factor) => factor.strategy === 'email_code',
        );

        if (!emailCodeFactor || !('emailAddressId' in emailCodeFactor)) {
          throw new Error('Email code sign-in is not enabled for this account.');
        }

        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailCodeFactor.emailAddressId,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isReady, mode, signIn, signUp],
  );

  const verifyCode = useCallback(
    async (code: string) => {
      if (!isReady) {
        throw new Error('Clerk is still loading.');
      }

      setIsLoading(true);

      try {
        if (mode === 'sign-up') {
          if (!signUp) {
            throw new Error('Sign up is unavailable.');
          }

          const result = await signUp.attemptEmailAddressVerification({ code });
          await completeSession(result.createdSessionId, setSignUpActive);
          return;
        }

        if (!signIn) {
          throw new Error('Sign in is unavailable.');
        }

        const result = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        });
        await completeSession(result.createdSessionId, setSignInActive);
      } finally {
        setIsLoading(false);
      }
    },
    [completeSession, isReady, mode, setSignInActive, setSignUpActive, signIn, signUp],
  );

  const startSocialAuth = useCallback(
    async (provider: SocialProvider) => {
      const oauthByProvider = {
        google: googleOAuth,
        facebook: facebookOAuth,
        apple: appleOAuth,
      } as const;

      const redirectUrl = Linking.createURL('/sso-callback', { scheme: 'duolingo' });
      const { startOAuthFlow } = oauthByProvider[provider];
      const { createdSessionId, setActive } = await startOAuthFlow({ redirectUrl });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    },
    [appleOAuth, facebookOAuth, googleOAuth, router],
  );

  return {
    startAuth,
    verifyCode,
    startSocialAuth,
    isLoading: isLoading || !isReady,
    getClerkErrorMessage,
  };
}
