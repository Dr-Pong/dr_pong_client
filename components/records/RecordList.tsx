import useTranslation from 'next-translate/useTranslation';

import React, { useEffect, useState } from 'react';

import { Record } from 'types/historyTypes';

import useRecordsQuery from 'hooks/useRecordsQuery';

import BasicButton from 'components/global/buttons/BasicButton';
import RecordBox from 'components/records/RecordBox';

import styles from 'styles/records/RecordList.module.scss';

export default function RecordList({ nickname }: { nickname: string }) {
  const { t } = useTranslation('records');
  const { matchHistoryFetch } = useRecordsQuery(nickname);
  const [records, setRecords] = useState<Record[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [lastGameId, setLastGameId] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await matchHistoryFetch(lastGameId);
      setIsLastPage(data.isLastPage);
      const { records } = data;
      if (records) setRecords((prev) => [...prev, ...records]);
    };
    loadData();
  }, [lastGameId]);

  const handleShowMoreClick = () => {
    setLastGameId(records.at(-1)?.gameId ?? 0);
  };

  if (records.length === 0) {
    return (
      <div className={styles.noRecord}>{t('no match')}</div>
    );
  };

  return (
    <div className={styles.recordListContainer}>
      {records.map((record, i) => {
        return <RecordBox key={i} record={record} />;
      })}
      {!isLastPage && (
        <BasicButton
          style={'flex'}
          color={'purple'}
          handleButtonClick={handleShowMoreClick}
        >
          {t('show more')}
        </BasicButton>
      )}
    </div>
  );
}
