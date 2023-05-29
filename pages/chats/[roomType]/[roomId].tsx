import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { RiSettings4Fill } from 'react-icons/ri';

import Chattings from 'components/chats/Chattings';
import PageHeader from 'components/global/PageHeader';

import styles from 'styles/chats/Chats.module.scss';

export default function Chats() {
  const router = useRouter();
  const { roomType, roomId } = router.query;

  let button;
  useEffect(() => {
    if (roomType !== 'dm' && roomType !== 'channel') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);
  if (roomType === 'channel')
    button = { value: <RiSettings4Fill />, handleButtonClick: () => null };
  return (
    <div className={styles.chats}>
      <PageHeader title={'chats'} button={button} />
      <Chattings roomId={roomId as string} />
    </div>
  );
}
