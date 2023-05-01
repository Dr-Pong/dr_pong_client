import React from 'react';

import { Record } from 'types/historyTypes';

import styles from 'styles/matchHistory/MatchHistory.module.scss';

import Match from './Match';

export default function MatchHistory({ query }: { query: string }) {
  // const [matches, setMatches] = React.useState<Record[]>([]);
  const matches: Record[] = []; // TODO: get matches from api
  return (
    <div>
      {matches.map((r, i) => {
        return <Match key={i} record={r} />;
      })}
      <div>더보기버튼</div>
    </div>
  );
}
