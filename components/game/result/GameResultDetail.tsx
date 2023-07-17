import { Fireworks } from 'fireworks-js';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';

import { userState } from 'recoils/user';

import useRecordsQuery from 'hooks/useRecordsQuery';

import ExpProgressBar from 'components/game/result/ExpProgressBar';
import LpProgressBar from 'components/game/result/LpProgressBar';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import RoundRecordsBox from 'components/records/RoundRecordsBox';

import styles from 'styles/game/result/GameResultDetail.module.scss';

export default function GameResultDetail({
  gameId,
  gameType,
}: {
  gameId: number;
  gameType: string;
}) {
  const { t } = useTranslation('game');
  const { nickname } = useRecoilValue(userState);
  const { matchDetailGet } = useRecordsQuery(nickname);
  const { data, isLoading, isError, error } = matchDetailGet(gameId);
  const [showFireworks, setShowFireworks] = React.useState(false);

  useEffect(() => {
    if (showFireworks) {
      const container = document.getElementById('fireworks');
      const fireworks = new Fireworks(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 30,
          max: 60,
        },
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3,
          },
          trace: {
            min: 1,
            max: 2,
          },
        },
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
        mouse: {
          click: false,
          move: false,
          max: 1,
        },
      });
      fireworks.start();
    }
  }, [showFireworks]);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const { me, rounds } = data;

  return (
    <div className={styles.gameResultDetailContainer}>
      <div className={styles.gameRoundsBox}>
        <div className={styles.gameRoundsTitle}>{t('match detail')}</div>
        <RoundRecordsBox rounds={rounds} theme={'transparent'} />
      </div>
      <ExpProgressBar gameId={gameId} setShowFireworks={setShowFireworks} />
      {gameType === 'ladder' && (
        <LpProgressBar lpData={me} setShowFireworks={setShowFireworks} />
      )}
    </div>
  );
}
