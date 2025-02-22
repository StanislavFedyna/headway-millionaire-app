'use client';

import { Volume2, VolumeX } from 'lucide-react';

import styles from './SoundToggle.module.css';
import { useGameSounds } from '@/hooks/useGameSounds';

export const SoundToggle = () => {
  const { isSoundEnabled, toggleSound } = useGameSounds();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={styles.button}
      aria-label={isSoundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {isSoundEnabled ? (
        <Volume2 className={styles.icon} />
      ) : (
        <VolumeX className={styles.icon} />
      )}
    </button>
  );
};
