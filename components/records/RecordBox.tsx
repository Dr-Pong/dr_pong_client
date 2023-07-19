import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';

import React, { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { Record } from 'types/historyTypes';

import { timezoneResolverToString } from 'utils/timezoneResolver';

import MatchDetail from 'components/records/MatchDetail';
import Player from 'components/records/Player';

import styles from 'styles/records/RecordBox.module.scss';

export default function RecordBox({ record }: { record: Record }) {
  const { t } = useTranslation('records');
  const { me, you } = record;
  const { gameId, gameType, playedAt, result } = record;
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const date = new Date(playedAt);

  const handleArrowClick = () => {
    setShowDetail(!showDetail);
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };

  return (
    <div className={`${styles.recordBoxContainer} ${styles[result]}`}>
      <div className={styles.basicContent}>
        <div className={styles.leftBox}>
          <div className={styles.typeTimeWrap}>
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
            {isHovered && (
              <div className={styles.gameDate}>
                {timezoneResolverToString(date)}
              </div>
            )}
          </div>
          <div className={styles.detailArrow} onClick={handleArrowClick}>
            {showDetail ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
        </div>
        <div className={styles.playerScoreWrap}>
          <Player nickname={me.nickname} imgUrl={me.imgUrl} />
          <div className={styles.score}>{`${me.score} : ${you.score}`}</div>
          <Player nickname={you.nickname} imgUrl={you.imgUrl} />
        </div>
      </div>
      {showDetail && (
        <MatchDetail
          nickname={me.nickname}
          gameId={gameId}
          gameType={gameType}
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
