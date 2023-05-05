import { LayoutProps } from 'pages/_app';

import NavigationBar from 'components/layouts/NavigationBar';
import Modal from 'components/modals/Modal';

import styles from 'styles/layouts/Layout.module.scss';

export default function NavigationLayout({ children }: LayoutProps) {
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
