import type { AITeacherPrompt, LanguageId, Lesson } from "@/types/learning";
import { getUnitById } from "./units";

function createAITeacherPrompt(
	languageName: string,
	teachingFocus: string,
	openingLine: string,
): AITeacherPrompt {
	return {
		teachingFocus,
		openingLine,
		systemPrompt: `You are a friendly English-speaking ${languageName} teacher for beginner learners. Always explain in clear English, teach ${languageName} phrases slowly, ask the learner to repeat, and give short encouraging feedback. Focus on: ${teachingFocus}. Keep responses brief and conversational.`,
	};
}

export const lessons: Lesson[] = [
	// Spanish — Unit 1
	{
		id: "es-lesson-1",
		unitId: "unit-es-1",
		languageId: "spanish",
		order: 1,
		title: "Hello & Goodbye",
		description: "Learn the most common Spanish greetings for any time of day.",
		type: "mixed",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [
			{
				id: "es-g1",
				description: "Greet someone in the morning, afternoon, and evening.",
			},
			{ id: "es-g2", description: "Say goodbye politely." },
		],
		vocabulary: [
			{
				id: "es-v1",
				word: "Hola",
				translation: "Hello",
				pronunciation: "OH-lah",
			},
			{
				id: "es-v2",
				word: "Adiós",
				translation: "Goodbye",
				pronunciation: "ah-DYOHS",
			},
			{
				id: "es-v3",
				word: "Buenos días",
				translation: "Good morning",
				pronunciation: "BWEH-nohs DEE-ahs",
			},
			{
				id: "es-v4",
				word: "Buenas noches",
				translation: "Good night",
				pronunciation: "BWEH-nahs NOH-ches",
			},
		],
		phrases: [
			{
				id: "es-p1",
				phrase: "¡Hola! ¿Cómo estás?",
				translation: "Hi! How are you?",
			},
			{ id: "es-p2", phrase: "Hasta luego.", translation: "See you later." },
		],
		activities: [
			{
				id: "es-a1",
				type: "listening",
				title: "Hear the greeting",
				prompt: "Listen and choose the correct greeting for the morning.",
			},
			{
				id: "es-a2",
				type: "speaking",
				title: "Say it out loud",
				prompt: 'Repeat "Buenos días" with clear pronunciation.',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"basic greetings and farewells",
			"Hi! Let's start with simple Spanish greetings you can use every day.",
		),
	},
	{
		id: "es-lesson-2",
		unitId: "unit-es-1",
		languageId: "spanish",
		order: 2,
		title: "Introduce Yourself",
		description: "Share your name and ask others for theirs.",
		type: "phrases",
		imageKey: "palace",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [
			{ id: "es-g3", description: "Say your name in Spanish." },
			{ id: "es-g4", description: "Ask someone what their name is." },
		],
		vocabulary: [
			{ id: "es-v5", word: "Yo", translation: "I" },
			{
				id: "es-v6",
				word: "Me llamo",
				translation: "My name is",
				pronunciation: "meh YAH-moh",
			},
			{ id: "es-v7", word: "Tú", translation: "You (informal)" },
			{
				id: "es-v8",
				word: "Mucho gusto",
				translation: "Nice to meet you",
				pronunciation: "MOO-choh GOOS-toh",
			},
		],
		phrases: [
			{ id: "es-p3", phrase: "Me llamo Ana.", translation: "My name is Ana." },
			{
				id: "es-p4",
				phrase: "¿Cómo te llamas?",
				translation: "What is your name?",
			},
			{ id: "es-p5", phrase: "Mucho gusto.", translation: "Nice to meet you." },
		],
		activities: [
			{
				id: "es-a3",
				type: "speaking",
				title: "Introduce yourself",
				prompt: 'Say "Me llamo..." followed by your name.',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"self-introductions and asking names",
			"Great job so far! Now let's practice introducing yourself in Spanish.",
		),
	},
	// Spanish — Unit 2
	{
		id: "es-lesson-3",
		unitId: "unit-es-2",
		languageId: "spanish",
		order: 1,
		title: "Numbers 1–10",
		description: "Count from one to ten in Spanish.",
		type: "vocabulary",
		imageKey: "treasure",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "es-g5", description: "Count from 1 to 10 in Spanish." }],
		vocabulary: [
			{ id: "es-v9", word: "Uno", translation: "One", pronunciation: "OO-noh" },
			{ id: "es-v10", word: "Dos", translation: "Two", pronunciation: "dohs" },
			{
				id: "es-v11",
				word: "Tres",
				translation: "Three",
				pronunciation: "trehs",
			},
			{
				id: "es-v12",
				word: "Cuatro",
				translation: "Four",
				pronunciation: "KWAH-troh",
			},
			{
				id: "es-v13",
				word: "Cinco",
				translation: "Five",
				pronunciation: "SEEN-koh",
			},
		],
		phrases: [
			{
				id: "es-p6",
				phrase: "Tengo cinco libros.",
				translation: "I have five books.",
			},
		],
		activities: [
			{
				id: "es-a4",
				type: "matching",
				title: "Match the number",
				prompt: "Match each Spanish number to its English meaning.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"numbers one through ten",
			"Let's count together in Spanish — this is useful everywhere you go!",
		),
	},
	{
		id: "es-lesson-4",
		unitId: "unit-es-2",
		languageId: "spanish",
		order: 2,
		title: "Please & Thank You",
		description: "Use polite words in everyday situations.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [
			{
				id: "es-g6",
				description: "Use please and thank you naturally in Spanish.",
			},
		],
		vocabulary: [
			{
				id: "es-v14",
				word: "Por favor",
				translation: "Please",
				pronunciation: "por fah-VOR",
			},
			{
				id: "es-v15",
				word: "Gracias",
				translation: "Thank you",
				pronunciation: "GRAH-syahs",
			},
			{
				id: "es-v16",
				word: "De nada",
				translation: "You're welcome",
				pronunciation: "deh NAH-dah",
			},
		],
		phrases: [
			{
				id: "es-p7",
				phrase: "Un café, por favor.",
				translation: "A coffee, please.",
			},
			{
				id: "es-p8",
				phrase: "Muchas gracias.",
				translation: "Thank you very much.",
			},
		],
		activities: [
			{
				id: "es-a5",
				type: "speaking",
				title: "Polite request",
				prompt: 'Ask for water politely using "por favor".',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"polite expressions like please and thank you",
			"Politeness goes a long way — let me teach you a few essential phrases.",
		),
	},
	{
		id: "es-lesson-5",
		unitId: "unit-es-2",
		languageId: "spanish",
		order: 3,
		title: "At the Café",
		description: "Order a drink and respond to simple questions.",
		type: "audio",
		imageKey: "streak-fire",
		xpReward: 15,
		estimatedMinutes: 8,
		goals: [
			{ id: "es-g7", description: "Order a simple drink in Spanish." },
			{ id: "es-g8", description: "Understand a basic café question." },
		],
		vocabulary: [
			{
				id: "es-v17",
				word: "Agua",
				translation: "Water",
				pronunciation: "AH-gwah",
			},
			{
				id: "es-v18",
				word: "Café",
				translation: "Coffee",
				pronunciation: "kah-FEH",
			},
			{
				id: "es-v19",
				word: "Quiero",
				translation: "I want",
				pronunciation: "KYEH-roh",
			},
		],
		phrases: [
			{
				id: "es-p9",
				phrase: "Quiero un café.",
				translation: "I want a coffee.",
			},
			{ id: "es-p10", phrase: "¿Para llevar?", translation: "To go?" },
		],
		activities: [
			{
				id: "es-a6",
				type: "listening",
				title: "Café conversation",
				prompt: "Listen to the barista and choose your response.",
			},
			{
				id: "es-a7",
				type: "speaking",
				title: "Place your order",
				prompt: 'Order a coffee using "Quiero un café, por favor."',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"ordering at a café",
			"Imagine we're at a café in Madrid — let's practice ordering together!",
		),
	},
	// French — Unit 1
	{
		id: "fr-lesson-1",
		unitId: "unit-fr-1",
		languageId: "french",
		order: 1,
		title: "Bonjour!",
		description: "Learn essential French greetings for any occasion.",
		type: "mixed",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [
			{
				id: "fr-g1",
				description: "Greet someone formally and informally in French.",
			},
		],
		vocabulary: [
			{
				id: "fr-v1",
				word: "Bonjour",
				translation: "Hello / Good day",
				pronunciation: "bohn-ZHOOR",
			},
			{
				id: "fr-v2",
				word: "Bonsoir",
				translation: "Good evening",
				pronunciation: "bohn-SWAR",
			},
			{
				id: "fr-v3",
				word: "Salut",
				translation: "Hi (informal)",
				pronunciation: "sah-LOO",
			},
			{
				id: "fr-v4",
				word: "Au revoir",
				translation: "Goodbye",
				pronunciation: "oh ruh-VWAR",
			},
		],
		phrases: [
			{
				id: "fr-p1",
				phrase: "Bonjour! Comment allez-vous?",
				translation: "Hello! How are you? (formal)",
			},
			{
				id: "fr-p2",
				phrase: "Salut! Ça va?",
				translation: "Hi! How's it going?",
			},
		],
		activities: [
			{
				id: "fr-a1",
				type: "listening",
				title: "Pick the greeting",
				prompt: "Choose the correct greeting for the evening.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"French",
			"French greetings for different times of day",
			"Bonjour! Ready to learn your first French greetings?",
		),
	},
	{
		id: "fr-lesson-2",
		unitId: "unit-fr-1",
		languageId: "french",
		order: 2,
		title: "My Name Is...",
		description: "Introduce yourself and meet someone new.",
		type: "phrases",
		imageKey: "palace",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [
			{
				id: "fr-g2",
				description: "Introduce yourself and ask for a name in French.",
			},
		],
		vocabulary: [
			{ id: "fr-v5", word: "Je", translation: "I", pronunciation: "zhuh" },
			{
				id: "fr-v6",
				word: "Je m'appelle",
				translation: "My name is",
				pronunciation: "zhuh mah-PELL",
			},
			{
				id: "fr-v7",
				word: "Enchanté",
				translation: "Nice to meet you (m.)",
				pronunciation: "ahn-shahn-TAY",
			},
		],
		phrases: [
			{
				id: "fr-p3",
				phrase: "Je m'appelle Marie.",
				translation: "My name is Marie.",
			},
			{
				id: "fr-p4",
				phrase: "Comment tu t'appelles?",
				translation: "What is your name? (informal)",
			},
		],
		activities: [
			{
				id: "fr-a2",
				type: "speaking",
				title: "Say your name",
				prompt: 'Introduce yourself with "Je m\'appelle..."',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"French",
			"introducing yourself in French",
			"Let's practice saying your name — a perfect first conversation skill!",
		),
	},
	// French — Unit 2
	{
		id: "fr-lesson-3",
		unitId: "unit-fr-2",
		languageId: "french",
		order: 1,
		title: "Ordering Food",
		description: "Ask for food and drinks at a restaurant.",
		type: "audio",
		imageKey: "treasure",
		xpReward: 15,
		estimatedMinutes: 8,
		goals: [{ id: "fr-g3", description: "Order a simple meal in French." }],
		vocabulary: [
			{
				id: "fr-v8",
				word: "Je voudrais",
				translation: "I would like",
				pronunciation: "zhuh voo-DRAY",
			},
			{
				id: "fr-v9",
				word: "Une baguette",
				translation: "A baguette",
				pronunciation: "oon bah-GET",
			},
			{
				id: "fr-v10",
				word: "L'eau",
				translation: "Water",
				pronunciation: "loh",
			},
		],
		phrases: [
			{
				id: "fr-p5",
				phrase: "Je voudrais une baguette, s'il vous plaît.",
				translation: "I would like a baguette, please.",
			},
			{
				id: "fr-p6",
				phrase: "L'addition, s'il vous plaît.",
				translation: "The check, please.",
			},
		],
		activities: [
			{
				id: "fr-a3",
				type: "speaking",
				title: "Order lunch",
				prompt: "Order water using \"Je voudrais de l'eau, s'il vous plaît.\"",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"French",
			"ordering food at a restaurant",
			"Picture a Parisian café — let's order something delicious together!",
		),
	},
	{
		id: "fr-lesson-4",
		unitId: "unit-fr-2",
		languageId: "french",
		order: 2,
		title: "Where Is...?",
		description: "Ask for directions to common places.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "fr-g4", description: "Ask where something is located." }],
		vocabulary: [
			{ id: "fr-v11", word: "Où", translation: "Where", pronunciation: "oo" },
			{
				id: "fr-v12",
				word: "La gare",
				translation: "The train station",
				pronunciation: "lah gar",
			},
			{
				id: "fr-v13",
				word: "Le métro",
				translation: "The subway",
				pronunciation: "luh may-TROH",
			},
		],
		phrases: [
			{
				id: "fr-p7",
				phrase: "Où est la gare?",
				translation: "Where is the train station?",
			},
			{ id: "fr-p8", phrase: "C'est par ici.", translation: "It's this way." },
		],
		activities: [
			{
				id: "fr-a4",
				type: "listening",
				title: "Follow directions",
				prompt: "Listen and choose the correct direction phrase.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"French",
			"asking for directions",
			"Getting around a new city is easier with a few key questions — let's learn them!",
		),
	},
	{
		id: "fr-lesson-5",
		unitId: "unit-fr-2",
		languageId: "french",
		order: 3,
		title: "Numbers 1–10",
		description: "Count in French from one to ten.",
		type: "vocabulary",
		imageKey: "streak-fire",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "fr-g5", description: "Count from 1 to 10 in French." }],
		vocabulary: [
			{ id: "fr-v14", word: "Un", translation: "One", pronunciation: "uhn" },
			{ id: "fr-v15", word: "Deux", translation: "Two", pronunciation: "duh" },
			{
				id: "fr-v16",
				word: "Trois",
				translation: "Three",
				pronunciation: "trwah",
			},
			{ id: "fr-v17", word: "Dix", translation: "Ten", pronunciation: "deess" },
		],
		phrases: [
			{
				id: "fr-p9",
				phrase: "J'ai trois frères.",
				translation: "I have three brothers.",
			},
		],
		activities: [
			{
				id: "fr-a5",
				type: "matching",
				title: "Number match",
				prompt: "Match French numbers to their English translations.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"French",
			"French numbers one through ten",
			"Numbers are everywhere — let's count together in French!",
		),
	},
	// Japanese — Unit 1
	{
		id: "ja-lesson-1",
		unitId: "unit-ja-1",
		languageId: "japanese",
		order: 1,
		title: "Basic Greetings",
		description: "Learn hello, goodbye, and thank you in Japanese.",
		type: "mixed",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [
			{ id: "ja-g1", description: "Use basic Japanese greetings politely." },
		],
		vocabulary: [
			{
				id: "ja-v1",
				word: "こんにちは",
				translation: "Hello",
				pronunciation: "kohn-nee-chee-WAH",
			},
			{
				id: "ja-v2",
				word: "さようなら",
				translation: "Goodbye",
				pronunciation: "sah-YOH-nah-rah",
			},
			{
				id: "ja-v3",
				word: "ありがとう",
				translation: "Thank you",
				pronunciation: "ah-ree-GAH-toh",
			},
			{
				id: "ja-v4",
				word: "おはよう",
				translation: "Good morning (informal)",
				pronunciation: "oh-HAH-yoh",
			},
		],
		phrases: [
			{ id: "ja-p1", phrase: "こんにちは！", translation: "Hello!" },
			{
				id: "ja-p2",
				phrase: "ありがとうございます。",
				translation: "Thank you very much.",
			},
		],
		activities: [
			{
				id: "ja-a1",
				type: "speaking",
				title: "Morning greeting",
				prompt: 'Say "おはよう" to greet someone in the morning.',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Japanese",
			"basic Japanese greetings",
			"Konnichiwa! Let's start with greetings you'll hear every day in Japan.",
		),
	},
	{
		id: "ja-lesson-2",
		unitId: "unit-ja-1",
		languageId: "japanese",
		order: 2,
		title: "Introduce Yourself",
		description: "Say your name and where you are from.",
		type: "phrases",
		imageKey: "palace",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "ja-g2", description: "Introduce your name in Japanese." }],
		vocabulary: [
			{
				id: "ja-v5",
				word: "わたし",
				translation: "I (polite)",
				pronunciation: "wah-TAH-shee",
			},
			{
				id: "ja-v6",
				word: "名前",
				translation: "Name",
				pronunciation: "nah-MAH-eh",
			},
			{
				id: "ja-v7",
				word: "〜です",
				translation: "I am ~ (polite)",
				pronunciation: "dess",
			},
		],
		phrases: [
			{ id: "ja-p3", phrase: "わたしはサラです。", translation: "I am Sara." },
			{
				id: "ja-p4",
				phrase: "はじめまして。",
				translation: "Nice to meet you.",
			},
			{
				id: "ja-p5",
				phrase: "よろしくお願いします。",
				translation: "Please treat me well. (Nice to meet you.)",
			},
		],
		activities: [
			{
				id: "ja-a2",
				type: "speaking",
				title: "Self introduction",
				prompt: 'Say "わたしは [name] です。" with your name.',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Japanese",
			"self-introductions in Japanese",
			"Hajimemashite! Let's practice a polite self-introduction together.",
		),
	},
	// Japanese — Unit 2
	{
		id: "ja-lesson-3",
		unitId: "unit-ja-2",
		languageId: "japanese",
		order: 1,
		title: "Numbers 1–5",
		description: "Count from one to five in Japanese.",
		type: "vocabulary",
		imageKey: "treasure",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "ja-g3", description: "Count from 1 to 5 in Japanese." }],
		vocabulary: [
			{ id: "ja-v8", word: "一", translation: "One", pronunciation: "ee-chee" },
			{ id: "ja-v9", word: "二", translation: "Two", pronunciation: "nee" },
			{ id: "ja-v10", word: "三", translation: "Three", pronunciation: "sahn" },
			{ id: "ja-v11", word: "四", translation: "Four", pronunciation: "shee" },
			{ id: "ja-v12", word: "五", translation: "Five", pronunciation: "goh" },
		],
		phrases: [
			{
				id: "ja-p6",
				phrase: "りんごが三つあります。",
				translation: "There are three apples.",
			},
		],
		activities: [
			{
				id: "ja-a3",
				type: "matching",
				title: "Count in Japanese",
				prompt: "Match each Japanese number to its meaning.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Japanese",
			"Japanese numbers one through five",
			"Counting in Japanese is very useful — let's practice together!",
		),
	},
	{
		id: "ja-lesson-4",
		unitId: "unit-ja-2",
		languageId: "japanese",
		order: 2,
		title: "Excuse Me & Sorry",
		description: "Use polite phrases when navigating daily life.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [
			{ id: "ja-g4", description: "Say excuse me and sorry appropriately." },
		],
		vocabulary: [
			{
				id: "ja-v13",
				word: "すみません",
				translation: "Excuse me / Sorry",
				pronunciation: "soo-mee-mah-SEN",
			},
			{
				id: "ja-v14",
				word: "ごめんなさい",
				translation: "I'm sorry",
				pronunciation: "goh-men-nah-SAI",
			},
		],
		phrases: [
			{
				id: "ja-p7",
				phrase: "すみません、トイレはどこですか。",
				translation: "Excuse me, where is the restroom?",
			},
			{ id: "ja-p8", phrase: "ごめんなさい。", translation: "I'm sorry." },
		],
		activities: [
			{
				id: "ja-a4",
				type: "speaking",
				title: "Polite apology",
				prompt: 'Say "すみません" to get someone\'s attention politely.',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Japanese",
			"polite expressions like excuse me and sorry",
			"Politeness is important in Japanese — let's learn a couple of essential phrases.",
		),
	},
	{
		id: "ja-lesson-5",
		unitId: "unit-ja-2",
		languageId: "japanese",
		order: 3,
		title: "At the Shop",
		description: "Buy something and respond to a shopkeeper.",
		type: "audio",
		imageKey: "streak-fire",
		xpReward: 15,
		estimatedMinutes: 8,
		goals: [
			{ id: "ja-g5", description: "Ask how much something costs." },
			{ id: "ja-g6", description: "Complete a simple purchase exchange." },
		],
		vocabulary: [
			{
				id: "ja-v15",
				word: "いくら",
				translation: "How much",
				pronunciation: "ee-KOO-rah",
			},
			{
				id: "ja-v16",
				word: "これ",
				translation: "This",
				pronunciation: "KOH-reh",
			},
			{
				id: "ja-v17",
				word: "ください",
				translation: "Please give me",
				pronunciation: "koo-dah-SAI",
			},
		],
		phrases: [
			{
				id: "ja-p9",
				phrase: "これはいくらですか。",
				translation: "How much is this?",
			},
			{
				id: "ja-p10",
				phrase: "これをください。",
				translation: "This one, please.",
			},
		],
		activities: [
			{
				id: "ja-a5",
				type: "listening",
				title: "Shop dialogue",
				prompt: "Listen to the shopkeeper and choose the right response.",
			},
			{
				id: "ja-a6",
				type: "speaking",
				title: "Make a purchase",
				prompt: 'Ask "これはいくらですか。" while pointing at an item.',
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Japanese",
			"shopping and asking prices",
			"Let's pretend we're at a shop in Tokyo — ready to practice?",
		),
	},
	{
		id: "es-lesson-6",
		unitId: "unit-es-2",
		languageId: "spanish",
		order: 4,
		title: "Travel & Directions",
		description: "Ask for directions and navigate while traveling.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [
			{ id: "es-g9", description: "Ask where a place is located in Spanish." },
		],
		vocabulary: [
			{ id: "es-v20", word: "¿Dónde está?", translation: "Where is...?" },
			{ id: "es-v21", word: "La estación", translation: "The station" },
		],
		phrases: [
			{
				id: "es-p11",
				phrase: "¿Dónde está la estación?",
				translation: "Where is the station?",
			},
		],
		activities: [
			{
				id: "es-a8",
				type: "listening",
				title: "Directions",
				prompt: "Listen and pick the correct direction.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"travel and directions",
			"Let's practice finding your way in Spanish.",
		),
	},
	{
		id: "es-lesson-7",
		unitId: "unit-es-2",
		languageId: "spanish",
		order: 5,
		title: "Shopping",
		description: "Shop for items and ask about prices.",
		type: "mixed",
		imageKey: "treasure",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "es-g10", description: "Ask how much something costs." }],
		vocabulary: [
			{
				id: "es-v22",
				word: "¿Cuánto cuesta?",
				translation: "How much does it cost?",
			},
			{ id: "es-v23", word: "Tienda", translation: "Store" },
		],
		phrases: [
			{
				id: "es-p12",
				phrase: "¿Cuánto cuesta esto?",
				translation: "How much does this cost?",
			},
		],
		activities: [
			{
				id: "es-a9",
				type: "speaking",
				title: "At the shop",
				prompt: "Ask the price of an item.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"shopping phrases",
			"Time to practice shopping in Spanish.",
		),
	},
	{
		id: "es-lesson-8",
		unitId: "unit-es-2",
		languageId: "spanish",
		order: 6,
		title: "Family & Friends",
		description: "Talk about family members and friends.",
		type: "vocabulary",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "es-g11", description: "Name family members in Spanish." }],
		vocabulary: [
			{ id: "es-v24", word: "Familia", translation: "Family" },
			{ id: "es-v25", word: "Amigo", translation: "Friend" },
			{ id: "es-v26", word: "Madre", translation: "Mother" },
		],
		phrases: [
			{
				id: "es-p13",
				phrase: "Mi familia es grande.",
				translation: "My family is big.",
			},
		],
		activities: [
			{
				id: "es-a10",
				type: "matching",
				title: "Family words",
				prompt: "Match family vocabulary.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Spanish",
			"family and friends vocabulary",
			"Let's talk about the people you love.",
		),
	},
	{
		id: "ko-lesson-1",
		unitId: "unit-ko-1",
		languageId: "korean",
		order: 1,
		title: "Greetings & Introductions",
		description: "Learn essential Korean greetings.",
		type: "mixed",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "ko-g1", description: "Greet someone in Korean." }],
		vocabulary: [{ id: "ko-v1", word: "안녕하세요", translation: "Hello" }],
		phrases: [{ id: "ko-p1", phrase: "안녕하세요!", translation: "Hello!" }],
		activities: [
			{
				id: "ko-a1",
				type: "speaking",
				title: "Say hello",
				prompt: "Repeat the greeting.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Korean",
			"basic greetings",
			"Let's start with Korean greetings.",
		),
	},
	{
		id: "ko-lesson-2",
		unitId: "unit-ko-1",
		languageId: "korean",
		order: 2,
		title: "Daily Life",
		description: "Useful phrases for everyday situations.",
		type: "phrases",
		imageKey: "palace",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "ko-g2", description: "Use a daily life phrase in Korean." }],
		vocabulary: [{ id: "ko-v2", word: "감사합니다", translation: "Thank you" }],
		phrases: [
			{ id: "ko-p2", phrase: "감사합니다.", translation: "Thank you." },
		],
		activities: [
			{
				id: "ko-a2",
				type: "listening",
				title: "Daily phrases",
				prompt: "Choose the correct response.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Korean",
			"daily life phrases",
			"Let's practice everyday Korean.",
		),
	},
	{
		id: "ko-lesson-3",
		unitId: "unit-ko-1",
		languageId: "korean",
		order: 3,
		title: "At the Café",
		description: "Order drinks at a café in Korean.",
		type: "audio",
		imageKey: "streak-fire",
		xpReward: 15,
		estimatedMinutes: 8,
		goals: [{ id: "ko-g3", description: "Order a drink in Korean." }],
		vocabulary: [{ id: "ko-v3", word: "커피", translation: "Coffee" }],
		phrases: [
			{
				id: "ko-p3",
				phrase: "커피 한 잔 주세요.",
				translation: "One coffee, please.",
			},
		],
		activities: [
			{
				id: "ko-a3",
				type: "speaking",
				title: "Order coffee",
				prompt: "Place a simple order.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Korean",
			"ordering at a café",
			"Let's practice at a Korean café.",
		),
	},
	{
		id: "ko-lesson-4",
		unitId: "unit-ko-2",
		languageId: "korean",
		order: 1,
		title: "Travel & Directions",
		description: "Ask for directions in Korean.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "ko-g4", description: "Ask where something is." }],
		vocabulary: [{ id: "ko-v4", word: "어디", translation: "Where" }],
		phrases: [
			{
				id: "ko-p4",
				phrase: "화장실이 어디예요?",
				translation: "Where is the restroom?",
			},
		],
		activities: [
			{
				id: "ko-a4",
				type: "listening",
				title: "Directions",
				prompt: "Pick the right direction phrase.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Korean",
			"directions",
			"Let's find our way in Korean.",
		),
	},
	{
		id: "ko-lesson-5",
		unitId: "unit-ko-2",
		languageId: "korean",
		order: 2,
		title: "Shopping",
		description: "Shop and ask prices in Korean.",
		type: "mixed",
		imageKey: "treasure",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "ko-g5", description: "Ask how much something costs." }],
		vocabulary: [
			{ id: "ko-v5", word: "얼마예요?", translation: "How much is it?" },
		],
		phrases: [
			{
				id: "ko-p5",
				phrase: "이거 얼마예요?",
				translation: "How much is this?",
			},
		],
		activities: [
			{
				id: "ko-a5",
				type: "speaking",
				title: "Shopping",
				prompt: "Ask for a price.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Korean",
			"shopping",
			"Let's go shopping in Korean.",
		),
	},
	{
		id: "de-lesson-1",
		unitId: "unit-de-1",
		languageId: "german",
		order: 1,
		title: "Greetings & Introductions",
		description: "Learn German greetings and introductions.",
		type: "mixed",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "de-g1", description: "Greet someone in German." }],
		vocabulary: [{ id: "de-v1", word: "Hallo", translation: "Hello" }],
		phrases: [
			{
				id: "de-p1",
				phrase: "Hallo! Wie geht es dir?",
				translation: "Hello! How are you?",
			},
		],
		activities: [
			{
				id: "de-a1",
				type: "speaking",
				title: "Greet",
				prompt: "Say hello in German.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"German",
			"greetings",
			"Let's learn German greetings.",
		),
	},
	{
		id: "de-lesson-2",
		unitId: "unit-de-1",
		languageId: "german",
		order: 2,
		title: "Daily Life",
		description: "Everyday German phrases.",
		type: "phrases",
		imageKey: "palace",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "de-g2", description: "Use a daily phrase in German." }],
		vocabulary: [{ id: "de-v2", word: "Danke", translation: "Thank you" }],
		phrases: [
			{
				id: "de-p2",
				phrase: "Danke schön.",
				translation: "Thank you very much.",
			},
		],
		activities: [
			{
				id: "de-a2",
				type: "listening",
				title: "Daily life",
				prompt: "Choose the correct phrase.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"German",
			"daily life",
			"Let's practice daily German.",
		),
	},
	{
		id: "de-lesson-3",
		unitId: "unit-de-1",
		languageId: "german",
		order: 3,
		title: "At the Café",
		description: "Order at a café in German.",
		type: "audio",
		imageKey: "streak-fire",
		xpReward: 15,
		estimatedMinutes: 8,
		goals: [{ id: "de-g3", description: "Order a drink in German." }],
		vocabulary: [{ id: "de-v3", word: "Kaffee", translation: "Coffee" }],
		phrases: [
			{
				id: "de-p3",
				phrase: "Einen Kaffee, bitte.",
				translation: "A coffee, please.",
			},
		],
		activities: [
			{
				id: "de-a3",
				type: "speaking",
				title: "Order",
				prompt: "Order a coffee.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"German",
			"café orders",
			"Let's order in German.",
		),
	},
	{
		id: "de-lesson-4",
		unitId: "unit-de-2",
		languageId: "german",
		order: 1,
		title: "Travel & Directions",
		description: "Ask for directions in German.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "de-g4", description: "Ask where something is." }],
		vocabulary: [{ id: "de-v4", word: "Wo ist", translation: "Where is" }],
		phrases: [
			{
				id: "de-p4",
				phrase: "Wo ist der Bahnhof?",
				translation: "Where is the train station?",
			},
		],
		activities: [
			{
				id: "de-a4",
				type: "listening",
				title: "Directions",
				prompt: "Pick the right answer.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"German",
			"directions",
			"Let's navigate in German.",
		),
	},
	{
		id: "de-lesson-5",
		unitId: "unit-de-2",
		languageId: "german",
		order: 2,
		title: "Shopping",
		description: "Shop in German.",
		type: "mixed",
		imageKey: "treasure",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "de-g5", description: "Ask a shop question in German." }],
		vocabulary: [
			{ id: "de-v5", word: "Wie viel kostet", translation: "How much costs" },
		],
		phrases: [
			{
				id: "de-p5",
				phrase: "Wie viel kostet das?",
				translation: "How much does that cost?",
			},
		],
		activities: [
			{
				id: "de-a5",
				type: "speaking",
				title: "Shopping",
				prompt: "Ask the price.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"German",
			"shopping",
			"Let's shop in German.",
		),
	},
	{
		id: "zh-lesson-1",
		unitId: "unit-zh-1",
		languageId: "chinese",
		order: 1,
		title: "Greetings & Introductions",
		description: "Learn Mandarin greetings.",
		type: "mixed",
		imageKey: "mascot-welcome",
		xpReward: 10,
		estimatedMinutes: 5,
		goals: [{ id: "zh-g1", description: "Greet someone in Mandarin." }],
		vocabulary: [{ id: "zh-v1", word: "你好", translation: "Hello" }],
		phrases: [{ id: "zh-p1", phrase: "你好！", translation: "Hello!" }],
		activities: [
			{
				id: "zh-a1",
				type: "speaking",
				title: "Say hello",
				prompt: "Repeat 你好.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Chinese",
			"greetings",
			"Let's start with Mandarin greetings.",
		),
	},
	{
		id: "zh-lesson-2",
		unitId: "unit-zh-1",
		languageId: "chinese",
		order: 2,
		title: "Daily Life",
		description: "Everyday Mandarin phrases.",
		type: "phrases",
		imageKey: "palace",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "zh-g2", description: "Use a daily phrase in Mandarin." }],
		vocabulary: [{ id: "zh-v2", word: "谢谢", translation: "Thank you" }],
		phrases: [{ id: "zh-p2", phrase: "谢谢你。", translation: "Thank you." }],
		activities: [
			{
				id: "zh-a2",
				type: "listening",
				title: "Daily phrases",
				prompt: "Choose the correct phrase.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Chinese",
			"daily life",
			"Let's practice daily Mandarin.",
		),
	},
	{
		id: "zh-lesson-3",
		unitId: "unit-zh-1",
		languageId: "chinese",
		order: 3,
		title: "At the Café",
		description: "Order at a café in Mandarin.",
		type: "audio",
		imageKey: "streak-fire",
		xpReward: 15,
		estimatedMinutes: 8,
		goals: [{ id: "zh-g3", description: "Order a drink in Mandarin." }],
		vocabulary: [{ id: "zh-v3", word: "咖啡", translation: "Coffee" }],
		phrases: [
			{
				id: "zh-p3",
				phrase: "我要一杯咖啡。",
				translation: "I want a cup of coffee.",
			},
		],
		activities: [
			{
				id: "zh-a3",
				type: "speaking",
				title: "Order coffee",
				prompt: "Place a simple order.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Chinese",
			"café orders",
			"Let's order in Mandarin.",
		),
	},
	{
		id: "zh-lesson-4",
		unitId: "unit-zh-2",
		languageId: "chinese",
		order: 1,
		title: "Travel & Directions",
		description: "Ask for directions in Mandarin.",
		type: "phrases",
		imageKey: "earth",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "zh-g4", description: "Ask where something is." }],
		vocabulary: [{ id: "zh-v4", word: "在哪里", translation: "Where is" }],
		phrases: [
			{
				id: "zh-p4",
				phrase: "地铁在哪里？",
				translation: "Where is the subway?",
			},
		],
		activities: [
			{
				id: "zh-a4",
				type: "listening",
				title: "Directions",
				prompt: "Pick the right phrase.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Chinese",
			"directions",
			"Let's navigate in Mandarin.",
		),
	},
	{
		id: "zh-lesson-5",
		unitId: "unit-zh-2",
		languageId: "chinese",
		order: 2,
		title: "Shopping",
		description: "Shop in Mandarin.",
		type: "mixed",
		imageKey: "treasure",
		xpReward: 10,
		estimatedMinutes: 6,
		goals: [{ id: "zh-g5", description: "Ask how much something costs." }],
		vocabulary: [
			{ id: "zh-v5", word: "多少钱", translation: "How much money" },
		],
		phrases: [
			{ id: "zh-p5", phrase: "这个多少钱？", translation: "How much is this?" },
		],
		activities: [
			{
				id: "zh-a5",
				type: "speaking",
				title: "Shopping",
				prompt: "Ask the price.",
			},
		],
		aiTeacher: createAITeacherPrompt(
			"Chinese",
			"shopping",
			"Let's shop in Mandarin.",
		),
	},
];

export function getLessonById(lessonId: string): Lesson | undefined {
	return lessons.find((lesson) => lesson.id === lessonId);
}

export function getLessonsByLanguageId(languageId: LanguageId): Lesson[] {
	return lessons
		.filter((lesson) => lesson.languageId === languageId)
		.sort((a, b) => {
			const unitOrderA = getUnitById(a.unitId)?.order ?? 0;
			const unitOrderB = getUnitById(b.unitId)?.order ?? 0;
			return unitOrderA !== unitOrderB
				? unitOrderA - unitOrderB
				: a.order - b.order;
		});
}

export function getLessonsByUnitId(unitId: string): Lesson[] {
	return lessons
		.filter((lesson) => lesson.unitId === unitId)
		.sort((a, b) => a.order - b.order);
}
