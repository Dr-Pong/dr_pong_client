import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React from 'react';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import { LayoutProps } from 'pages/_app';

import LoadingSpinner from 'components/global/LoadingSpinner';

export default function LoginFilter({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const setLogin = useSetRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const { get } = useCustomQuery();
  const { useLoginRequiredModal } = useModalProvider();
  const { isLoading } = get(['userMe'], '/users/me', setUser, {
    onSuccess: () => {
      if (user.roleType === 'member') setLogin(true);
      else setLogin(false);
    },
    onError: () => {
      resetUserState();
      setLogin(false);
      if (router.asPath !== '/') router.push('/');
    },
  });
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;

  if (user.roleType !== 'noname' && router.asPath === '/signUp') {
    router.push('/');
    return null;
  }
  if (user.roleType === 'noname' && router.asPath !== '/signUp') {
    router.push('/signUp');
    return null;
  }
  if (user.tfaRequired && router.asPath !== '/authentication') {
    router.push('/authentication');
    return null;
  }
  if (
    user.roleType === 'guest' &&
    router.asPath !== '/' &&
    router.asPath !== '/leaderboard' &&
    router.asPath !== '/channels' &&
    !router.asPath.startsWith('/records') &&
    !router.asPath.startsWith('/login')
  ) {
    useLoginRequiredModal();
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
