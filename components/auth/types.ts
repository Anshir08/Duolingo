export type AuthMode = 'sign-up' | 'sign-in';

export type SocialProvider = 'google' | 'facebook' | 'apple';

export const socialStrategyMap: Record<SocialProvider, `oauth_${SocialProvider}`> = {
  google: 'oauth_google',
  facebook: 'oauth_facebook',
  apple: 'oauth_apple',
};
