import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import type { LessonCallStatus } from '@/components/stream/constants';
import { colors, fontFamily } from '@/theme';

type AudioLessonHeaderProps = {
  lessonTitle: string;
  callStatus: LessonCallStatus;
  userName: string;
  streak?: number;
  onBack: () => void;
};

const STATUS_UI: Record<
  LessonCallStatus,
  { label: string; color: string }
> = {
  connecting: { label: 'Connecting', color: colors.semantic.streak },
  joined: { label: 'Online', color: colors.primary.green },
  muted: { label: 'Muted', color: colors.neutral.textSecondary },
  error: { label: 'Offline', color: colors.semantic.error },
  ended: { label: 'Ended', color: colors.neutral.textSecondary },
};

export function AudioLessonHeader({
  lessonTitle,
  callStatus,
  userName,
  streak = 12,
  onBack,
}: AudioLessonHeaderProps) {
  const statusUi = STATUS_UI[callStatus];

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>AI Teacher</Text>
          <View style={styles.statusRow}>
            <View style={[styles.onlineDot, { backgroundColor: statusUi.color }]} />
            <Text style={[styles.statusText, { color: statusUi.color }]}>{statusUi.label}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable hitSlop={8} style={styles.iconButton}>
            <SymbolView
              name={{ ios: 'video.fill', android: 'videocam', web: 'videocam' }}
              size={18}
              tintColor={colors.neutral.textPrimary}
            />
          </Pressable>

          <View style={styles.streakPill}>
            <SymbolView
              name={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
              size={14}
              tintColor={colors.semantic.streak}
            />
            <Text style={styles.streakText}>{streak}</Text>
          </View>

          <Pressable hitSlop={8} style={styles.iconButton}>
            <SymbolView
              name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
              size={18}
              tintColor={colors.neutral.textPrimary}
            />
          </Pressable>
        </View>
      </View>

      <Text style={styles.lessonTitle}>{lessonTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.neutral.textPrimary,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  userName: {
    marginTop: 2,
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E8',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  streakText: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.semantic.streak,
  },
  lessonTitle: {
    marginTop: 10,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
});
