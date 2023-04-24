import Link from 'next/link';

import { FaHandsHelping } from 'react-icons/fa';
import { IoMdChatboxes, IoMdHome, IoMdPerson } from 'react-icons/io';

import styles from 'styles/layouts/NavigationBar.module.scss';

type navigation = {
  value: string | React.ReactNode;
  route: string;
  style: 'basic' | 'big';
};

export default function NavigationBar() {
  const navigations: navigation[] = [
    { value: <IoMdHome />, route: '/', style: 'basic' },
    { value: <IoMdChatboxes />, route: '/channels', style: 'basic' },
    { value: 'Game\nStart', route: '/game', style: 'big' },
    { value: <FaHandsHelping />, route: '/friends', style: 'basic' },
    { value: <IoMdPerson />, route: '/myPage', style: 'basic' },
  ];
  return (
    <div className={styles.navigationBarContainer}>
      {navigations.map(({ value, route, style }, i) => {
        return (
          <div
            key={i}
            className={`${styles.navigationButton} ${styles[style]}`}
          >
            <Link href={route}>{value}</Link>
          </div>
        );
      })}
    </div>
  );
}
