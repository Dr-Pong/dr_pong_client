import Link from 'next/link';

import { FaHandsHelping } from 'react-icons/fa';
import { IoMdChatboxes, IoMdHome, IoMdPerson } from 'react-icons/io';

import styles from 'styles/layouts/NavigationBar.module.scss';

type navigation = {
  content: string | React.ReactNode;
  route: string;
  style: 'basic' | 'big';
};

export default function NavigationBar() {
  const navigations: navigation[] = [
    { content: <IoMdHome />, route: '/', style: 'basic' },
    { content: <IoMdChatboxes />, route: '/channels', style: 'basic' },
    { content: 'Game\nStart', route: '/game', style: 'big' },
    { content: <FaHandsHelping />, route: '/friends', style: 'basic' },
    { content: <IoMdPerson />, route: '/myPage', style: 'basic' },
  ];
  return (
    <div className={styles.navigationBarContainer}>
      {navigations.map(({ content, route, style }) => {
        return (
          <Link
            href={route}
            className={`${styles.navigationButton} ${styles[style]}`}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
