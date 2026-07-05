import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AgentConnectionStatus } from '@/components/stream/constants';
import { colors, fontFamily } from '@/theme';

type AgentConnectionBannerProps = {
  status: AgentConnectionStatus;
  errorMessage?: string | null;
  onRetry?: () => void;
};

const STATUS_COPY: Record<
  AgentConnectionStatus,
  { label: string; tone: 'neutral' | 'success' | 'warning' | 'error' }
> = {
  idle: { label: 'AI teacher waiting to join...', tone: 'neutral' },
  connecting: { label: 'Connecting AI teacher...', tone: 'warning' },
  connected: { label: 'AI teacher connected', tone: 'success' },
  failed: { label: 'AI teacher connection failed', tone: 'error' },
};

export function AgentConnectionBanner({
  status,
  errorMessage,
  onRetry,
}: AgentConnectionBannerProps) {
  const copy = STATUS_COPY[status];
  const toneColor =
    copy.tone === 'success'
      ? colors.primary.green
      : copy.tone === 'warning'
        ? colors.semantic.streak
        : copy.tone === 'error'
          ? colors.semantic.error
          : colors.neutral.textSecondary;

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: toneColor }]} />
        <View style={styles.copy}>
          <Text style={styles.label}>{copy.label}</Text>
          <Text style={styles.meta}>Voice-only AI teacher session</Text>
        </View>
      </View>

      {status === 'failed' && errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      {status === 'failed' && onRetry ? (
        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryLabel}>Retry AI teacher</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.neutral.surface,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral.textPrimary,
  },
  meta: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral.textSecondary,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.semantic.error,
  },
  retryButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  retryLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primary.purple,
  },
});
