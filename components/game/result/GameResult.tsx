import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import { useRouter } from 'next/router';

import React from 'react';

import { userState } from 'recoils/user';

import { Record } from 'types/historyTypes';

import useRecordsQuery from 'hooks/useRecordsQuery';

import GameResultDetail from 'components/game/result/GameResultDetail';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';
import Player from 'components/records/Player';

import styles from 'styles/game/result/GameResult.module.scss';

export default function GameResult() {
  const { t } = useTranslation('game');
  const { nickname } = useRecoilValue(userState);
  const { gameResultGet } = useRecordsQuery(nickname);
  const { data, isLoading, isError, error } = gameResultGet();
  const router = useRouter();
  const handleConfirmClick = () => {
    router.replace('/game');
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const { gameId, gameType, me, you, result }: Record = data.records[0];

  return (
    <div className={styles.resultScreen}>
      <div className={styles.gameResultContainer}>
        <div className={styles.versusPlayer}>
          <div className={styles.versus}> vs </div>
          <Player nickname={you.nickname} imgUrl={you.imgUrl} />
        </div>
        <div className={styles.gameResultBox}>
          <div className={styles.gameResult}>
            <div className={styles.gameResultTitle}>{t('game result')}</div>
            <div className={styles.gameResultType}>{t(result)}</div>
          </div>
          <div className={styles.gameScore}>{`${me.score} : ${you.score}`}</div>
        </div>
        <GameResultDetail gameId={gameId} gameType={gameType} />
        <BasicButton
          style={'basic'}
          color={'pink'}
          handleButtonClick={handleConfirmClick}
        >
          {t('confirm')}
        </BasicButton>
      </div>
      <div id={'fireworks'} className={styles.fireworks} />
    </div>
  );
}
