import Link from 'next/link';

import { FaHandsHelping } from 'react-icons/fa';
import { IoMdChatboxes, IoMdHome, IoMdPerson } from 'react-icons/io';

import styles from 'styles/layouts/NavigationBar.module.scss';

export default function NavigationBar() {
  return (
    <div className={styles.navigationBarContainer}>
      <Link href='/' className={styles.navigationButton}>
        <IoMdHome />
      </Link>
      <Link href='/channels' className={styles.navigationButton}>
        <IoMdChatboxes />
      </Link>
      <Link
        href='/game'
        className={`${styles.navigationButton} ${styles.mainButton}`}
      >
        Game
        <br />
        Start
      </Link>
      <Link href='/friends' className={styles.navigationButton}>
        <FaHandsHelping />
      </Link>
      <Link href='/myPage' className={styles.navigationButton}>
        <IoMdPerson />
      </Link>
    </div>
  );
}
