import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BrandHeader,
  PrimaryButton,
  SpeechBubble,
} from '@/components/onboarding/OnboardingElements';
import { colors, fontFamily } from '@/theme';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BrandHeader />
        </View>

        <View style={styles.copySection}>
          <Text style={styles.headline}>Your AI language</Text>
          <Text style={styles.headlineAccent}>teacher.</Text>
          <Text style={styles.subheadline}>
            Real conversations, personalized lessons,{'\n'}anytime, anywhere.
          </Text>
        </View>

        <View style={styles.mascotSection}>
          <View style={styles.mascotStage}>
            <SpeechBubble
              label="Hello!"
              backgroundColor="#EAF2FF"
              textColor={colors.neutral.textPrimary}
              style={styles.bubbleHello}
            />
            <SpeechBubble
              label="¡Hola!"
              backgroundColor="#EDE8FF"
              textColor={colors.primary.purple}
              style={styles.bubbleHola}
            />
            <SpeechBubble
              label="你好!"
              backgroundColor="#FFEFE6"
              textColor="#E2553A"
              style={styles.bubbleNihao}
            />
            <Image
              source={require('@/assets/images/mascot-welcome.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <PrimaryButton label="Get Started" onPress={() => router.push('/sign-up')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 12,
  },
  copySection: {
    marginTop: 28,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headline: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 38,
    color: colors.neutral.textPrimary,
    textAlign: 'center',
  },
  headlineAccent: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 38,
    color: colors.primary.purple,
    textAlign: 'center',
  },
  subheadline: {
    marginTop: 16,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
  },
  mascotSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotStage: {
    width: 320,
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mascotImage: {
    width: 280,
    height: 280,
  },
  bubbleHello: {
    top: 18,
    left: 8,
  },
  bubbleHola: {
    top: 4,
    right: 12,
  },
  bubbleNihao: {
    top: 96,
    right: -4,
  },
  footer: {
    paddingBottom: 24,
    paddingTop: 8,
  },
});
