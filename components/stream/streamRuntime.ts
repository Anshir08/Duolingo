import Constants, { ExecutionEnvironment } from 'expo-constants';

export function canUseStreamVideo() {
  return Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
}

export const STREAM_UNAVAILABLE_MESSAGE =
  'Audio calls require a development build. Expo Go does not include WebRTC. Run npx expo prebuild --clean, then npx expo run:android.';
