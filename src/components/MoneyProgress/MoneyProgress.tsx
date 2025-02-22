import React from 'react';
import clsx from 'clsx';

import { formatCurrency } from '@/utils';
import { Typography } from '@/components';
import BorderIcon from '@/assets/svgs/border.svg';
import { PROGRESS_VARIANTS } from '@/constants';
import styles from './MoneyProgress.module.css';

export type ProgressVariant =
  (typeof PROGRESS_VARIANTS)[keyof typeof PROGRESS_VARIANTS];

interface MoneyProgressProps {
  amount: number;
  variant?: ProgressVariant;
  className?: string;
}

export const MoneyProgress = ({
  amount,
  variant = PROGRESS_VARIANTS.NEXT,
  className,
}: MoneyProgressProps) => {
  const formattedAmount = formatCurrency(amount);

  // status for screen readers
  const status = {
    [PROGRESS_VARIANTS.COMPLETED]: 'Completed level',
    [PROGRESS_VARIANTS.CURRENT]: 'Current level',
    [PROGRESS_VARIANTS.NEXT]: 'Next level',
  }[variant];

  return (
    <div
      className={clsx(styles.wrapper, styles[variant], className)}
      role="listitem"
      aria-current={variant === PROGRESS_VARIANTS.CURRENT}
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
