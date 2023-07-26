import React, { useEffect, useState } from 'react';

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
  const [seconds, setSeconds] = useState(0);
  const [socket] = useChatSocket('global');

  useEffect(() => {
    socket.on('deleteInvite', handleGameCancel);

    if (!useTimer) return () => socket.off('deleteInvite', handleGameCancel);

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      socket.off('deleteInvite', handleGameCancel);
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
