import { useRecoilValue } from 'recoil';

import { useLayoutEffect } from 'react';
import { ReactElement } from 'react';

import { loginState } from 'recoils/login';

import useAuthHandler from 'hooks/useAuthHandler';

import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';
import LoginButtons from 'components/login/LoginButtons';

import styles from 'styles/login/Login.module.scss';

export default function Login() {
  const login = useRecoilValue(loginState);
  const { onAuthFailure } = useAuthHandler();

  useLayoutEffect(() => {
    if (login) {
      onAuthFailure();
    }
  }, []);

  return (
    <div className={styles.loginPageContainer}>
      <LoginButtons />
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <Layout>{page}</Layout>
    </LoginFilter>
  );
};
