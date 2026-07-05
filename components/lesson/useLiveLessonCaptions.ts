import { useCall, type CallClosedCaption } from '@stream-io/video-react-native-sdk';
import { useEffect, useMemo, useState } from 'react';

import { AI_TEACHER_USER_ID } from '@/components/stream/constants';

export type LiveCaptionSpeaker = 'teacher' | 'you';

export type LiveCaptionEntry = {
  id: string;
  speakerId: string;
  speaker: LiveCaptionSpeaker;
  speakerName: string;
  text: string;
  startTime: string;
};

const MAX_CAPTION_ENTRIES = 40;

function toCaptionEntry(
  caption: CallClosedCaption,
  learnerUserId?: string,
): LiveCaptionEntry | null {
  const text = caption.text?.trim();

  if (!text) {
    return null;
  }

  let speaker: LiveCaptionSpeaker | null = null;

  if (caption.speaker_id === AI_TEACHER_USER_ID) {
    speaker = 'teacher';
  } else if (learnerUserId && caption.speaker_id === learnerUserId) {
    speaker = 'you';
  }

  if (!speaker) {
    return null;
  }

  return {
    id: `${caption.speaker_id}/${caption.start_time}`,
    speakerId: caption.speaker_id,
    speaker,
    speakerName: caption.user?.name ?? (speaker === 'teacher' ? 'AI Teacher' : 'You'),
    text,
    startTime: caption.start_time,
  };
}

export function useLiveLessonCaptions(enabled: boolean, learnerUserId?: string) {
  const call = useCall();
  const [entries, setEntries] = useState<LiveCaptionEntry[]>([]);

  useEffect(() => {
    if (!call || !enabled) {
      return;
    }

    const unsubscribe = call.on('call.closed_caption', (event) => {
      const entry = toCaptionEntry(event.closed_caption, learnerUserId);

      if (!entry) {
        return;
      }

      setEntries((current) => {
        if (current.some((item) => item.id === entry.id)) {
          return current;
        }

        return [...current, entry].slice(-MAX_CAPTION_ENTRIES);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [call, enabled, learnerUserId]);

  useEffect(() => {
    if (!enabled) {
      setEntries([]);
    }
  }, [enabled]);

  const latestTeacherCaption = useMemo(() => {
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      if (entries[index]?.speaker === 'teacher') {
        return entries[index]?.text ?? '';
      }
    }

    return '';
  }, [entries]);

  const latestUserCaption = useMemo(() => {
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      if (entries[index]?.speaker === 'you') {
        return entries[index]?.text ?? '';
      }
    }

    return '';
  }, [entries]);

  return {
    entries,
    latestTeacherCaption,
    latestUserCaption,
  };
}
