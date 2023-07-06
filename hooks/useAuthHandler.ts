import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';
import { useQueryClient } from 'react-query';

import { loginState } from 'recoils/login';
import { openModalState } from 'recoils/modal';
import { sideBarState } from 'recoils/sideBar';
import { userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

export interface TokenResponse {
  accessToken: string;
}
const useAuthHandler = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [login, setLogin] = useRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const setSideBar = useSetRecoilState(sideBarState);
  const setOpenModal = useSetRecoilState(openModalState);
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
    router.push('/login');
  };

  const onSecondAuthFailure = () => {
    router.push('/authentication');
  };

  const onDupLoginAttempt = () => {
    if (login) router.push('/');
  };

  const onLogout = () => {
    removeCookie('Authorization', { path: '/' });
    setLogin(false);
    resetUserState();
    closeModal();
    setSideBar(null);
    queryClient.invalidateQueries(['userMe']);
    router.push('/');
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
