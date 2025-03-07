import clsx from 'clsx';

import styles from './GameLoader.module.css';

interface GameLoaderProps {
  className?: string;
}

export const GameLoader = ({ className }: GameLoaderProps) => (
  <section
    className={styles.container}
    role="alert"
    aria-busy="true"
    aria-live="polite"
    aria-label="Game content is loading"
  >
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.hexagon} aria-hidden="true">
        <div className={styles.inner}>
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
          <div className={styles.sparkle} />
        </div>
      </div>
      <p className={styles.text}>Loading game content ...</p>
    </div>
  </section>
);
