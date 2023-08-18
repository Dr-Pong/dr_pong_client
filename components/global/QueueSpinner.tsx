import React, { useEffect, useState } from 'react';

import useTranslation from 'next-translate/useTranslation';

import { useSetRecoilState } from 'recoil';

import { alertState } from 'recoils/alert';

import useChatSocket from 'hooks/useChatSocket';

import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/global/QueueSpinner.module.scss';

export default function QueueSpinner({
  useTimer,
  handleGameCancel,
}: {
  useTimer: boolean;
  handleGameCancel: () => void;
}) {
  const { t } = useTranslation('game');
  const setAlert = useSetRecoilState(alertState);
  const [seconds, setSeconds] = useState(0);
  const [socket] = useChatSocket('global');

  useEffect(() => {
    const handleGameDeclined = () => {
      setAlert({
        type: 'warning',
        message: t('declined'),
      });
      handleGameCancel();
    }
    socket.on('deleteInvite', handleGameDeclined);
    (document.activeElement as HTMLElement)?.blur();

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      socket.off('deleteInvite', handleGameDeclined);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.queueSpinnerContainer}>
      <LoadingSpinner />
      {useTimer && <div className={styles.time}>{seconds}</div>}
    </div>
  );
}
