import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import { WinRateStatProps } from 'components/myPage/profile/StatCard';

import styles from 'styles/myPage/WinRateStat.module.scss';

export default function WinRateStat({
  winRateInfo,
}: {
  winRateInfo: WinRateStatProps;
}) {
  const { t } = useTranslation('myPage');
  const { winRate, win, ties, lose } = winRateInfo;
  return (
    <div className={styles.winRateStat}>
      <div className={styles.winRateText}>
        <div className={styles.winRate}>{`${t('Win Rate')} ${winRate}%`}</div>
        <div className={styles.winTieLose}>
          (<span>{`${win}${t('W')}`}</span>
          <span>{`${ties}${t('T')}`}</span>
          <span>{`${lose}${t('L')}`}</span>)
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
