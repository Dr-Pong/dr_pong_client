import { useRouter } from 'next/router';

import { useLayoutEffect } from 'react';
import { ReactElement } from 'react';

import useAuthHandler from 'hooks/useAuthHandler';
import useCustomQuery from 'hooks/useCustomQuery';

import Layout from 'components/layouts/Layout';

export default function Login() {
  const router = useRouter();
  const { code, authServer } = router.query;
  const { mutationPost } = useCustomQuery();
  const { onAuthSuccess, onAuthFailure } = useAuthHandler();
  const { mutate } = mutationPost(`/auth/${authServer}`, {
    onSuccess: onAuthSuccess,
    onError: onAuthFailure,
  });
  useLayoutEffect(() => {
    if (code) {
      mutate({
        authCode: code,
      });
    }
  }, []);

  return <></>;
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
