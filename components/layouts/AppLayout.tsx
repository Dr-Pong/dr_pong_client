import { LayoutProps } from 'pages/_app';

import Alert from 'components/alerts/Alert';
import NavigationBar from 'components/layouts/NavigationBar';
import Header from 'components/layouts/header/Header';
import Modal from 'components/modals/Modal';
import UpperModal from 'components/modals/UpperModal';

import styles from 'styles/layouts/Layout.module.scss';

export default function AppLayout({ children }: LayoutProps) {
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
