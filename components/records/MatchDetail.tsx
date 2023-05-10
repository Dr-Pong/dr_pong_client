import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { Record, RecordDetail } from 'types/historyTypes';

import useRecordsQuery from 'hooks/useRecordsQuery';

import MatchRecords from 'components/records/MatchRecords';

import styles from 'styles/records/MatchDetail.module.scss';

function LpBar({ lp, lpChange }: { lp: number; lpChange: number }) {
  const sign = lpChange > 0 ? 'plus' : 'minus';
  const absChange = Math.abs(lpChange);
  const lpStyle = lpChange === 0 ? 'noChange' : `yesChange`;
  return (
    <div className={styles.lpBar}>
      <span className={styles[lpStyle]}>{`${lp} `}</span>
      {lpChange === 0 || (
        <span className={styles.lpChange}>
          <span className={styles[sign]}></span>
          <span className={styles.absChange}>{` ${absChange}`}</span>
        </span>
      )}
    </div>
  );
}

export default function MatchDetail({
  nickname,
  gameId,
  gameType,
  onUnfoldClick,
}: {
  nickname: string;
  gameId: number;
  gameType: Record['gameType'];
  onUnfoldClick: () => void;
}) {
  const { t } = useTranslation('records');
  const { getMatchDetail } = useRecordsQuery(nickname);
  const { data, isLoading } = getMatchDetail(gameId);

  if (isLoading) return <div>loading...</div>;

  const { duration, me, you, rounds } = data as RecordDetail;

  return (
    <div className={styles.matchDetail}>
      <div className={styles.leftBar}>
        <div className={styles.duration}>{convertDuration(duration)}</div>
        <div className={styles.fold} onClick={onUnfoldClick}>
          {'▲'}
        </div>
      </div>
      <div className={styles.infographics}>
        {gameType === 'rank' && (
          <div className={styles.ladderPoints}>
            <LpBar lp={me.lp} lpChange={me.lpChange} />
            <div className={styles.spacer}></div>
            <LpBar lp={you.lp} lpChange={you.lpChange} />
          </div>
        )}
        <MatchRecords rounds={rounds} />
      </div>
    </div>
  );
  function convertDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}${t('minute')} ${seconds}${t('second')}`;
  }
}
