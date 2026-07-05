from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from getstream.models import MemberRequest
from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import getstream, openai

from lesson_context import (
    build_teacher_instructions,
    call_custom_data,
    opening_line_for_context,
)

ROOT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = ROOT_DIR.parent

# Reuse the parent Expo app's .env (STREAM_* and OPENAI_API_KEY).
load_dotenv(PROJECT_ROOT / ".env")
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("duolingo-vision-agent")

AGENT_USER_ID = "ai-language-teacher"
AGENT_USER_NAME = "AI Teacher"


async def prepare_audio_room(call: Any) -> None:
    """Grant the agent admin audio permissions and take the room live."""
    await call.get()

    await call.update_call_members(
        update_members=[MemberRequest(user_id=AGENT_USER_ID, role="admin")]
    )

    call_data = getattr(call, "_data", None)
    if call_data is not None and getattr(call_data, "backstage", False):
        await call.go_live()
        logger.info("Audio room is now live")


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name=AGENT_USER_NAME, id=AGENT_USER_ID),
        instructions=build_teacher_instructions(),
        llm=openai.Realtime(send_video=False),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    logger.info("Joining call %s (%s)", call_id, call_type)

    call = await agent.create_call(call_type, call_id)
    await prepare_audio_room(call)

    lesson_context = call_custom_data(call)

    if lesson_context:
        agent.instructions = Instructions(
            input_text=build_teacher_instructions(lesson_context),
            base_dir=ROOT_DIR,
        )
        logger.info(
            "Loaded lesson context for %s (%s)",
            lesson_context.get("lessonTitle", "lesson"),
            lesson_context.get("languageName", "language"),
        )

    opening_line = opening_line_for_context(lesson_context)

    async with agent.join(call):
        await agent.simple_response(opening_line)
        await agent.finish()


def main() -> None:
    runner = Runner(
        AgentLauncher(
            create_agent=create_agent,
            join_call=join_call,
            max_sessions_per_call=1,
            agent_idle_timeout=120.0,
        )
    )
    runner.cli()


if __name__ == "__main__":
    main()
