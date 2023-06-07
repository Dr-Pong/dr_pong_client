import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';

import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import { LayoutProps } from 'pages/_app';

export default function LoginFilter({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(['user_key'], '/users/me', setUser);
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;
  if (user.roleType === 'noname' && router.asPath !== '/signUp')
    router.push('/signUp');
  if (user.tfaRequired && router.asPath !== '/authentication')
    router.push('/authentication');
  return <>{children}</>;
}
