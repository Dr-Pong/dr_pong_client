import { useRecoilValue } from 'recoil';

import Link from 'next/link';

import React, { MouseEvent } from 'react';
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
  const { useLoginRequiredModal } = useModalProvider();

  const navigations: navigation[] = [
    { value: <IoMdHome />, route: '/' },
    { value: <IoMdChatboxes />, route: '/channels' },
    { value: <IoMdPeople />, route: '/friends' },
    { value: <IoMdPerson />, route: '/myPage' },
  ];

  const isAllowed = (route: string) => {
    return login || route === '/';
  };

  const blockUnauthorized = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    useLoginRequiredModal();
  };

  return (
    <div className={styles.navigationBarContainer}>
      {navigations.map(({ value, route }, i) => {
        return (
          <div key={i} className={styles.buttonBackground}>
            <Link
              href={route}
              className={styles.button}
              onClick={isAllowed(route) ? () => {} : blockUnauthorized}
            >
              {value}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
