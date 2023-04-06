import NavigationBar from 'components/layouts/NavigationBar';

import styles from 'styles/layouts/Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.pageContainer}>{children}</div>
      <NavigationBar />
    </div>
  );
}
