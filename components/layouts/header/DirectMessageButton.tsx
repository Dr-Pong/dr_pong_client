import { useSetRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';

import useChatSocket from 'hooks/useChatSocket';
import useNewDotQuery from 'hooks/useNewDotQuery';

import styles from 'styles/layouts/Header.module.scss';

function DirectMessageButton() {
  const setSideBar = useSetRecoilState(sideBarState);
  const [newDot, setNewDot] = useState<boolean>(false);
  const { directMessageNewDotGet } = useNewDotQuery();
  const [socket] = useChatSocket('global');

  useEffect(() => {
    const newChatListener = () => {
      setNewDot(true);
    };

    socket.on('newChat', newChatListener);
    return () => {
      socket.off('newChat', newChatListener);
    };
  }, []);

  const { isLoading, isError } = directMessageNewDotGet(setNewDot);

  return (
    <div className={styles.iconNewDotWrap}>
      <RiSendPlaneFill
        className={`${styles.headerIcon}`}
        onClick={() => {
          setSideBar('directMessage');
        }}
      />
      {!isLoading && !isError && newDot && <div className={styles.newDot} />}
    </div>
  );
}

export default React.memo(DirectMessageButton);
