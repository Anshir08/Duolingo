export const poppinsFontFiles = [
  require('../assets/fonts/Poppins-Regular.ttf'),
  require('../assets/fonts/Poppins-Medium.ttf'),
  require('../assets/fonts/Poppins-SemiBold.ttf'),
  require('../assets/fonts/Poppins-Bold.ttf'),
] as const;

export const poppinsFontPaths = [
  './assets/fonts/Poppins-Regular.ttf',
  './assets/fonts/Poppins-Medium.ttf',
  './assets/fonts/Poppins-SemiBold.ttf',
  './assets/fonts/Poppins-Bold.ttf',
] as const;

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;
