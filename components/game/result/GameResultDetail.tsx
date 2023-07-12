import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React from 'react';

import { userState } from 'recoils/user';

import useRecordsQuery from 'hooks/useRecordsQuery';

import ExpProgressBar from 'components/game/result/ExpProgressBar';
import LpProgressBar from 'components/game/result/LpProgressBar';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const { me, rounds } = data;

  return (
    <div className={styles.gameResultDetailContainer}>
      <div className={styles.gameRoundsBox}>
        <div className={styles.gameRoundsTitle}>{t('match detail')}</div>
        <RoundRecordsBox rounds={rounds} theme={'transparent'} />
      </div>
      <ExpProgressBar gameId={gameId} />
      {gameType === 'rank' && <LpProgressBar lpData={me} />}
    </div>
  );
}
