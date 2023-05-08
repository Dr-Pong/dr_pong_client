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
    <div className={styles.winRateStat}>
      <div className={styles.winRateText}>
        <div className={styles.winRate}>{`${t('Win Rate')} ${winRate}%`}</div>
        <div className={styles.winTieLose}>
          (<span>{`${wins}${t('W')}`}</span>
          <span>{`${ties}${t('T')}`}</span>
          <span>{`${loses}${t('L')}`}</span>)
        </div>
      </div>
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
