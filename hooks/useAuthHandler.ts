import { useRecoilState, useResetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';
import { userState } from 'recoils/user';

interface TokenResponse {
  accessToken: string;
}
const useAuthHandler = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [login, setLogin] = useRecoilState(loginState);
  const resetUserState = useResetRecoilState(userState);
  const router = useRouter();

  const onAuthSuccess = (res: TokenResponse) => {
    const { accessToken } = res;
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    setCookie('Authorization', `Bearer ${accessToken}`, {
      path: '/',
      expires,
      // httpOnly: true,
    });
    setLogin(true);
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
    removeCookie('Authorization');
    setLogin(false);
    resetUserState();
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
