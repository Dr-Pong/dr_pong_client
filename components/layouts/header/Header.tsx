import { useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { RiSettings4Fill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';
import { userState } from 'recoils/user';

import { Invitation } from 'types/notificationTypes';

import useChatSocket from 'hooks/useChatSocket';
import useModalProvider from 'hooks/useModalProvider';

import SideBar from 'components/layouts/SideBar';
import DirectMessageButton from 'components/layouts/header/DirectMessageButton';
import NotificationButton from 'components/layouts/header/NotificationButton';
import InvitationBox from 'components/notifications/InvitationBox';

import styles from 'styles/layouts/Header.module.scss';

export default function Header() {
  const { useSettingsModal } = useModalProvider();
  const { roleType } = useRecoilValue(userState);
  const sideBar = useRecoilValue(sideBarState);
  const [socket] = useChatSocket('global');

  useEffect(() => {
    const newInvitationListener = (data: Invitation) => {
      const type = 'channelId' in data ? 'channel' : 'game';
      if (sideBar !== 'notification')
        toast.custom((t) => (
          <InvitationBox
            key={data.id}
            type={type}
            invitation={data}
            toastId={t.id}
          />
        ));
    };
    socket.on('invite', newInvitationListener);

    return () => {
      socket.off('invite', newInvitationListener);
    };
  }, []);

  return (
    <div>
      <SideBar />
      <div className={styles.headerContainer}>
        <RiSettings4Fill
          className={styles.headerIcon}
          onClick={useSettingsModal}
        />
        {roleType === 'member' && (
          <div>
            <DirectMessageButton />
            <NotificationButton />
          </div>
        )}
      </div>
    </div>
  );
}
