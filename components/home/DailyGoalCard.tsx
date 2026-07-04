import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, images } from '@/theme';

type DailyGoalCardProps = {
  currentXp: number;
  goalXp: number;
};

export function DailyGoalCard({ currentXp, goalXp }: DailyGoalCardProps) {
  const progress = Math.min(currentXp / goalXp, 1);

  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Text style={styles.label}>Daily goal</Text>
        <Text style={styles.xpText}>
          {currentXp} / {goalXp} XP
        </Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <Image source={images.treasure} style={styles.treasure} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7EA',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 16,
  },
  copy: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
    marginBottom: 4,
  },
  xpText: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.neutral.textPrimary,
    marginBottom: 10,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#FDE7C8',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.semantic.streak,
  },
  treasure: {
    width: 72,
    height: 72,
  },
});
