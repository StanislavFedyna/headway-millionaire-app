import { useId } from 'react';
import Link from 'next/link';

import { AnimationContainer, Button, Typography } from '@/components';
import { PAGE_URLS } from '@/constants';
import ThumpUpIcon from '@/assets/svgs/thumb-up.svg';
import styles from './page.module.css';

const Start = () => {
  const id = useId();

  return (
    <div className={styles.container}>
      <AnimationContainer uniqueKey={id}>
        <div className={styles.content}>
          <ThumpUpIcon className={styles.icon} />

          <div className={styles.bodyContent}>
            <Typography variant="h1" className={styles.title}>
              Who wants to be a millionaire?
            </Typography>

            <Link href={PAGE_URLS.GAME} className={styles.linkButton}>
              <Button>Start</Button>
            </Link>
          </div>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Start;
