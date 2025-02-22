'use client';

import { useEffect, useId } from 'react';
import { redirect } from 'next/navigation';

import { AnimationContainer, Button, Typography } from '@/components';
import { useGame } from '@/context';
import { PAGE_URLS } from '@/constants';
import ThumpUpIcon from '../../assets/svgs/thumb-up.svg';
import styles from './page.module.css';

const GameOverScreen = () => {
  const { isGameOver, onGameReset, total } = useGame();
  const id = useId();

  useEffect(() => {
    if (!isGameOver) {
      redirect(PAGE_URLS.START);
    }
  }, [isGameOver]);

  const handleTryAgainClick = () => {
    onGameReset();

    redirect(PAGE_URLS.GAME);
  };

  if (!isGameOver) {
    return null;
  }

  return (
    <div className={styles.container}>
      <AnimationContainer uniqueKey={id}>
        <div className={styles.content}>
          <ThumpUpIcon className={styles.icon} />

          <div className={styles.bodyContent}>
            <Typography variant="h2" className={styles.totalScore}>
              Total score:
            </Typography>
            <Typography variant="h1" className={styles.score}>
              ${total.toLocaleString()} earned
            </Typography>

            <Button onClick={handleTryAgainClick}>Try again</Button>
          </div>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default GameOverScreen;
