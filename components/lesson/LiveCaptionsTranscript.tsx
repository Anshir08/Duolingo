import { StyleSheet, Text, View } from 'react-native';

import type { LiveCaptionEntry } from '@/components/lesson/useLiveLessonCaptions';
import { colors, fontFamily } from '@/theme';

type LiveCaptionsTranscriptProps = {
  entries: LiveCaptionEntry[];
  visible: boolean;
};

export function LiveCaptionsTranscript({ entries, visible }: LiveCaptionsTranscriptProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Live captions</Text>

      {entries.length === 0 ? (
        <Text style={styles.placeholder}>
          Captions will appear here as you and your AI teacher speak.
        </Text>
      ) : (
        entries.map((entry) => (
          <View
            key={entry.id}
            style={[
              styles.line,
              entry.speaker === 'teacher' ? styles.teacherLine : styles.userLine,
            ]}
          >
            <Text style={styles.speaker}>
              {entry.speaker === 'teacher' ? 'AI Teacher' : 'You'}
            </Text>
            <Text style={styles.text}>{entry.text}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.neutral.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    gap: 10,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  placeholder: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
  },
  line: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
  },
  teacherLine: {
    backgroundColor: '#F3EEFF',
  },
  userLine: {
    backgroundColor: '#EAF2FF',
  },
  speaker: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.neutral.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
});
