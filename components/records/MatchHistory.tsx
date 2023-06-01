import React, { useEffect, useState } from 'react';

import { Record } from 'types/historyTypes';

import useRecordsQuery from 'hooks/useRecordsQuery';

import BasicButton from 'components/global/buttons/BasicButton';
import Match from 'components/records/Match';

import styles from 'styles/records/MatchHistory.module.scss';

export default function MatchHistory({ nickname }: { nickname: string }) {
  const { matchHistoryFetch } = useRecordsQuery(nickname);
  const [matches, setMatches] = useState<Record[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [lastGameId, setLastGameId] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await matchHistoryFetch(lastGameId);
      setIsLastPage(data.isLastPage);
      const { records } = data;
      if (records) setMatches((prev) => [...prev, ...records]);
    };
    loadData();
  }, [lastGameId]);

  const handleShowMoreClick = () => {
    setLastGameId(matches.at(-1)?.gameId ?? 0);
  };

  return (
    <div className={styles.matchHistory}>
      {matches.map((r, i) => {
        return <Match key={i} record={r} />;
      })}
      {!isLastPage && (
        <BasicButton
          style={'big'}
          color={'white'}
          handleButtonClick={handleShowMoreClick}
        >
          {'▾'}
        </BasicButton>
      )}
    </div>
  );
}
