import React from 'react';

import { Record } from 'types/historyTypes';

import MatchDetail from 'components/matchHistory/MatchDetail';
import Player from 'components/matchHistory/Player';

import styles from 'styles/matchHistory/Match.module.scss';

export default function Match({ record }: { record: Record }) {
  const { me, you: u } = record;
  const { gameId, gameType, playedAt, result } = record;
  const [isFolded, setIsFolded] = React.useState<boolean>(true);
  const handleFoldedClick = () => {
    setIsFolded(false);
  };
  const handleUnfoldedClick = () => {
    setIsFolded(true);
  };
  return (
    <div className={`${styles.match} ${styles[result]}`}>
      <div className={styles.matchBrief}>
        <div className={styles.matchText}>
          <div className={styles.gameType}>{gameType}</div>
          <div className={styles.playedAt}>{playedAt}</div>
          {isFolded && (
            <div className={styles.unfold} onClick={handleFoldedClick}>
              {'▾'}
            </div>
          )}
        </div>
        <div className={styles.matchVisual}>
          <Player key={me.nickname} nickname={me.nickname} imgUrl={me.imgUrl} />
          <div className={styles.score}>{`${me.score} : ${u.score}`}</div>
          <Player key={u.nickname} nickname={u.nickname} imgUrl={u.imgUrl} />
        </div>
      </div>
      {!isFolded && (
        <MatchDetail
          nickname={me.nickname}
          gameId={gameId}
          onUnfoldClick={handleUnfoldedClick}
        />
      )}
    </div>
  );
}
