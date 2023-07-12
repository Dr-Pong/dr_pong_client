import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React from 'react';

import { userState } from 'recoils/user';

import useRecordsQuery from 'hooks/useRecordsQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/game/result/ExpProgressBar.module.scss';

export default function ExpProgressBar({ gameId }: { gameId: number }) {
  const { t } = useTranslation('game');
  const { nickname } = useRecoilValue(userState);
  const { expResultGet } = useRecordsQuery(nickname);
  const { data, isLoading, isError, error } = expResultGet(gameId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const { beforeExp, expChange, levelExp } = data;
  const progress = ((beforeExp + expChange) / levelExp) * 100;
  const expResult =
    expChange + beforeExp >= levelExp
      ? t('level up')
      : `${expChange + beforeExp}/${levelExp}`;
  return (
    <div className={styles.expBarContainer}>
      <div className={styles.expBarTitle}>
        <div className={styles.title}>{t('exp')}</div>
        <div className={styles.expResult}>{expResult}</div>
      </div>
      <div className={styles.expBar}>
        <div
          className={styles.expBarProgress}
          style={{ width: `${progress}%` }}
        >
          <div className={styles.expBarProgressAnimation}></div>
        </div>
      </div>
    </div>
  );
}
