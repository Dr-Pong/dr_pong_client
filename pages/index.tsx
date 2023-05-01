// import 'i18n';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import Link from 'next/link';

import React from 'react';

import { loginState } from 'recoils/login';

import styles from 'styles/index/Home.module.scss';

type page = {
  value: string;
  route: string;
};

export default function Home() {
  const { t } = useTranslation('home');
  const [login, setLogin] = useRecoilState(loginState);
  const pages: page[] = [
    { value: t('Leaderboard'), route: '/leaderboard' },
    { value: t('Match History'), route: '/matchHistory' },
    { value: t('Settings'), route: '/settings' },
    { value: login ? t('Logout') : t('Login'), route: '/login' },
  ];

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
