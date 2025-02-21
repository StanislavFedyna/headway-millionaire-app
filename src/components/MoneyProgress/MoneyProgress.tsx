import clsx from 'clsx';
import styles from './MoneyProgress.module.css';
import { formatCurrency } from '@/utils';
import { Typography } from '@/components';
import BorderIcon from '@/assets/svgs/border.svg';

type ProgressVariant = 'completed' | 'current' | 'next';

interface MoneyProgressProps {
  amount: number;
  variant?: ProgressVariant;
  className?: string;
}

export const MoneyProgress = ({
  amount,
  variant = 'next',
  className,
}: MoneyProgressProps) => {
  const formattedAmount = formatCurrency(amount);

  // status for screen readers
  const status = {
    completed: 'Completed level',
    current: 'Current level',
    next: 'Next level',
  }[variant];

  return (
    <div
      className={clsx(styles.wrapper, styles[variant], className)}
      role="listitem"
      aria-current={variant === 'current'}
    >
      <span className={styles.divider} aria-hidden="true" />
      <div
        className={styles.progress}
        role="status"
        aria-label={`${status}: ${formattedAmount}`}
      >
        <BorderIcon className={styles.svg} aria-hidden="true" />
        <Typography className={styles.amount} variant="body">
          {formattedAmount}
        </Typography>
      </div>
      <span className={styles.divider} aria-hidden="true" />
    </div>
  );
};
