import { LayoutProps } from 'pages/_app';

import React, { useEffect } from 'react';

import useChatSocket from 'hooks/useChatSocket';
import useUpperModalProvider from 'hooks/useUpperModalProvider';
import useAuthHandler from 'hooks/useAuthHandler';

import Alert from 'components/alerts/Alert';
import NavigationBar from 'components/layouts/NavigationBar';
import Header from 'components/layouts/header/Header';
import Modal from 'components/modals/Modal';
import UpperModal from 'components/modals/UpperModal';

import styles from 'styles/layouts/Layout.module.scss';

export default function AppLayout({ children }: LayoutProps) {
  const [socket] = useChatSocket('global');
  const { onLogout } = useAuthHandler();
  const { useIsInGameModal, multiConnectWarningMoal } = useUpperModalProvider();

  useEffect(() => {
    const isInGameListener = (data: { roomId: string }) => {
      if (!data.roomId) return;
      useIsInGameModal(data.roomId);
    };
    const multiConnectListener = () => {
      multiConnectWarningMoal(onLogout);
    };
    socket.on('isInGame', isInGameListener);
    socket.on('multiConnect', multiConnectListener);
    return () => {
      socket.off('isInGame', isInGameListener);
      socket.off('multiConnect', multiConnectListener);
    };
  }, []);

  return (
    <div id='layoutRoot'>
      <Modal />
      <UpperModal />
      <Alert />
      <div className={styles.appLayoutContainer}>
        <Header />
        <div className={styles.pageContainer}>{children}</div>
        <NavigationBar />
      </div>
    </div>
  );
}
