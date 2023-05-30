import Link from 'next/link';

import {
  IoMdChatboxes,
  IoMdHome,
  IoMdPeople,
  IoMdPerson,
} from 'react-icons/io';

import styles from 'styles/layouts/NavigationBar.module.scss';

type navigation = {
  value: string | React.ReactNode;
  route: string;
};

export default function NavigationBar() {
  const navigations: navigation[] = [
    { value: <IoMdHome />, route: '/' },
    { value: <IoMdChatboxes />, route: '/channels' },
    { value: <IoMdPeople />, route: '/friends' },
    { value: <IoMdPerson />, route: '/myPage' },
  ];

  return (
    <div className={styles.navigationBarContainer}>
      {navigations.map(({ value, route }, i) => {
        return (
          <div key={i} className={styles.buttonBackground}>
            <Link href={route} className={styles.button}>
              {value}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
