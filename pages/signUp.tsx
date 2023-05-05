import { ReactElement } from 'react';

import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';
import SignUpFrame from 'components/signUp/SignUpFrame';

import styles from 'styles/signUp/SignUp.module.scss';

export default function SignUp() {
  return (
    <div className={styles.signUpPageContainer}>
      <SignUpFrame />
    </div>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <Layout>{page}</Layout>
    </LoginFilter>
  );
};
