import { LayoutProps } from 'pages/_app';

import React, { useEffect } from 'react';

import useChatSocket from 'hooks/useChatSocket';
import useUpperModalProvider from 'hooks/useUpperModalProvider';
import useAuthHandler from 'hooks/useAuthHandler';

import Alert from 'components/alerts/Alert';
import Modal from 'components/modals/Modal';
import UpperModal from 'components/modals/UpperModal';

import styles from 'styles/layouts/Layout.module.scss';

export default function Layout({ children }: LayoutProps) {
  const [socket] = useChatSocket('global');
  const { onLogout } = useAuthHandler();
  const { multiConnectWarningModal } = useUpperModalProvider();

  useEffect(() => {
    const multiConnectListener = () => {
      multiConnectWarningModal(onLogout);
    };
    socket.on('multiConnect', multiConnectListener);
    return () => {
      socket.off('multiConnect', multiConnectListener);
    }
  }, []);

  return (
    <div id='layoutRoot'>
      <Modal />
      <UpperModal />
      <Alert />
      <div className={styles.layoutContainer}>
        <div className={styles.pageContainer}>{children}</div>
      </div>
    </div>
  );
}
