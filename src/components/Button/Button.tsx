import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  const buttonClassName = clsx(styles.button, className);

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
};
