import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import clsx from 'clsx';

import { Typography } from '@/components';
import BorderIcon from '@/assets/svgs/border.svg';
import styles from './OptionButton.module.css';
import { BUTTON_VARIANTS } from '@/constants';

type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

interface OptionButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  prefix?: string;
  className?: string;
  disabled?: boolean;
}

export const OptionButton = ({
  children,
  variant = BUTTON_VARIANTS.INACTIVE,
  prefix = '',
  className,
  disabled,
  ...props
}: OptionButtonProps) => {
  const isPressed = variant === BUTTON_VARIANTS.SELECTED;
  const ariaLabel = `Option ${prefix}: ${typeof children === 'string' ? children : ''}`;

  return (
    <button
      type="button"
      aria-pressed={isPressed}
      aria-label={ariaLabel}
      disabled={!!disabled}
      className={clsx(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        className,
      )}
      {...props}
    >
      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.wrapper}>
        <BorderIcon className={styles.svg} aria-hidden="true" />

        <div className={styles.content}>
          <span className={styles.prefix} aria-hidden="true">
            {prefix}
          </span>
          <Typography
            className={clsx(styles.label, styles[`label-${variant}`])}
            variant="body"
          >
            {children}
          </Typography>
        </div>
      </div>

      <span className={styles.divider} aria-hidden="true" />
    </button>
  );
};
