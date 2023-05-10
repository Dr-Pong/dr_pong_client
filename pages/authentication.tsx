import useTranslation from 'next-translate/useTranslation';

import { ReactElement } from 'react';

import AuthenticationFrame from 'components/authentication/AuthenticationFrame';
import PageHeader from 'components/global/PageHeader';
import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/authentication/Authentication.module.scss';

export default function Authentication() {
  const { t } = useTranslation('authentication');

  return (
    <div className={styles.AuthenticationPageContainer}>
      <PageHeader title={t('2fa')} button={null} />
      <AuthenticationFrame />
    </div>
  );
}

Authentication.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <Layout>{page}</Layout>
    </LoginFilter>
  );
};
