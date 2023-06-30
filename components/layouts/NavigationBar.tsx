import { useRecoilValue } from 'recoil';

import Link from 'next/link';

import React from 'react';
import {
  IoMdChatboxes,
  IoMdHome,
  IoMdPeople,
  IoMdPerson,
} from 'react-icons/io';

import { loginState } from 'recoils/login';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/layouts/NavigationBar.module.scss';

type navigation = {
  value: string | React.ReactNode;
  route: string;
};

export default function NavigationBar() {
  const login = useRecoilValue(loginState);
  const { useNeedLoginModal } = useModalProvider();

  const navigations: navigation[] = [
    { value: <IoMdHome />, route: '/' },
    { value: <IoMdChatboxes />, route: '/channels' },
    { value: <IoMdPeople />, route: '/friends' },
    { value: <IoMdPerson />, route: '/myPage' },
  ];

  if (login)
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
  else
    return (
      <div className={styles.navigationBarContainer}>
        {navigations.map(({ value, route }, i) => {
          if (route === '/')
            return (
              <div key={i} className={styles.buttonBackground}>
                <Link href={route} className={styles.button}>
                  {value}
                </Link>
              </div>
            );
          return (
            <div key={i} className={styles.buttonBackground}>
              <div className={styles.button} onClick={useNeedLoginModal}>
                {value}
              </div>
            </div>
          );
        })}
      </div>
    );
}
