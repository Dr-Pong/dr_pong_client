import {
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState
} from 'recoil';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';
import { openModalState } from 'recoils/modal';

import { useQueryClient } from 'react-query';
import getAuthorization from "../utils/cookieUtil";

interface TokenResponse {
  accessToken: string;
}
const useAuthHandler = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [login, setLogin] = useRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const setOpenModal = useSetRecoilState(openModalState);
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
    queryClient.invalidateQueries(['user_key']);
    router.push('/');
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
    setOpenModal(false);
    queryClient.invalidateQueries(['user_key']);
    router.push('/');
  };

  return {
    onAuthSuccess,
    onAuthFailure,
    onSecondAuthFailure,
    onDupLoginAttempt,
    onLogout,
  };
};

export default useAuthHandler;
