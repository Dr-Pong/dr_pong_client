import React, { ReactElement, useLayoutEffect } from 'react';

import useAuthHandler from 'hooks/useAuthHandler';

import Layout from 'components/layouts/Layout';
import OauthButtons from 'components/login/OauthButtons';

import styles from 'styles/login/Login.module.scss';

export default function Login() {
  const { onDupLoginAttempt } = useAuthHandler();
  useLayoutEffect(() => {
    onDupLoginAttempt();
  }, []);
  return (
    <div className={styles.loginPageContainer}>
      <OauthButtons />
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
