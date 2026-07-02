import { colors } from '@/theme';

const tintColor = colors.primary.purple;

export default {
  light: {
    text: colors.neutral.textPrimary,
    background: colors.neutral.background,
    tint: tintColor,
    tabIconDefault: colors.neutral.textSecondary,
    tabIconSelected: tintColor,
  },
  dark: {
    text: colors.neutral.background,
    background: colors.neutral.textPrimary,
    tint: tintColor,
    tabIconDefault: colors.neutral.textSecondary,
    tabIconSelected: tintColor,
  },
};
