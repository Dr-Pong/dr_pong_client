import 'i18n';

import Link from 'next/link';

import React from 'react';

import styles from 'styles/pages/index.module.scss';

type page = {
  content: string;
  route: string;
};

export default function Home() {
  const pages: page[] = [
    { content: 'Leaderboard', route: '/leaderboard' },
    { content: 'Match History', route: '/matchHistory' },
    { content: 'Settings', route: '/settings' },
  ];
  return (
    <div className={styles.homeContainer}>
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
