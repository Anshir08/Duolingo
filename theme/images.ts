import type { ImageSourcePropType } from 'react-native';

import type { LessonImageKey } from '@/types/learning';

export const images = {
  treasure: require('@/assets/images/treasure.png'),
  palace: require('@/assets/images/palace.png'),
  earth: require('@/assets/images/earth.png'),
  streakFire: require('@/assets/images/streak-fire.png'),
  mascotAuth: require('@/assets/images/mascot-auth.png'),
  mascotWelcome: require('@/assets/images/mascot-welcome.png'),
  mascotLogo: require('@/assets/images/moscot-logo.png'),
} as const;

export const lessonImages: Record<LessonImageKey, ImageSourcePropType> = {
  palace: images.palace,
  treasure: images.treasure,
  earth: images.earth,
  'streak-fire': images.streakFire,
  'mascot-welcome': images.mascotWelcome,
  'mascot-auth': images.mascotAuth,
};

export const placeholderImages = {
  teacherAvatar: 'https://picsum.photos/seed/ai-teacher/160/160',
  studentAvatar: 'https://picsum.photos/seed/student-user/120/160',
  cafeHero: 'https://picsum.photos/seed/cafe-lesson/900/500',
} as const;
