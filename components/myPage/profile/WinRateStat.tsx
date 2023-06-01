import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { UserStat } from 'types/userTypes';

import styles from 'styles/myPage/WinRateStat.module.scss';

export default function WinRateStat({
  winRateInfo,
}: {
  winRateInfo: UserStat;
}) {
  const { t } = useTranslation('myPage');
  const { winRate, wins, ties, loses } = winRateInfo;

  return (
    <div className={styles.winRateStatContainer}>
      <div className={styles.winRate}>
        <div>{t('Win Rate')}</div>
        <div>{`${winRate}%`}</div>
      </div>
      <div className={styles.winTieLose}>{`(${wins}${t('W')} ${ties}${t(
        'T'
      )} ${loses}${t('L')})`}</div>
      <div className={styles.gaugeBar}>
        <div className={styles.winGauge} style={{ width: winRate + '%' }} />
        <div
          className={styles.loseGauge}
          style={{ width: 100 - winRate + '%' }}
        />
      </div>
    </div>
  );
}
