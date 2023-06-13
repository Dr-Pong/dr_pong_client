import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';
import { userState } from 'recoils/user';
import { loginState } from 'recoils/login';

import useCustomQuery from 'hooks/useCustomQuery';

import { LayoutProps } from 'pages/_app';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

export default function LoginFilter({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(['user_key'], '/users/me', setUser);
  const router = useRouter();
  const setLoginState = useSetRecoilState(loginState);

  if (user.roleType === 'member')
    setLoginState(true);
  else setLoginState(false);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;
  if (user.roleType !== 'noname' && router.asPath === '/signUp')
    router.push('/');
  if (user.roleType === 'noname' && router.asPath !== '/signUp')
    router.push('/signUp');
  if (user.tfaRequired && router.asPath !== '/authentication')
    router.push('/authentication');
  return <>{children}</>;
}
