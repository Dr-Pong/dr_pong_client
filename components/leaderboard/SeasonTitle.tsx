import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React from 'react';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/leaderboard/SeasonTitle.module.scss';

export default function SeasonTitle() {
  const { t } = useTranslation('season');
  const { get } = useCustomQuery();
  const { locale, defaultLocale } = useRouter();
  const currentLocale = locale || defaultLocale || 'en';
  const { data, isLoading, isError } = get('[season_key]', '/seasons/current');
  const { seasonName } = data || { seasonName: '42' };

  if (isLoading || isError) return null;

  if (!seasonName.includes('-')) {
    return <div className={styles.seasonTitle}>{`< ${t(seasonName)} >`}</div>;
  }

  const [month, week] = seasonName.split('-');

  const seasonNameMap: { [key: string]: string } = {
    en: `${t('week' + parseInt(week))} ${t(month)}`,
    ko: `${t(month)} ${t('week' + parseInt(week))}`,
  };

  return (
    <div
      className={styles.seasonTitle}
    >{`< ${seasonNameMap[currentLocale]} >`}</div>
  );
}
