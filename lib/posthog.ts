import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

type PostHogExtra = {
  posthogProjectToken?: string;
  posthogHost?: string;
};

const extra = Constants.expoConfig?.extra as PostHogExtra | undefined;
const apiKey = extra?.posthogProjectToken;
const host = extra?.posthogHost ?? 'https://us.i.posthog.com';

export const posthog = apiKey ? new PostHog(apiKey, { host }) : null;

export function isPostHogEnabled() {
  return posthog != null;
}
