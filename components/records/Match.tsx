import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { Record } from 'types/historyTypes';

import MatchDetail from 'components/records/MatchDetail';
import Player from 'components/records/Player';

import styles from 'styles/records/Match.module.scss';

export default function Match({ record }: { record: Record }) {
  const { t } = useTranslation('records');
  const { me, you: u } = record;
  const { gameId, gameType, playedAt, result } = record;
  const [isFolded, setIsFolded] = React.useState<boolean>(true);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const date = new Date(playedAt);
  const handleFoldedClick = () => {
    setIsFolded(false);
  };
  const handleUnfoldedClick = () => {
    setIsFolded(true);
  };
  const handleHover = () => {
    setIsHovered(true);
  };
  const handleUnhover = () => {
    setIsHovered(false);
  };

  return (
    <div className={`${styles.match} ${styles[result]}`}>
      <div className={styles.matchBrief}>
        <div className={styles.matchText}>
          <div className={styles.gameType}>{t(gameType)}</div>
          <div
            className={styles.playedAt}
            onTouchStart={handleHover}
            onTouchEnd={handleUnhover}
            onMouseOver={handleHover}
            onMouseOut={handleUnhover}
          >
            {getTimeAgo(playedAt, t)}
          </div>
          {isFolded && (
            <div className={styles.unfold} onClick={handleFoldedClick}>
              {'▾'}
            </div>
          )}
          {isHovered && (
            <div className={styles.gameDate}>{date.toString()}</div>
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
          gameType={gameType}
          onUnfoldClick={handleUnfoldedClick}
        />
      )}
    </div>
  );
}

/**
 * 게임시간으로부터 현재까지 경과된 시간을 초(second) 단위로 반환
 * @param {string} gameTime 게임종료 시간
 * @return 초
 * */
const getElapsedTimeSeconds = (gameTime: string) => {
  return (Number(new Date()) - Number(new Date(gameTime))) / 1000;
};

/**
 * 게임종료 시간을 받아 현재 시간으로부터 몇 년/개월/일/시간/분/방금 전인지 반환
 * @param {string} gameTime 게임종료 시간
 * @param {Translate} t next-translate의 t 함수
 * @return 현재 시간으로부터 얼마 전
 * */
const getTimeAgo = (gameTime: string, t: Translate) => {
  const elapsedTimeSeconds = getElapsedTimeSeconds(gameTime) - 60 * 10;
  const timeUnits = [
    { unit: t('year'), second: 60 * 60 * 24 * 365 },
    { unit: t('month'), second: 60 * 60 * 24 * 30 },
    { unit: t('day'), second: 60 * 60 * 24 },
    { unit: t('hour'), second: 60 * 60 },
    { unit: t('minute'), second: 60 },
  ];
  for (const timeUnit of timeUnits) {
    const elapsedTime = Math.floor(elapsedTimeSeconds / timeUnit.second);
    if (elapsedTime > 0) return `${elapsedTime}${timeUnit.unit} ${t('ago')}`;
  }
  return t('a moment ago');
};
