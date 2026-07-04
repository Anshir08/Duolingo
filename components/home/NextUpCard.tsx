import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { colors, fontFamily, placeholderImages } from '@/theme';

export function NextUpCard() {
  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Text style={styles.label}>Next up</Text>
        <Text style={styles.title}>AI Video Call</Text>
        <Text style={styles.subtitle}>Practice speaking</Text>
      </View>

      <View style={styles.visualWrap}>
        <Image source={{ uri: placeholderImages.teacherAvatar }} style={styles.avatar} />
        <Pressable style={styles.videoButton}>
          <SymbolView
            name={{ ios: 'video.fill', android: 'videocam', web: 'videocam' }}
            size={18}
            tintColor={colors.neutral.background}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEFBF3',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 8,
  },
  copy: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textSecondary,
  },
  visualWrap: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.neutral.surface,
  },
  videoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#EEFBF3',
  },
});
