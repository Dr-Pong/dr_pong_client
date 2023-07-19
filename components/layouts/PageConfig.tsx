import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { isInGame } from 'types/gameTypes';

import useAuthHandler from 'hooks/useAuthHandler';
import { useBgm } from 'hooks/useBgm';
import useChatSocket from 'hooks/useChatSocket';
import { useSoundEffect } from 'hooks/useSoundEffect';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

export default function PageConfig() {
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();
  const [socket] = useChatSocket('global');
  const { onLogout } = useAuthHandler();
  const { useIsInGameModal, multiConnectWarningModal } =
    useUpperModalProvider();

  useBgm();
  useSoundEffect();

  useEffect(() => {
    if (!cookie.NEXT_LOCALE) {
      const locale = navigator.language.split('-')[0];
      setCookie('NEXT_LOCALE', locale === 'ko' ? 'ko' : 'en', {
        path: '/',
      });
      const { pathname, query } = router;
      router.replace({ pathname, query }, pathname, {
        locale: locale === 'ko' ? 'ko' : 'en',
      });
    }
    const isInGameListener = (data: isInGame) => {
      if (data?.roomId) useIsInGameModal(data);
    };
    const multiConnectListener = () => {
      multiConnectWarningModal(onLogout);
    };
    socket.on('isInGame', isInGameListener);
    socket.on('multiConnect', multiConnectListener);
    return () => {
      socket.off('isInGame', isInGameListener);
      socket.off('multiConnect', multiConnectListener);
    };
  });

  return <></>;
}
