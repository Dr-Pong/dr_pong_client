import React from 'react';

import { RecordDetail } from 'types/historyTypes';

import useRecordsQuery from 'hooks/useRecordsQuery';

import styles from 'styles/records/MatchDetail.module.scss';

export default function MatchDetail({
  nickname,
  gameId,
  onUnfoldClick,
}: {
  nickname: string;
  gameId: number;
  onUnfoldClick: () => void;
}) {
  const { getMatchDetail } = useRecordsQuery(nickname);
  const { data, isLoading } = getMatchDetail(gameId);

  if (isLoading) return <div>loading...</div>;

  const { duration, me, you, rounds } = data as RecordDetail;

  return (
    <div className={styles.matchDetail}>
      <div className={styles.leftBar}>
        <div className={styles.duration}>{duration}</div>
        <div className={styles.fold} onClick={onUnfoldClick}>
          {'▲'}
        </div>
      </div>
      <div className={styles.infographics}>
        <div className={styles.ladderPoints}>
          <div className={styles.lpBar}>
            <span className={styles.lp}>{`${me.lp}`}</span>
            <span className={styles.lpChange}>{`(${me.lpChange})`}</span>
          </div>
          <div className={styles.spacer}></div>
          <div className={styles.lpBar}>
            <span className={styles.lp}>{`${you.lp}`}</span>
            <span className={styles.lpChange}>{`(${you.lpChange})`}</span>
          </div>
        </div>
        <div className={styles.rounds}>
          {rounds.map((r, i) => {
            return (
              <div key={i} className={r.meWin ? styles.win : styles.lose}>
                {r.bounces}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
