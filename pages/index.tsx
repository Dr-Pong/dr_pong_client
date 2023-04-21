// import 'i18n';
import useTranslation from 'next-translate/useTranslation';

import Link from 'next/link';

import React from 'react';

import styles from 'styles/pages/index.module.scss';

type page = {
  content: string;
  route: string;
};

export default function Home() {
  const { t } = useTranslation('home');
  const pages: page[] = [
    { content: t('Leaderboard'), route: '/leaderboard' },
    { content: t('Match History'), route: '/matchHistory' },
    { content: t('Settings'), route: '/settings' },
  ];
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.pageList}>
        {pages.map(({ content, route }) => {
          return (
            <Link href={route} className={styles.pageLink}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
