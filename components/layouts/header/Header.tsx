import { useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';
import { RiSettings4Fill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';
import { userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';

import SideBar from 'components/layouts/SideBar';
import DirectMessageButton from 'components/layouts/header/DirectMessageButton';
import NotificationButton from 'components/layouts/header/NotificationButton';

import styles from 'styles/layouts/Header.module.scss';

export default function Header() {
  const { useSettingsModal } = useModalProvider();
  const { roleType } = useRecoilValue(userState);

  const sideBar = useRecoilValue(sideBarState);

  useEffect(() => {
    console.log(sideBar);
  }, [sideBar]);
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
