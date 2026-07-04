import type { SymbolViewProps } from 'expo-symbols';

export type TabRouteName = 'index' | 'learn' | 'ai-teacher' | 'chat' | 'profile';

type TabIconName = SymbolViewProps['name'];

export type TabConfig = {
  label: string;
  icon: TabIconName;
  activeIcon: TabIconName;
};

export const TAB_CONFIG: Record<TabRouteName, TabConfig> = {
  index: {
    label: 'Home',
    icon: { ios: 'house', android: 'home', web: 'home' },
    activeIcon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  learn: {
    label: 'Learn',
    icon: { ios: 'book', android: 'menu_book', web: 'menu_book' },
    activeIcon: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
  },
  'ai-teacher': {
    label: 'AI Teacher',
    icon: { ios: 'sparkles', android: 'smart_toy', web: 'smart_toy' },
    activeIcon: { ios: 'sparkles', android: 'smart_toy', web: 'smart_toy' },
  },
  chat: {
    label: 'Chat',
    icon: { ios: 'bubble.left', android: 'chat_bubble_outline', web: 'chat_bubble_outline' },
    activeIcon: {
      ios: 'bubble.left.and.bubble.right.fill',
      android: 'chat_bubble',
      web: 'chat_bubble',
    },
  },
  profile: {
    label: 'Profile',
    icon: { ios: 'person', android: 'person_outline', web: 'person_outline' },
    activeIcon: { ios: 'person.fill', android: 'person', web: 'person' },
  },
};

export const TAB_ROUTE_ORDER: TabRouteName[] = [
  'index',
  'learn',
  'ai-teacher',
  'chat',
  'profile',
];

export function getTabConfig(routeName: string): TabConfig {
  return TAB_CONFIG[routeName as TabRouteName] ?? TAB_CONFIG.index;
}
