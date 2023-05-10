import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useLayoutEffect } from 'react';
import { ReactElement } from 'react';
import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';

import useCustomQuery from 'hooks/useCustomQuery';

import Layout from 'components/layouts/Layout';
import LoginFilter from 'components/layouts/LoginFilter';

export default function Login() {
  const setLogin = useSetRecoilState(loginState);
  const router = useRouter();
  const { code, authServer } = router.query;
  const { mutationPost } = useCustomQuery();
  const [cookies, setCookie] = useCookies(['Authorization']);

  useLayoutEffect(() => {
    if (code) {
      mutationPost(`/auth/${authServer}`, {
        onSuccess: (res) => {
          setCookie('Authorization', `Bearer ${res.data.token}`, {
            path: '/',
            httpOnly: true,
          });
          setLogin(true);
        },
        onError: (e) => {
          console.log(e);
        },
      }).mutate({
        authCode: code,
      });
      router.push('/');
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
