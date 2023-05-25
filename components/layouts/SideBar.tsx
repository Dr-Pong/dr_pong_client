import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React from 'react';
import { IoMdClose } from 'react-icons/io';

import { sideBarState } from 'recoils/sideBar';

import Messages from 'components/messages/Messages';
import Notifications from 'components/notifications/Notifications';

import styles from 'styles/layouts/SideBar.module.scss';

export default function SideBar() {
  const { t } = useTranslation('common');
  const [sideBar, setSideBar] = useRecoilState(sideBarState);

  const sideBarTypes: {
    [key: string]: { name: string; children: React.ReactNode };
  } = {
    message: {
      name: t('Messages'),
      children: <Messages />,
    },
    notification: {
      name: t('Notifications'),
      children: <Notifications />,
    },
  };

  const handleModalClose = () => {
    setSideBar(null);
  };

  if (!sideBar) return null;

  return (
    <div className={styles.sideBarBackdrop} onClick={handleModalClose}>
      <div
        className={styles.sideBarContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IoMdClose className={styles.closeButton} onClick={handleModalClose} />
        <div>{sideBarTypes[sideBar].name}</div>
        {sideBarTypes[sideBar].children}
      </div>
    </div>
  );
}
