import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { colors, fontFamily } from '@/theme';

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showToggle?: boolean;
} & Pick<TextInputProps, 'keyboardType' | 'autoCapitalize' | 'autoCorrect'>;

export function AuthInput({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  showToggle = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
}: AuthInputProps) {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          style={styles.input}
          placeholderTextColor={colors.neutral.textSecondary}
        />
        {showToggle ? (
          <Pressable
            onPress={() => setHidden((current) => !current)}
            hitSlop={8}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleIcon}>{hidden ? '👁' : '👁‍🗨'}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: 12,
    backgroundColor: colors.neutral.background,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutral.textPrimary,
    padding: 0,
  },
  toggleButton: {
    marginLeft: 8,
    padding: 4,
  },
  toggleIcon: {
    fontSize: 18,
  },
});
