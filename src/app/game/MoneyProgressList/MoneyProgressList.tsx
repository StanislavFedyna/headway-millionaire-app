'use client';

import clsx from 'clsx';

import { MoneyProgress } from '@/components';
import { Question } from '@/schemas';

import styles from './MoneyProgressList.module.css';

interface MoneyProgressListProps {
  questionIndex: number;
  className?: string;
  moneyValues: Question['moneyValue'][];
}

type ProgressVariant = 'current' | 'next' | 'completed';

const getProgressVariant = (
  index: number,
  currentIndex: number,
): ProgressVariant => {
  if (index === currentIndex) {
    return 'current';
  }

  if (index < currentIndex) {
    return 'completed';
  }

  return 'next';
};

export const MoneyProgressList = ({
  questionIndex,
  moneyValues,
  className,
}: MoneyProgressListProps) => {
  return (
    <aside className={clsx(styles.container, className)}>
      <div className={styles.list}>
        {moneyValues
          .slice()
          .reverse()
          .map((amount, index) => (
            <MoneyProgress
              key={amount}
              amount={amount}
              variant={getProgressVariant(
                moneyValues.length - 1 - index,
                questionIndex,
              )}
            />
          ))}
      </div>
    </aside>
  );
};
