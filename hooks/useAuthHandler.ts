import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';

import { loginState } from 'recoils/login';
import { sideBarState } from 'recoils/sideBar';
import { userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

export interface TokenResponse {
  accessToken: string;
}
const useAuthHandler = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'Authorization',
    'NEXT_LOCALE',
  ]);
  const [login, setLogin] = useRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const setSideBar = useSetRecoilState(sideBarState);
  const { closeUpperModal } = useUpperModalProvider();
  const { useLoginRequiredModal, closeModal } = useModalProvider();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onAuthSuccess = (res: TokenResponse) => {
    const { accessToken } = res;
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    setCookie('Authorization', `${accessToken}`, {
      path: '/',
      expires,
      // httpOnly: true,
    });
    setLogin(true);
    queryClient.invalidateQueries(['userMe']);
    closeModal();
    closeUpperModal();
    router.push('/');
  };

  const onSecondAuthRegisterSuccess = (res: TokenResponse) => {
    onAuthSuccess(res);
    closeModal();
    closeUpperModal();
    queryClient.invalidateQueries('usersTfa');
  };

  const onAuthFailure = () => {
    removeCookie('Authorization', { path: '/' });
    setLogin(false);
    closeModal();
    closeUpperModal();
    router.push('/login');
  };

  const onSecondAuthFailure = () => {
    router.push('/authentication');
    closeModal();
    closeUpperModal();
  };

  const onDupLoginAttempt = () => {
    if (login) {
      router.push('/');
      closeModal();
      closeUpperModal();
    }
  };

  const onLogout = () => {
    removeCookie('Authorization', { path: '/' });
    setLogin(false);
    resetUserState();
    closeModal();
    closeUpperModal();
    setSideBar(null);
    queryClient.invalidateQueries(['userMe']);
    window.location.href = '/';
  };

  const onUnauthorizedAttempt = () => {
    onLogout();
    useLoginRequiredModal();
  };

  return {
    onAuthSuccess,
    onSecondAuthRegisterSuccess,
    onAuthFailure,
    onSecondAuthFailure,
    onDupLoginAttempt,
    onLogout,
    onUnauthorizedAttempt,
  };
};

export default useAuthHandler;
