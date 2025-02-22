'use client';

import { useCallback, useEffect, useState } from 'react';

type SoundType = 'correct' | 'wrong';

const SOUNDS: Record<SoundType, string> = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
};

export const useGameSounds = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('soundEnabled') !== 'false';
    }
    return true;
  });

  const [audioElements] = useState<Record<SoundType, HTMLAudioElement>>(() => {
    if (typeof window === 'undefined') {
      return {} as Record<SoundType, HTMLAudioElement>;
    }

    return Object.entries(SOUNDS).reduce(
      (acc, [key, src]) => {
        const audio = new Audio(src);
        audio.preload = 'auto';

        return { ...acc, [key]: audio };
      },
      {} as Record<SoundType, HTMLAudioElement>,
    );
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', isSoundEnabled.toString());
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (!isSoundEnabled) return;

      const audio = audioElements[type];
      if (audio) {
        audio.currentTime = 0;

        audio.play().catch((error) => {
          console.error('Error playing sound:', error);
        });
      }
    },
    [audioElements, isSoundEnabled],
  );

  const stopSound = useCallback(
    (type: SoundType) => {
      const audio = audioElements[type];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    },
    [audioElements],
  );

  const stopAllSounds = useCallback(() => {
    Object.values(audioElements).forEach((audio) => {
      audio.pause();
      // eslint-disable-next-line no-param-reassign
      audio.currentTime = 0;
    });
  }, [audioElements]);

  return {
    playSound,
    stopSound,
    stopAllSounds,
    isSoundEnabled,
    toggleSound,
  };
};
