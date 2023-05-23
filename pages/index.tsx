import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import Link from 'next/link';

import React, { ReactElement } from 'react';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';

import LoginFilter from 'components/layouts/LoginFilter';
import UtilLayout from 'components/layouts/UtilLayout';

import styles from 'styles/index/Home.module.scss';

type page = {
  value: string;
  route: string;
};

export default function Home() {
  const { t } = useTranslation('home');
  const login = useRecoilValue(loginState);
  const user = useRecoilValue(userState);
  const pages: page[] = [
    { value: t('Game'), route: '/game' },
    { value: t('Leaderboard'), route: '/leaderboard' },
    { value: t('Match History'), route: `/records/${user.nickname}` },
  ];
  if (!login) pages.push({ value: t('Login'), route: '/login' });

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.pageList}>
        {pages.map(({ value, route }, i) => {
          return (
            <div key={i} className={styles.pageLink}>
              <Link href={route}>{value}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <UtilLayout>{page}</UtilLayout>
    </LoginFilter>
  );
};
