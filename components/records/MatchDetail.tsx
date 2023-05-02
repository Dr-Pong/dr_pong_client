import React from 'react';

import { RecordDetail } from 'types/historyTypes';

import styles from 'styles/matchHistory/MatchDetail.module.scss';
import useMatchHistoryQuery from "../../hooks/useMatchHistoryQuery";

export default function MatchDetail({
  nickname,
  gameId,
  onUnfoldClick,
}: {
  nickname: string;
  gameId: number;
  onUnfoldClick: () => void;
}) {
  const { getMatchDetail } = useMatchHistoryQuery(nickname);
  const { data: matchDetail, isLoading } = getMatchDetail(gameId);
  const { duration, me, you, rounds } = matchDetail;
  if (isLoading) return <div>loading...</div>;
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
          <div className={styles.me}>{`${me.lp} (${me.lpChange})`}</div>
          <div className={styles.you}>{`${you.lp} (${you.lpChange})`}</div>
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
