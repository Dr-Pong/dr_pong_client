import { LayoutProps } from 'pages/_app';

import Modal from 'components/modals/Modal';

import styles from 'styles/layouts/Layout.module.scss';

export default function Layout({ children }: LayoutProps) {
  return (
    <div id='layoutRoot'>
      <Modal />
      <div className={styles.layoutContainer}>
        <div className={styles.pageContainer}>{children}</div>
      </div>
    </div>
  );
}
