import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { colors, fontFamily, images, placeholderImages } from '@/theme';

type TeacherPreviewProps = {
  message: string;
  languageName: string;
  teachingFocus: string;
};

export function TeacherPreview({ message, languageName, teachingFocus }: TeacherPreviewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.backgroundGlow} />

      <View style={styles.userInset}>
        <Image source={{ uri: placeholderImages.studentAvatar }} style={styles.userImage} />
      </View>

      <Image source={images.mascotWelcome} style={styles.mascot} resizeMode="contain" />

      <View style={styles.speechBubble}>
        <View style={styles.bubbleCopy}>
          <Text style={styles.bubbleText}>{message}</Text>
          <Text style={styles.bubbleFocus}>
            {languageName} • {teachingFocus}
          </Text>
        </View>
        <Pressable hitSlop={8} style={styles.speakerButton}>
          <SymbolView
            name={{ ios: 'speaker.wave.2.fill', android: 'volume_up', web: 'volume_up' }}
            size={18}
            tintColor={colors.primary.blue}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: '#EDE8FF',
    minHeight: 320,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  backgroundGlow: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    bottom: 60,
    borderRadius: 24,
    backgroundColor: '#F7F4FF',
  },
  userInset: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 72,
    height: 96,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.neutral.background,
    backgroundColor: colors.neutral.surface,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  mascot: {
    width: 220,
    height: 220,
    marginTop: 8,
  },
  speechBubble: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.background,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: colors.neutral.textPrimary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bubbleCopy: {
    flex: 1,
    paddingRight: 8,
  },
  bubbleText: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
  bubbleFocus: {
    marginTop: 4,
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
  },
  speakerButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
