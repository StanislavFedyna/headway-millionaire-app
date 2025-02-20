import clsx from 'clsx';

import styles from './GameLoader.module.css';

interface GameLoaderProps {
  className?: string;
}

export const GameLoader = ({ className }: GameLoaderProps) => (
  <div className={styles.container}>
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.hexagon}>
        <div className={styles.inner}>
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
        </div>
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  </div>
);
