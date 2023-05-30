import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import Link from 'next/link';

import React, { ReactElement } from 'react';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';

import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/index/Home.module.scss';

type Page = {
  value: string;
  route: string;
  style: string;
};

export default function Home() {
  const { t } = useTranslation('home');
  const login = useRecoilValue(loginState);
  const user = useRecoilValue(userState);
  const pages: Page[] = [
    { value: t('Game'), route: '/game', style: 'special' },
    { value: t('Leaderboard'), route: '/leaderboard', style: 'basic' },
    {
      value: t('Match History'),
      route: `/records/${user.nickname}`,
      style: 'basic',
    },
  ];
  if (!login)
    pages.push({ value: t('Login'), route: '/login', style: 'basic' });

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.pageList}>
        {pages.map(({ value, route, style }, i) => {
          return (
            <Link
              href={route}
              key={i}
              className={`${styles.pageLink} ${styles[style]}`}
            >
              {value}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <AppLayout>{page}</AppLayout>
    </LoginFilter>
  );
};
