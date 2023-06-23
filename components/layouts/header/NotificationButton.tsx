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
    const newDotListener = () => {
      setNewDot(true);
    };
    socket.on('invite', newDotListener);
    socket.on('friend', newDotListener);
    return () => {
      socket.off('invite', newDotListener);
      socket.off('friend', newDotListener);
    };
  }, []);

  notificationNewDotGet(setNewDot);

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
