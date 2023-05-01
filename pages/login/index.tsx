import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useLayoutEffect } from 'react';
import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';

import LoginButtons from 'components/login/LoginButtons';

import styles from 'styles/login/Login.module.scss';

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [login, setLogin] = useRecoilState(loginState);
  const router = useRouter();

  useLayoutEffect(() => {
    if (login) {
      removeCookie('Authorization');
      setLogin(false);
      router.push('/');
    }
  }, []);

  return (
    <div className={styles.loginPageContainer}>
      <LoginButtons />
    </div>
  );
}
