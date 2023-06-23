import { useRecoilState, useResetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { useEffect } from 'react';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';

import { LayoutProps } from 'pages/_app';

import LoadingSpinner from 'components/global/LoadingSpinner';

export default function LoginFilter({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const [login, setLogin] = useRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const { get } = useCustomQuery();
  const { isLoading, isError } = get(
    ['userMe'],
    '/users/me',
    setUser
  );
  const router = useRouter();
  const [socket, disconnectSocket] = useChatSocket();

  useEffect(() => {
    if (login) socket.connect();
    else disconnectSocket();
    return () => {
      disconnectSocket();
    };
  }, [login]);

  if (user.roleType === 'member') setLogin(true);
  else setLogin(false);

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    resetUserState();
    setLogin(false);
    if (router.asPath !== '/') router.push('/');
  }
  if (user.roleType !== 'noname' && router.asPath === '/signUp')
    router.push('/');
  if (user.roleType === 'noname' && router.asPath !== '/signUp')
    router.push('/signUp');
  if (user.tfaRequired && router.asPath !== '/authentication')
    router.push('/authentication');
  return <>{children}</>;
}
