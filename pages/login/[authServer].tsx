import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useLayoutEffect } from 'react';
import { useCookies } from 'react-cookie';

import { loginState } from 'recoils/login';

import useCustomQuery from 'hooks/useCustomQuery';

export default function Login() {
  const setLogin = useSetRecoilState(loginState);
  const router = useRouter();
  const { code, authServer } = router.query;
  const { mutationPost } = useCustomQuery();
  const [cookies, setCookie] = useCookies(['Authorization']);

  useLayoutEffect(() => {
    if (code) {
      setLogin(true);
      mutationPost.mutate(
        {
          path: `/auth/${authServer}`,
          body: {
            authCode: code,
          },
        },
        {
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
        }
      );
      router.push('/');
    }
  }, []);

  return <></>;
}
