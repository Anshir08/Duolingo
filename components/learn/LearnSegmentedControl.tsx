import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { colors, fontFamily } from '@/theme';

type LearnSegmentedControlProps = {
  activeTab: 'lessons' | 'practice';
  onChange: (tab: 'lessons' | 'practice') => void;
};

export function LearnSegmentedControl({ activeTab, onChange }: LearnSegmentedControlProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange('lessons')}
        style={[styles.tab, activeTab === 'lessons' && styles.tabActive]}
      >
        <Text style={[styles.tabLabel, activeTab === 'lessons' && styles.tabLabelActive]}>
          Lessons
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange('practice')}
        style={[styles.tab, activeTab === 'practice' && styles.tabActive]}
      >
        <Text style={[styles.tabLabel, activeTab === 'practice' && styles.tabLabelActive]}>
          Practice
        </Text>
      </Pressable>
    </View>
  );
}

export function PracticePlaceholder() {
  return (
    <View style={styles.practiceWrap}>
      <SymbolView
        name={{ ios: 'dumbbell.fill', android: 'fitness_center', web: 'fitness_center' }}
        size={28}
        tintColor={colors.primary.purple}
      />
      <Text style={styles.practiceTitle}>Practice mode</Text>
      <Text style={styles.practiceSubtitle}>Review exercises and speaking drills will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1EBFF',
    borderRadius: 999,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: colors.neutral.background,
    shadowColor: colors.neutral.textPrimary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
  },
  tabLabelActive: {
    fontFamily: fontFamily.semibold,
    color: colors.primary.purple,
  },
  practiceWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  practiceTitle: {
    marginTop: 12,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
  },
  practiceSubtitle: {
    marginTop: 8,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
});
