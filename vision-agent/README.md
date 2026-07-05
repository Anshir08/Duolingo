# Duolingo Vision Agent

Voice-only AI language teacher for Stream audio lessons.

- **Transport:** Stream Edge (`audio_room` calls)
- **LLM:** OpenAI Realtime (speech-to-speech)
- **Teaching style:** Always speaks English and teaches the selected language through English

## Prerequisites

1. Install [uv](https://docs.astral.sh/uv/) (recommended) or use Python 3.12+ with pip
2. Parent project `.env` must include:
   - `STREAM_API_KEY`
   - `STREAM_API_SECRET`
   - `OPENAI_API_KEY`

## Setup

```bash
cd vision-agent
uv sync
# or without uv:
pip install -e .
```

The service automatically loads `../.env` from the Expo app root.

**Note:** First startup can take 30–90 seconds on Windows while Python loads the SDK. You should see `Uvicorn running on http://127.0.0.1:8000` when ready.

## Run locally

```bash
# HTTP server (used by prompt 15 mobile integration)
uv run main.py serve --host 0.0.0.0 --port 8000

# Console demo (optional)
uv run main.py run --call-type audio_room
```

API docs: http://127.0.0.1:8000/docs

### Start a session manually

```bash
curl -X POST http://127.0.0.1:8000/calls/<call_id>/sessions \
  -H "Content-Type: application/json" \
  -d "{\"call_type\": \"audio_room\"}"
```

Replace `<call_id>` with the Stream call id created by the mobile app/API.

## Notes

- The Expo app proxies start/stop requests through `/api/vision-agent/start` and `/api/vision-agent/stop`.
- Lesson metadata from Stream call `custom` data is consumed in `lesson_context.py`.
- This agent is voice-only; no camera or vision processors are enabled.
- For `audio_room` calls the agent joins with the `admin` role and calls `goLive()` so it can publish audio.
