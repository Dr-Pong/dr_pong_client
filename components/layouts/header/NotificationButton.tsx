import { useSetRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react';
import { TbBellFilled } from 'react-icons/tb';

import { sideBarState } from 'recoils/sideBar';

import useChatSocket from 'hooks/useChatSocket';
import useNewDotQuery from 'hooks/useNewDotQuery';

import styles from 'styles/layouts/Header.module.scss';

function NotificationButton() {
  const setSideBar = useSetRecoilState(sideBarState);
  const { notificationNewDotGet } = useNewDotQuery();
  const [newDot, setNewDot] = useState<boolean>(false);
  const [socket] = useChatSocket();

  useEffect(() => {
    socket.on('invite', () => {
      setNewDot(true);
    });
    socket.on('friend', () => {
      setNewDot(true);
    });
    return () => {
      socket.off('invite');
      socket.off('friend');
    };
  }, []);

  const { isLoading, isError } = notificationNewDotGet(setNewDot);
  if (isLoading || isError) return <TbBellFilled />;

  return (
    <div className={styles.iconNewDotWrap}>
      <TbBellFilled
        className={`${styles.headerIcon}`}
        onClick={() => {
          setSideBar('notification');
        }}
      />
      {newDot && <div className={styles.newDot} />}
    </div>
  );
}

export default NotificationButton;
