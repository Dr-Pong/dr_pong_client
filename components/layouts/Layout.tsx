import NavigationBar from 'components/layouts/NavigationBar';
import Modal from 'components/modals/Modal';

import styles from 'styles/layouts/Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div id='layoutRoot'>
      <Modal />
      <div className={styles.layoutContainer}>
        <div className={styles.pageContainer}>{children}</div>
        <NavigationBar />
      </div>
    </div>
  );
}
