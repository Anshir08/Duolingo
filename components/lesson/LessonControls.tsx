import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { colors, fontFamily } from '@/theme';

type LessonControlsProps = {
  micEnabled: boolean;
  subtitlesEnabled: boolean;
  onToggleMic: () => void;
  onToggleSubtitles: () => void;
  onEndCall: () => void;
};

export function LessonControls({
  micEnabled,
  subtitlesEnabled,
  onToggleMic,
  onToggleSubtitles,
  onEndCall,
}: LessonControlsProps) {
  return (
    <View style={styles.row}>
      <ControlButton
        label="Camera"
        icon={{ ios: 'video.slash.fill', android: 'videocam_off', web: 'videocam_off' }}
        active={false}
        disabled
        onPress={() => {}}
      />

      <ControlButton
        label="Mic"
        icon={{ ios: micEnabled ? 'mic.fill' : 'mic.slash.fill', android: 'mic', web: 'mic' }}
        active={micEnabled}
        onPress={onToggleMic}
      />

      <ControlButton
        label="Subtitles"
        icon={{
          ios: 'captions.bubble.fill',
          android: 'closed_caption',
          web: 'closed_caption',
        }}
        active={subtitlesEnabled}
        onPress={onToggleSubtitles}
      />

      <ControlButton
        label="End Call"
        icon={{ ios: 'phone.down.fill', android: 'call_end', web: 'call_end' }}
        destructive
        onPress={onEndCall}
      />
    </View>
  );
};

type ControlButtonProps = {
  label: string;
  icon: SymbolViewProps['name'];
  active?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

function ControlButton({
  label,
  icon,
  active = true,
  destructive,
  disabled,
  onPress,
}: ControlButtonProps) {
  return (
    <View style={styles.item}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          destructive && styles.buttonDestructive,
          !destructive && !active && styles.buttonMuted,
          disabled && styles.buttonDisabled,
        ]}
      >
        <SymbolView
          name={icon}
          size={22}
          tintColor={destructive ? colors.neutral.background : colors.neutral.textPrimary}
        />
      </Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  item: {
    alignItems: 'center',
    width: '22%',
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.neutral.background,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.neutral.textPrimary,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonMuted: {
    opacity: 0.72,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonDestructive: {
    backgroundColor: colors.semantic.error,
    borderColor: colors.semantic.error,
  },
  label: {
    marginTop: 8,
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
});
