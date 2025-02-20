'use client';

import { GameLoader, ErrorScreen, MobileMenu } from '@/components';
import { useGameConfig } from '@/hooks';
import { useGame } from '@/context';

import { Question } from './Question/Question';
import { MoneyProgressList } from './MoneyProgressList/MoneyProgressList';
import styles from './page.module.css';

const GamePage = () => {
  const { questionIndex } = useGame();
  const { config, isLoading, error, refetch } = useGameConfig();

  if (isLoading) {
    return <GameLoader />;
  }

  if (error || !config) {
    return (
      <ErrorScreen
        onRetry={() => refetch()}
        error={new Error('Game configuration is missing')}
      />
    );
  }

  // const moneyValues = useMoneyValues(config);
  // console.log('g', arr);

  const currentQuestion = config.questions[questionIndex];

  return (
    <div className={styles.container}>
      <MobileMenu questionIndex={questionIndex} />

      <Question question={currentQuestion} />

      <aside className={styles.sidebar}>
        <MoneyProgressList questionIndex={questionIndex} />
      </aside>
    </div>
  );
};

export default GamePage;
