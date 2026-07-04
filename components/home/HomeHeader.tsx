import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import type { Language } from '@/types/learning';
import { colors, fontFamily } from '@/theme';

type HomeHeaderProps = {
  language: Language;
  greeting: string;
  userName: string;
  streak: number;
};

export function HomeHeader({ language, greeting, userName, streak }: HomeHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.userBlock}>
        <View style={styles.flagBadge}>
          <Text style={styles.flag}>{language.flagEmoji}</Text>
        </View>
        <Text style={styles.greeting}>
          {greeting}, {userName}! 👋
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.streakPill}>
          <SymbolView
            name={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
            size={16}
            tintColor={colors.semantic.streak}
          />
          <Text style={styles.streakText}>{streak}</Text>
        </View>

        <Pressable hitSlop={10} style={styles.bellButton}>
          <SymbolView
            name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
            size={22}
            tintColor={colors.neutral.textPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  flagBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  flag: {
    fontSize: 22,
  },
  greeting: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  streakText: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.semantic.streak,
  },
  bellButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
