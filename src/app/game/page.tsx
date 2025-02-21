'use client';

import { GameLoader, ErrorScreen } from '@/components';
import { useGameConfig } from '@/hooks';
import { useGame } from '@/context';

import { Question } from './Question/Question';
import { MobileMenu } from './MobileMenu/MobileMenu';
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

  const moneyValues = config.questions
    .map((question) => question.moneyValue)
    .sort((a, b) => a - b);

  const currentQuestion = config.questions[questionIndex];

  return (
    <main className={styles.container}>
      <MobileMenu questionIndex={questionIndex} moneyValues={moneyValues} />

      <Question question={currentQuestion} />

      <aside className={styles.sidebar}>
        <MoneyProgressList
          questionIndex={questionIndex}
          moneyValues={moneyValues}
        />
      </aside>
    </main>
  );
};

export default GamePage;
