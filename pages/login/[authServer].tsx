import { useRouter } from 'next/router';

import { useLayoutEffect } from 'react';
import { ReactElement } from 'react';

import useAuthHandler from 'hooks/useAuthHandler';
import useCustomQuery from 'hooks/useCustomQuery';

import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';

export default function Login() {
  const router = useRouter();
  const { code, authServer } = router.query;
  const { mutationPost } = useCustomQuery();
  const { onAuthSuccess, onAuthFailure } = useAuthHandler();

  useLayoutEffect(() => {
    if (code) {
      mutationPost(`/auth/${authServer}`, {
        onSuccess: onAuthSuccess,
        onError: onAuthFailure,
      }).mutate({
        authCode: code,
      });
    }
  }, []);

  return <></>;
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <Layout>{page}</Layout>
    </LoginFilter>
  );
};
