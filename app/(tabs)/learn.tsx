import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  LearnSegmentedControl,
  PracticePlaceholder,
} from "@/components/learn/LearnSegmentedControl";
import { LessonListItemCard } from "@/components/learn/LessonListItemCard";
import { useLearnScreenData } from "@/components/learn/useLearnScreenData";
import { colors, fontFamily, lessonImages } from "@/theme";

export default function LearnScreen() {
	const router = useRouter();
	const learnData = useLearnScreenData();
	const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

	if (!learnData) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator color={colors.primary.purple} />
			</View>
		);
	}

	const heroSource = lessonImages[learnData.activeLesson.imageKey];

	return (
		<SafeAreaView style={styles.safeArea} edges={["top"]}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.headerRow}>
					<Pressable
						onPress={() => router.back()}
						hitSlop={12}
						style={styles.backButton}
					>
						<Text style={styles.backIcon}>←</Text>
					</Pressable>

					<View style={styles.headerCopy}>
						<Text style={styles.headerTitle}>
							{learnData.activeLesson.title}
						</Text>
						<Text style={styles.headerSubtitle}>
            Unit {learnData.unit.order} •{' '}
            {Math.min(learnData.completedCount + 1, learnData.totalCount)} / {learnData.totalCount}{' '} lessons
						</Text>
					</View>

					<Pressable hitSlop={10} style={styles.bookmarkButton}>
						<SymbolView
							name={{
								ios: "bookmark",
								android: "bookmark_border",
								web: "bookmark_border",
							}}
							size={22}
							tintColor={colors.semantic.streak}
						/>
					</Pressable>
				</View>

				<Image
					source={heroSource}
					style={styles.heroImage}
					resizeMode="cover"
				/>

				<View style={styles.body}>
					<LearnSegmentedControl
						activeTab={activeTab}
						onChange={setActiveTab}
					/>

					{activeTab === "lessons" ? (
						learnData.lessons.map(({ lesson, status, index }) => (
							<LessonListItemCard
								key={lesson.id}
								lesson={lesson}
								lessonNumber={index + 1}
								status={status}
								totalLessons={learnData.totalCount}
								onPress={() =>
									router.push({
										pathname: "/lesson/[id]",
										params: { id: lesson.id },
									})
								}
							/>
						))
					) : (
						<PracticePlaceholder />
					)}
				</View>
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
		paddingBottom: 24,
	},
	loading: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.neutral.background,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 12,
	},
	backButton: {
		width: 36,
		height: 36,
		alignItems: "flex-start",
		justifyContent: "center",
	},
	backIcon: {
		fontSize: 24,
		lineHeight: 28,
		color: colors.neutral.textPrimary,
	},
	headerCopy: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 8,
	},
	headerTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 18,
		lineHeight: 24,
		color: colors.neutral.textPrimary,
		textAlign: "center",
	},
	headerSubtitle: {
		marginTop: 2,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.neutral.textSecondary,
		textAlign: "center",
	},
	bookmarkButton: {
		width: 36,
		height: 36,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	heroImage: {
		width: "100%",
		height: 220,
		backgroundColor: colors.neutral.surface,
	},
	body: {
		paddingHorizontal: 20,
		paddingTop: 18,
	},
});
