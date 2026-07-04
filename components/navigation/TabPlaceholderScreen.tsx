import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '@/theme';

type TabPlaceholderScreenProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function TabPlaceholderScreen({ title, subtitle, children }: TabPlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.neutral.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
});
