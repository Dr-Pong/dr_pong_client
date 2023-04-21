// import 'i18n';
import useTranslation from 'next-translate/useTranslation';

import Link from 'next/link';

import React from 'react';

import styles from 'styles/pages/index.module.scss';

type page = {
  value: string;
  route: string;
};

export default function Home() {
  const { t } = useTranslation('home');
  const pages: page[] = [
    { value: t('Leaderboard'), route: '/leaderboard' },
    { value: t('Match History'), route: '/matchHistory' },
    { value: t('Settings'), route: '/settings' },
  ];
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.pageList}>
        {pages.map(({ value, route }) => {
          return (
            <Link href={route} className={styles.pageLink}>
              {value}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
