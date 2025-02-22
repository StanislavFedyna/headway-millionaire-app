'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { Button, Typography, PageWrapper } from '@/components';
import { useGame } from '@/context';
import { PAGE_URLS } from '@/constants';
import ThumpUpIcon from '../../assets/svgs/thumb-up.svg';
import styles from './page.module.css';
import { useConfetti } from '@/hooks';

const GameOverScreen = () => {
  const { isGameOver, onGameReset, total, maxPrize } = useGame();
  const isWinner = total === maxPrize;

  useConfetti(isWinner);

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
    <PageWrapper icon={<ThumpUpIcon />} variant="game-over">
      <Typography variant="h2" className={styles.totalScore}>
        Total score:
      </Typography>
      <Typography variant="h1" className={styles.score}>
        ${total.toLocaleString()} earned
      </Typography>
      <Button onClick={handleTryAgainClick}>Try again</Button>
    </PageWrapper>
  );
};

export default GameOverScreen;
