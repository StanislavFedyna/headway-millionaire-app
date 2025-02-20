import type React from 'react';
import type { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Typography.module.css';

type TypographyVariant = 'h1' | 'h2' | 'body';

const defaultElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  body: 'p',
};

interface TypographyProps<T extends ElementType = ElementType> {
  variant: TypographyVariant;
  children: ReactNode;
  as?: T;
  className?: string;
}

export const Typography = <T extends ElementType = ElementType>({
  variant,
  children,
  as,
  className,
  ...props
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = as || defaultElements[variant];

  return (
    <Component className={clsx(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};
