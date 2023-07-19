import { LayoutProps } from 'pages/_app';

import Alert from 'components/alerts/Alert';
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
        <div className={styles.pageContainer}>{children}</div>
      </div>
    </div>
  );
}
