import type { ReactNode } from 'react';
import clsx from 'clsx';

import { AnimationContainer } from '@/components';
import styles from './PageWrapper.module.css';

interface PageWrapperProps {
  children: ReactNode;
  icon: ReactNode;
  variant?: 'start' | 'game-over';
}

export const PageWrapper = ({
  children,
  icon,
  variant = 'start',
}: PageWrapperProps) => {
  const id = crypto.randomUUID();

  return (
    <div className={clsx(styles.container, styles[variant])}>
      <AnimationContainer uniqueKey={id}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>{icon}</div>
          <div className={styles.bodyContent}>{children}</div>
        </div>
      </AnimationContainer>
    </div>
  );
};
