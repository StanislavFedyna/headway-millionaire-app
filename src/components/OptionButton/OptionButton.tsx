import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Typography } from '@/components';
import clsx from 'clsx';
import styles from './OptionButton.module.css';

type ButtonVariant = 'inactive' | 'selected' | 'correct' | 'wrong';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  prefix?: string;
  className?: string;
  disabled?: boolean;
}

export const OptionButton = ({
  children,
  variant = 'inactive',
  prefix = '',
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        className,
      )}
      disabled={!!disabled}
      {...props}
    >
      <span className={styles.divider} />
      <div className={styles.wrapper}>
        <svg
          viewBox="0 -1 388.55 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={styles.svg}
        >
          <path d="M23.8137 5.09773C25.9857 2.2033 29.3933 0.5 33.012 0.5H355.988C359.607 0.5 363.014 2.2033 365.186 5.09773L388.375 36L365.186 66.9023C363.014 69.7967 359.607 71.5 355.988 71.5H33.012C29.3933 71.5 25.9857 69.7967 23.8137 66.9023L0.625116 36L23.8137 5.09773Z" />
        </svg>
        <div className={styles.content}>
          <span className={styles.prefix}>{prefix}</span>
          <Typography
            className={clsx(styles.label, styles[`label-${variant}`])}
            variant="body"
          >
            {children}
          </Typography>
        </div>
      </div>
      <span className={styles.divider} />
    </button>
  );
};
