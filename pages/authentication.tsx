import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import { useRouter } from 'next/router';

import { ReactElement } from 'react';

import { userState } from 'recoils/user';

import AuthenticationFrame from 'components/authentication/AuthenticationFrame';
import PageHeader from 'components/global/PageHeader';
import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/authentication/Authentication.module.scss';

export default function Authentication() {
  const { t } = useTranslation('authentication');
  const { tfaRequired } = useRecoilValue(userState);
  const router = useRouter();
  if (!tfaRequired) {
    router.push('/');
  }
  return (
    <div className={styles.authenticationPageContainer}>
      <PageHeader title={t('2fa')} />
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
