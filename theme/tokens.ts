export const colors = {
  primary: {
    purple: '#6C4EF5',
    deepPurple: '#5B3BF6',
    blue: '#4D8BFF',
    green: '#21C16B',
  },
  semantic: {
    success: '#21C16B',
    warning: '#FFC800',
    streak: '#FF8A00',
    error: '#FF4D4F',
    info: '#4D8BFF',
  },
  neutral: {
    textPrimary: '#0D132B',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    surface: '#F6F7FB',
    background: '#FFFFFF',
  },
} as const;

export const typography = {
  h1: { size: 32, weight: 'Bold', lineHeight: 1.2, usage: 'Page / Screen Title' },
  h2: { size: 24, weight: 'SemiBold', lineHeight: 1.3, usage: 'Section Title' },
  h3: { size: 20, weight: 'SemiBold', lineHeight: 1.3, usage: 'Card / Module Title' },
  h4: { size: 16, weight: 'Medium', lineHeight: 1.4, usage: 'Subheading' },
  bodyLg: { size: 16, weight: 'Regular', lineHeight: 1.6, usage: 'Important content' },
  bodyMd: { size: 14, weight: 'Regular', lineHeight: 1.6, usage: 'Body text' },
  bodySm: { size: 13, weight: 'Regular', lineHeight: 1.6, usage: 'Supporting text' },
  caption: { size: 11, weight: 'Regular', lineHeight: 1.4, usage: 'Labels, meta text' },
} as const;
