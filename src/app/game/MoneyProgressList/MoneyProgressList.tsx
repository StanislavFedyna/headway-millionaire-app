import clsx from 'clsx';

import { MoneyProgress } from '@/components';

import styles from './MoneyProgressList.module.css';

interface MoneyProgressListProps {
  questionIndex: number;
  className?: string;
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
  className,
}: MoneyProgressListProps) => {
  // const moneyValues = useMoneyValues();

  // console.log(moneyValues);
  //
  const moneyValues = [
    500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000,
    1000000,
  ];
  return (
    <aside className={clsx(styles.container, className)}>
      <div className={styles.list}>
        {moneyValues.map((amount, index) => (
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
