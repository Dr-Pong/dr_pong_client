import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { Record, RecordDetail } from 'types/historyTypes';

import useRecordsQuery from 'hooks/useRecordsQuery';

import LadderPoint from 'components/records/LadderPoint';
import RoundRecordsBox from 'components/records/RoundRecordsBox';

import styles from 'styles/records/MatchDetail.module.scss';

type MatchDetailProps = {
  nickname: string;
  gameId: number;
  gameType: Record['gameType'];
};

export default function MatchDetail({
  nickname,
  gameId,
  gameType,
}: MatchDetailProps) {
  const { t } = useTranslation('records');
  const { matchDetailGet } = useRecordsQuery(nickname);
  const { data, isLoading } = matchDetailGet(gameId);

  if (isLoading) return <div>loading...</div>;
  const { duration, me, you, rounds } = data as RecordDetail;

  const parseDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}${t('minute')} ${seconds}${t('second')}`;
  };

  return (
    <div className={styles.matchDetailContainer}>
      <div className={styles.duration}>{parseDuration(duration)}</div>
      <div className={styles.infographics}>
        {gameType === 'rank' && (
          <div className={styles.ladderPoints}>
            <LadderPoint lp={me.lp} lpChange={me.lpChange} />
            <div></div>
            <LadderPoint lp={you.lp} lpChange={you.lpChange} />
          </div>
        )}
        <RoundRecordsBox rounds={rounds} />
      </div>
    </div>
  );
}
