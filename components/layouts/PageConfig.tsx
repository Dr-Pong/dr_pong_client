import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useBgm } from 'hooks/useBgm';
import { useSoundEffect } from 'hooks/useSoundEffect';
import useChatSocket from 'hooks/useChatSocket';
import useUpperModalProvider from 'hooks/useUpperModalProvider';
import useAuthHandler from 'hooks/useAuthHandler';

import { isInGame } from 'types/gameTypes';

export default function PageConfig() {
  const { bgms, loaded: bgmLoaded } = useBgm();
  const { effects, loaded: effectLoaded } = useSoundEffect();
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();
  const [socket] = useChatSocket('global');
  const { onLogout } = useAuthHandler();
  const { useIsInGameModal, multiConnectWarningModal } = useUpperModalProvider();

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
      useIsInGameModal(data);
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
