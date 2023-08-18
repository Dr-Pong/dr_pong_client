import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { ProfileStyle, UserRank } from 'types/userTypes';

import RankTag from 'components/myPage/profile/RankTag';
import TierLp from 'components/myPage/profile/TierLp';

import styles from 'styles/myPage/BestRecord.module.scss';

type BestRecordProps = {
  totalRank: UserRank;
  style: ProfileStyle;
};

export default function BestRecord({ totalRank, style }: BestRecordProps) {
  const { t } = useTranslation('myPage');
  const { bestLp, rank, tier } = totalRank;

  return (
    <div className={`${styles.bestRecordContainer} ${styles[style]}`}>
      <div className={styles.title}>{t('Best Record')}</div>
      <div className={styles.content}>
        {tier === 'doctor' && rank && <RankTag rank={rank} />}
        <TierLp tier={tier} lp={bestLp} align='center' />
      </div>
    </div>
  );
}
