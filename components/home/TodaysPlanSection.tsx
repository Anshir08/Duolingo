import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import type { TodaysPlanItem } from '@/components/home/useHomeData';
import { colors, fontFamily } from '@/theme';

type TodaysPlanSectionProps = {
  items: TodaysPlanItem[];
};

const iconByType = {
  lesson: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
  conversation: { ios: 'headphones', android: 'headphones', web: 'headphones' },
  words: { ios: 'character.book.closed.fill', android: 'auto_stories', web: 'auto_stories' },
} as const;

const iconBackgroundByType = {
  lesson: colors.primary.purple,
  conversation: colors.primary.deepPurple,
  words: colors.semantic.streak,
} as const;

export function TodaysPlanSection({ items }: TodaysPlanSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Today&apos;s plan</Text>
        <Pressable hitSlop={8}>
          <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: iconBackgroundByType[item.type] },
            ]}
          >
            <SymbolView
              name={iconByType[item.type]}
              size={18}
              tintColor={colors.neutral.background}
            />
          </View>

          <View style={styles.copy}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>

          <View style={[styles.status, item.completed && styles.statusCompleted]}>
            {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
  },
  viewAll: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary.purple,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  copy: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
  itemSubtitle: {
    marginTop: 2,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
  },
  status: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCompleted: {
    borderColor: colors.primary.purple,
    backgroundColor: colors.primary.purple,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 14,
    color: colors.neutral.background,
  },
});
