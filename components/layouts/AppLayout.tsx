import { LayoutProps } from 'pages/_app';

import Alert from 'components/alerts/Alert';
import Header from 'components/layouts/Header';
import NavigationBar from 'components/layouts/NavigationBar';
import Modal from 'components/modals/Modal';
import ModalOnModal from 'components/modals/ModalOnModal';

import styles from 'styles/layouts/Layout.module.scss';

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div id='layoutRoot'>
      <Modal />
      <ModalOnModal />
      <Alert />
      <div className={styles.appLayoutContainer}>
        <Header />
        <div className={styles.pageContainer}>{children}</div>
        <NavigationBar />
      </div>
    </div>
  );
}
