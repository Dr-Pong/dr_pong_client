import { useRecoilState, useResetRecoilState } from 'recoil';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';

import { LayoutProps } from 'pages/_app';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

export default function LoginFilter({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const setLoginState = useSetRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError, error } = get(
    ['user_key'],
    '/users/me',
    setUser
  );
  const router = useRouter();
  const [socket, disconnectSocket] = useChatSocket();

  useEffect(() => {
    socket.connect();
    return () => {
      disconnectSocket();
    };
  }, []);
  if (user.roleType === 'member') setLoginState(true);
  else setLoginState(false);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;
  if (error) {
    resetUserState();
    router.push('/');
  }
  if (user.roleType !== 'noname' && router.asPath === '/signUp')
    router.push('/');
  if (user.roleType === 'noname' && router.asPath !== '/signUp')
    router.push('/signUp');
  if (user.tfaRequired && router.asPath !== '/authentication')
    router.push('/authentication');
  return <>{children}</>;
}
