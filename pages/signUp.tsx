import useTranslation from 'next-translate/useTranslation';

import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import Layout from 'components/layouts/Layout';
import SignUpFrame from 'components/signUp/SignUpFrame';

import styles from 'styles/signUp/SignUp.module.scss';

export default function SignUp() {
  const { t } = useTranslation('signUp');

  return (
    <div className={styles.signUpPageContainer}>
      <PageHeader title={t('Set profile')} />
      <SignUpFrame />
    </div>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
