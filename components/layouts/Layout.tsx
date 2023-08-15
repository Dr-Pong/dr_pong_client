import React from 'react';

import { LayoutProps } from 'pages/_app';

import Alert from 'components/alerts/Alert';
import AdsLayout from 'components/layouts/AdsLayout';
import Modal from 'components/modals/Modal';
import UpperModal from 'components/modals/UpperModal';

import styles from 'styles/layouts/Layout.module.scss';

export default function Layout({ children }: LayoutProps) {
  return (
    <div id='layoutRoot'>
      <Modal />
      <UpperModal />
      <Alert />
      <div className={styles.layoutContainer}>
        <AdsLayout>
          <div className={styles.pageContainer}>{children}</div>
        </AdsLayout>
      </div>
    </div>
  );
}
