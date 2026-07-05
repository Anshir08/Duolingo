import { NativeModules, Platform } from 'react-native';

export function canUseStreamVideo() {
  if (Platform.OS === 'web') {
    return false;
  }

  return NativeModules.WebRTCModule != null;
}

export const STREAM_UNAVAILABLE_MESSAGE =
  'Audio calls require a development build. Expo Go does not include WebRTC. Run npx expo prebuild --clean, then npx expo run:android.';
