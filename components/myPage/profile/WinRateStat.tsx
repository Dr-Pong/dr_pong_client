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

  const guages: { [key: string]: JSX.Element } = {
    win: (
      <div
        className={styles.winGauge}
        style={{
          width: `calc((100% - 0.5rem) * ${winRate / 100} + 0.5rem)`,
        }}
      />
    ),
    lose: (
      <div
        className={styles.loseGauge}
        style={{
          width: `calc((100% - 0.5rem) * ${(100 - winRate) / 100} + 0.5rem)`,
        }}
      />
    ),
  };

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
        {guages[winRate >= 50 ? 'lose' : 'win']}
        {guages[winRate >= 50 ? 'win' : 'lose']}
      </div>
    </div>
  );
}
