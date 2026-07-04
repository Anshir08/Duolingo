import { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LanguageOption } from '@/components/language/LanguageOption';
import { languages } from '@/data/languages';
import { useLanguageStore } from '@/store/languageStore';
import type { LanguageId } from '@/types/learning';
import { colors, fontFamily } from '@/theme';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const setSelectedLanguageId = useLanguageStore((state) => state.setSelectedLanguageId);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<LanguageId>(languages[0]?.id ?? 'spanish');

  useEffect(() => {
    if (selectedLanguageId) {
      setSelectedId(selectedLanguageId);
    }
  }, [selectedLanguageId, hasHydrated]);

  const filteredLanguages = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return languages;
    }

    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(query) ||
        language.nativeName.toLowerCase().includes(query),
    );
  }, [search]);

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  const handleBack = () => {
    if (selectedLanguageId) {
      router.back();
      return;
    }

    router.replace('/onboarding');
  };

  const handleSeeAllLanguages = () => {
    setSelectedLanguageId(selectedId);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} hitSlop={12} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Choose a language</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search languages"
            placeholderTextColor={colors.neutral.textSecondary}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Popular</Text>

        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((language) => (
            <LanguageOption
              key={language.id}
              language={language}
              selected={language.id === selectedId}
              onPress={() => setSelectedId(language.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No languages match your search.</Text>
        )}

        <Pressable
          onPress={handleSeeAllLanguages}
          style={({ pressed }) => [styles.seeAllButton, pressed && styles.seeAllButtonPressed]}
        >
          <Text style={styles.globeIcon}>✅</Text>
          <Text style={styles.seeAllLabel}>Continue</Text>
        </Pressable>
      </ScrollView>

      <Image
        source={require('@/assets/images/earth.png')}
        style={styles.footerIllustration}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.neutral.textPrimary,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.neutral.textPrimary,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 999,
    backgroundColor: colors.neutral.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutral.textSecondary,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
    padding: 0,
  },
  sectionTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
    marginBottom: 12,
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral.textSecondary,
    textAlign: 'center',
    paddingVertical: 32,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    backgroundColor: colors.neutral.background,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  seeAllButtonPressed: {
    opacity: 0.92,
  },
  globeIcon: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 10,
  },
  seeAllLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textPrimary,
  },
  footerIllustration: {
    width: '100%',
    height: 140,
  },
});
