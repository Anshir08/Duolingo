import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { LANGUAGE_IDS, type LanguageId } from '@/types/learning';

type LanguageState = {
  selectedLanguageId: LanguageId | null;
  hasHydrated: boolean;
  setSelectedLanguageId: (languageId: LanguageId) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

function isLanguageId(value: unknown): value is LanguageId {
  return typeof value === 'string' && LANGUAGE_IDS.includes(value as LanguageId);
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setSelectedLanguageId: (languageId) => set({ selectedLanguageId: languageId }),
      clearSelectedLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguageId: state.selectedLanguageId }),
      onRehydrateStorage: () => (_, error) => {
        if (error) {
          useLanguageStore.setState({ hasHydrated: true });
          return;
        }

        const { selectedLanguageId } = useLanguageStore.getState();

        if (selectedLanguageId && !isLanguageId(selectedLanguageId)) {
          useLanguageStore.setState({ selectedLanguageId: null, hasHydrated: true });
          return;
        }

        useLanguageStore.setState({ hasHydrated: true });
      },
    },
  ),
);

export async function clearLanguageStorage() {
  await useLanguageStore.persist.clearStorage();
  useLanguageStore.setState({ selectedLanguageId: null, hasHydrated: true });
}
