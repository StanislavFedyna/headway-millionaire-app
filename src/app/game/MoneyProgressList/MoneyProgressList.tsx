'use client';

import clsx from 'clsx';

import { MoneyProgress } from '@/components';
import { getProgressVariant } from '@/utils';
import { Question } from '@/schemas';
import styles from './MoneyProgressList.module.css';

interface MoneyProgressListProps {
  questionIndex: number;
  className?: string;
  moneyValues: Question['moneyValue'][];
}

export const MoneyProgressList = ({
  questionIndex,
  moneyValues,
  className,
}: MoneyProgressListProps) => {
  return (
    <aside
      className={clsx(styles.container, className)}
      aria-label="Progress menu"
    >
      <div className={styles.list} aria-label="Progress levels">
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
