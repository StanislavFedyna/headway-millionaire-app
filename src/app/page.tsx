import Link from 'next/link';

import { AnimationContainer, Button, Typography } from '@/components';
import { PAGE_URLS } from '@/constants';
import ThumpUpIcon from '@/assets/svgs/thumb-up.svg';

import styles from './page.module.css';
import { useId } from 'react';

const Start = () => {
  const id = useId();

  return (
    <div className={styles.screenContainer}>
      <AnimationContainer uniqueKey={id}>
        <div className={styles.contentWrapper}>
          <ThumpUpIcon className={styles.thumbUpImage} />
          <div>
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
