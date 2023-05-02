import React, { useEffect, useState } from 'react';

import { Record } from 'types/historyTypes';

import Match from 'components/matchHistory/Match';

import styles from 'styles/matchHistory/MatchHistory.module.scss';

import useMatchHistoryQuery from 'hooks/useMatchHistoryQuery';
import BasicButton from 'components/global/buttons/BasicButton';

export default function MatchHistory({ query }: { query: string }) {
  const { getMatchHistory } = useMatchHistoryQuery(query);
  const [matches, setMatches] = useState<Record[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [lastGameId, setLastGameId] = useState<number>(0);
  useEffect(() => {
    const { data } = getMatchHistory(lastGameId);
    setIsLastPage(data?.isLastPage);
    const records = data?.records;
    if (records) setMatches((prev) => [...prev, ...records]);
  }, [lastGameId]);
  const handleShowMoreClick = () => {
    setLastGameId(matches.at(-1)?.gameId ?? 0);
  };
  return (
    <div>
      {matches.map((r, i) => {
        return <Match key={i} record={r} />;
      })}
      {isLastPage && (
        <BasicButton
          style={'basic'}
          color={'white'}
          handleButtonClick={handleShowMoreClick}
        >
          {'▾'}
        </BasicButton>
      )}
    </div>
  );
}
