import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

import { sideBarState } from 'recoils/sideBar';

import Participants from 'components/channels/participants/Participants';
import DirectMessages from 'components/directMessages/DirectMessages';
import Notifications from 'components/notifications/Notifications';

import styles from 'styles/layouts/SideBar.module.scss';

export default function SideBar() {
  const { t } = useTranslation('common');
  const [sideBar, setSideBar] = useRecoilState(sideBarState);

  const sideBarTypes: {
    [key: string]: { name: string; children: React.ReactNode };
  } = {
    directMessage: {
      name: t('Messages'),
      children: <DirectMessages />,
    },
    notification: {
      name: t('Notifications'),
      children: <Notifications />,
    },
    participants: {
      name: t('Participants'),
      children: <Participants />,
    },
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (sideBar) setSideBar(null);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [sideBar]);

  const handleSideBarClose = () => {
    setSideBar(null);
  };

  if (!sideBar) return null;

  return createPortal(
    <div className={styles.sideBarBackdrop} onClick={handleSideBarClose}>
      <div
        className={styles.sideBarContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IoMdClose
          className={styles.closeButton}
          onClick={handleSideBarClose}
        />
        <div>{sideBarTypes[sideBar]?.name}</div>
        {sideBarTypes[sideBar]?.children}
      </div>
    </div>,
    document.getElementById('sideBarRoot') as HTMLElement
  );
}
