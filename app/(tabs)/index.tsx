import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContinueLearningCard } from '@/components/home/ContinueLearningCard';
import { DailyGoalCard } from '@/components/home/DailyGoalCard';
import { HomeHeader } from '@/components/home/HomeHeader';
import { NextUpCard } from '@/components/home/NextUpCard';
import { TodaysPlanSection } from '@/components/home/TodaysPlanSection';
import { useHomeData } from '@/components/home/useHomeData';
import { colors } from '@/theme';

function getUserDisplayName(firstName?: string | null, username?: string | null) {
  if (firstName?.trim()) {
    return firstName.trim();
  }

  if (username?.trim()) {
    return username.trim();
  }

  return 'Learner';
}

export default function HomeScreen() {
  const { user, isLoaded } = useUser();
  const homeData = useHomeData();

  if (!isLoaded || !homeData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary.purple} />
      </View>
    );
  }

  const userName = getUserDisplayName(user?.firstName, user?.username);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          language={homeData.language}
          greeting={homeData.greeting}
          userName={userName}
          streak={homeData.streak}
        />

        <DailyGoalCard currentXp={homeData.dailyXp.current} goalXp={homeData.dailyXp.goal} />

        <ContinueLearningCard
          language={homeData.language}
          unit={homeData.currentUnit}
          lesson={homeData.currentLesson}
          levelLabel={homeData.levelLabel}
        />

        <TodaysPlanSection items={homeData.todaysPlan} />

        <NextUpCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.background,
  },
});
