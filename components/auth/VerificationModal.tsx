import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, fontFamily } from '@/theme';

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  onComplete: (code: string) => Promise<void>;
  errorMessage?: string | null;
};

export function VerificationModal({
  visible,
  onClose,
  onComplete,
  errorMessage,
}: VerificationModalProps) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible) {
      setCode('');
      setIsSubmitting(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible]);

  const submitCode = async (nextCode: string) => {
    if (nextCode.length !== 6 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onComplete(nextCode);
    } catch {
      setCode('');
      inputRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 6);
    setCode(digits);

    if (digits.length === 6) {
      void submitCode(digits);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View style={styles.handle} />
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.message}>
              We sent a verification code to your email. Enter the 6-digit code below to continue.
            </Text>

            <View style={styles.codeInputArea}>
              <Pressable style={styles.codeRow} onPress={() => inputRef.current?.focus()}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <View
                    key={index}
                    style={[styles.codeBox, code.length === index && styles.codeBoxActive]}
                  >
                    <Text style={styles.codeDigit}>{code[index] ?? ''}</Text>
                  </View>
                ))}
              </Pressable>

              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChange}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
                caretHidden
                editable={!isSubmitting}
                style={styles.overlayInput}
              />
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {isSubmitting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.primary.purple} />
              </View>
            ) : null}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(13, 19, 43, 0.45)',
  },
  keyboardAvoid: {
    width: '100%',
  },
  sheet: {
    backgroundColor: colors.neutral.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.neutral.border,
    marginBottom: 20,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.neutral.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  codeInputArea: {
    position: 'relative',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeBox: {
    width: '15%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBoxActive: {
    borderColor: colors.primary.purple,
  },
  codeDigit: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.neutral.textPrimary,
  },
  overlayInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0,
  },
  errorText: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.semantic.error,
    textAlign: 'center',
  },
  loadingRow: {
    marginTop: 16,
    alignItems: 'center',
  },
});
