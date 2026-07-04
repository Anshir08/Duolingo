import type { Language, LanguageId } from '@/types/learning';

export const languages: Language[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flagEmoji: '🇪🇸',
    description: 'Learn everyday Spanish for travel, conversation, and culture.',
    learnersLabel: '28.4M learners',
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    flagEmoji: '🇫🇷',
    description: 'Build a strong foundation in French greetings, phrases, and pronunciation.',
    learnersLabel: '19.4M learners',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    flagEmoji: '🇯🇵',
    description: 'Start with essential Japanese words, phrases, and polite expressions.',
    learnersLabel: '12.7M learners',
  },
  {
    id: 'korean',
    name: 'Korean',
    nativeName: '한국어',
    flagEmoji: '🇰🇷',
    description: 'Learn Korean hangul basics, greetings, and everyday expressions.',
    learnersLabel: '9.3M learners',
  },
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    flagEmoji: '🇩🇪',
    description: 'Master German fundamentals for travel, work, and conversation.',
    learnersLabel: '8.1M learners',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    nativeName: '中文',
    flagEmoji: '🇨🇳',
    description: 'Start with essential Mandarin phrases and pronunciation basics.',
    learnersLabel: '7.4M learners',
  },
];

export function getLanguageById(languageId: LanguageId): Language | undefined {
  return languages.find((language) => language.id === languageId);
}
