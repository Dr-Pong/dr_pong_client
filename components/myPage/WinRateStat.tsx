import React from 'react';
import { useTranslation } from 'react-i18next';

import { WinRateStatProps } from 'components/myPage/StatCard';

import styles from 'styles/myPage/WinRateStat.module.scss';

export default function WinRateStat({
  winRateInfo,
}: {
  winRateInfo: WinRateStatProps;
}) {
  const { t } = useTranslation(['page']);
  const { winRate, wins, ties, losses } = winRateInfo;
  return (
    <div className={styles.winRateStat}>
      <div className={styles.winRateText}>
        <div className={styles.winRate}>{`${t('Win Rate')} ${winRate}%`}</div>
        <div className={styles.winTieLose}>
          (<span>{`${wins}${t('W')}`}</span>
          <span>{`${ties}${t('T')}`}</span>
          <span>{`${losses}${t('L')}`}</span>)
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
