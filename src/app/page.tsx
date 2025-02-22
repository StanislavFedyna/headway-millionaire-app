import Link from 'next/link';

import { Button, Typography, PageWrapper } from '@/components';
import { PAGE_URLS } from '@/constants';
import ThumpUpIcon from '@/assets/svgs/thumb-up.svg';
import styles from './page.module.css';

const Start = () => {
  return (
    <PageWrapper icon={<ThumpUpIcon />} variant="start">
      <Typography variant="h1" className={styles.title}>
        Who wants to be a millionaire?
      </Typography>
      <Link href={PAGE_URLS.GAME} className={styles.linkButton}>
        <Button>Start</Button>
      </Link>
    </PageWrapper>
  );
};

export default Start;
