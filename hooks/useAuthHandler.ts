import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';

interface TokenResponse {
  accessToken: string;
}
const useAuthHandler = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const setLogin = useSetRecoilState(loginState);
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

  return { onAuthSuccess, onAuthFailure, onSecondAuthFailure };
};

export default useAuthHandler;
