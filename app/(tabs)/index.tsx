import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { colors, typography } from '@/theme';

type ColorSwatch = {
  label: string;
  className: string;
  hex: string;
};

const primarySwatches: ColorSwatch[] = [
  { label: 'LINGUA PURPLE', className: 'bg-lingua-purple', hex: colors.primary.purple },
  { label: 'LINGUA DEEP PURPLE', className: 'bg-lingua-deep-purple', hex: colors.primary.deepPurple },
  { label: 'LINGUA BLUE', className: 'bg-lingua-blue', hex: colors.primary.blue },
  { label: 'LINGUA GREEN', className: 'bg-lingua-green', hex: colors.primary.green },
];

const semanticSwatches: ColorSwatch[] = [
  { label: 'SUCCESS', className: 'bg-success', hex: colors.semantic.success },
  { label: 'WARNING', className: 'bg-warning', hex: colors.semantic.warning },
  { label: 'STREAK', className: 'bg-streak', hex: colors.semantic.streak },
  { label: 'ERROR', className: 'bg-error', hex: colors.semantic.error },
  { label: 'INFO', className: 'bg-info', hex: colors.semantic.info },
];

const neutralSwatches: ColorSwatch[] = [
  { label: 'TEXT / PRIMARY', className: 'bg-ink', hex: colors.neutral.textPrimary },
  { label: 'TEXT / SECONDARY', className: 'bg-muted', hex: colors.neutral.textSecondary },
  { label: 'BORDER', className: 'bg-border', hex: colors.neutral.border },
  { label: 'SURFACE', className: 'bg-surface', hex: colors.neutral.surface },
  { label: 'BACKGROUND', className: 'bg-background border border-border', hex: colors.neutral.background },
];

const typographyStyles = [
  { style: 'H1', className: 'text-h1', ...typography.h1 },
  { style: 'H2', className: 'text-h2', ...typography.h2 },
  { style: 'H3', className: 'text-h3', ...typography.h3 },
  { style: 'H4', className: 'text-h4', ...typography.h4 },
  { style: 'Body Large', className: 'text-body-lg', ...typography.bodyLg },
  { style: 'Body Medium', className: 'text-body-md', ...typography.bodyMd },
  { style: 'Body Small', className: 'text-body-sm', ...typography.bodySm },
  { style: 'Caption', className: 'text-caption', ...typography.caption },
] as const;

function ColorGroup({ title, swatches }: { title: string; swatches: ColorSwatch[] }) {
  return (
    <View className="mb-6">
      <Text className="text-caption font-poppins-semibold text-muted mb-3 tracking-wider">
        {title}
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {swatches.map((swatch) => (
          <View key={swatch.label} className="w-[46%]">
            <View className={`h-14 rounded-xl ${swatch.className}`} />
            <Text className="text-caption font-poppins-semibold text-ink mt-2">{swatch.label}</Text>
            <Text className="text-caption text-muted">{swatch.hex}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function DesignSystemScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="px-6 py-10 pb-16">
      <Link href="/onboarding" asChild>
        <Pressable className="mb-6 self-start rounded-xl bg-lingua-purple px-4 py-3 active:opacity-90">
          <Text className="text-body-md font-poppins-semibold text-background">
            View Onboarding
          </Text>
        </Pressable>
      </Link>

      <Text className="text-caption font-poppins-semibold text-muted mb-1">01</Text>
      <Text className="text-h1 text-ink mb-8">Design Style Guide</Text>

      <View className="mb-8">
        <Text className="text-caption font-poppins-semibold text-muted mb-4 tracking-wider">
          BRAND
        </Text>
        <View className="flex-row items-center gap-3">
          <Image
            source={require('@/assets/images/moscot-logo.png')}
            className="h-14 w-14"
            resizeMode="contain"
          />
          <Text className="text-h2 text-ink">lingua</Text>
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-caption font-poppins-semibold text-muted mb-4 tracking-wider">
          COLORS
        </Text>
        <ColorGroup title="PRIMARY" swatches={primarySwatches} />
        <ColorGroup title="SEMANTIC" swatches={semanticSwatches} />
        <ColorGroup title="NEUTRALS" swatches={neutralSwatches} />
      </View>

      <View>
        <Text className="text-caption font-poppins-semibold text-muted mb-2 tracking-wider">
          TYPOGRAPHY
        </Text>
        <Text className="text-body-md text-muted mb-4">
          Poppins — Modern, geometric sans-serif typeface
        </Text>

        <View className="rounded-2xl border border-border overflow-hidden">
          <View className="flex-row bg-surface px-4 py-3 border-b border-border">
            <Text className="text-caption font-poppins-semibold text-muted w-[22%]">Style</Text>
            <Text className="text-caption font-poppins-semibold text-muted w-[28%]">Usage</Text>
            <Text className="text-caption font-poppins-semibold text-muted w-[14%]">Size</Text>
            <Text className="text-caption font-poppins-semibold text-muted w-[18%]">Weight</Text>
            <Text className="text-caption font-poppins-semibold text-muted w-[18%]">Line H.</Text>
          </View>

          {typographyStyles.map((item, index) => (
            <View
              key={item.style}
              className={`px-4 py-4 ${index < typographyStyles.length - 1 ? 'border-b border-border' : ''}`}
            >
              <View className="flex-row items-center mb-2">
                <Text className="text-caption font-poppins-semibold text-ink w-[22%]">
                  {item.style}
                </Text>
                <Text className="text-caption text-muted w-[28%]">{item.usage}</Text>
                <Text className="text-caption text-muted w-[14%]">{item.size}px</Text>
                <Text className="text-caption text-muted w-[18%]">{item.weight}</Text>
                <Text className="text-caption text-muted w-[18%]">{item.lineHeight}</Text>
              </View>
              <Text className={`${item.className} text-ink`}>
                The quick brown fox jumps over the lazy dog
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
