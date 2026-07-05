from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger(__name__)


def call_custom_data(call: Any) -> dict[str, Any]:
    """Read lesson metadata stored on the Stream call by the mobile app."""
    custom = getattr(call, "custom_data", None)
    if not isinstance(custom, dict) or not custom:
        custom = getattr(call, "custom", None)

    if isinstance(custom, dict) and custom:
        return custom

    call_id = getattr(call, "id", None) or getattr(call, "call_id", "unknown")
    call_type = getattr(call, "type", None) or getattr(call, "call_type", "unknown")
    logger.warning(
        "No lesson metadata found on Stream call %s (%s); agent will default to Spanish/Beginner context.",
        call_id,
        call_type,
    )
    return {}


def _pick(data: dict[str, Any], *keys: str, default: str = "") -> str:
    for key in keys:
        value = data.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return default


def build_teacher_instructions(context: dict[str, Any] | None = None) -> str:
    """Build runtime instructions from Stream call custom data or defaults."""
    data = context or {}

    language_name = _pick(data, "languageName", "language_name", default="Spanish")
    lesson_title = _pick(data, "lessonTitle", "lesson_title", default="Beginner lesson")
    teaching_focus = _pick(
        data,
        "teachingFocus",
        "teaching_focus",
        default="basic greetings and useful phrases",
    )
    learner_name = _pick(data, "learnerName", "learner_name", default="the learner")

    goal = _pick(data, "goal", "primaryGoal", "primary_goal")
    goals = data.get("goals") or []
    vocabulary = data.get("vocabulary") or data.get("vocabularyItems") or []
    phrases = data.get("phrases") or data.get("lessonPhrases") or []
    system_prompt = _pick(data, "systemPrompt", "system_prompt")

    vocab_lines = []
    if isinstance(vocabulary, list):
        for item in vocabulary[:6]:
            if not isinstance(item, dict):
                continue
            word = _pick(item, "word", "phrase")
            translation = _pick(item, "translation")
            if word and translation:
                vocab_lines.append(f"- {word} = {translation}")

    phrase_lines = []
    if isinstance(phrases, list):
        for item in phrases[:4]:
            if not isinstance(item, dict):
                continue
            phrase = _pick(item, "phrase", "word")
            translation = _pick(item, "translation")
            if phrase and translation:
                phrase_lines.append(f"- {phrase} ({translation})")

    sections = [
        "@instructions.md",
        "",
        "Session context:",
        f"- Learner: {learner_name}",
        f"- Selected language: {language_name}",
        f"- Lesson: {lesson_title}",
        f"- Focus: {teaching_focus}",
    ]

    if goal:
        sections.append(f"- Goal: {goal}")
    elif isinstance(goals, list):
        goal_lines = []
        for item in goals[:3]:
            if isinstance(item, dict):
                description = _pick(item, "description")
                if description:
                    goal_lines.append(f"- {description}")
            elif isinstance(item, str) and item.strip():
                goal_lines.append(f"- {item.strip()}")
        if goal_lines:
            sections.extend(["", "Lesson goals:", *goal_lines])

    if vocab_lines:
        sections.extend(["", "Key vocabulary:", *vocab_lines])

    if phrase_lines:
        sections.extend(["", "Practice phrases:", *phrase_lines])

    if system_prompt:
        sections.extend(["", "Lesson-specific guidance:", system_prompt])

    sections.extend(
        [
            "",
            "Kickoff: Greet the learner warmly in English, name today's lesson in one sentence, "
            f"slowly introduce the first {language_name} word or phrase with its English meaning, "
            "ask them to repeat it, then pause and listen to their response.",
        ]
    )

    return "\n".join(sections)


def opening_line_for_context(context: dict[str, Any] | None = None) -> str:
    data = context or {}
    custom_opening = _pick(data, "openingLine", "opening_line", "teacherMessage")

    if custom_opening:
        return custom_opening

    language_name = _pick(data, "languageName", "language_name", default="your selected language")
    learner_name = _pick(data, "learnerName", "learner_name", default="there")

    return (
        f"Hey {learner_name}! Great to have you here. "
        f"We're sticking to today's {language_name} lesson—I'll go slow, and you repeat after me. "
        "Sound good?"
    )
