import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';

import { LayoutProps } from 'pages/_app';

export default function LoginFilter({ children }: LayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(['user_key'], '/users/me', setUser);
  const router = useRouter();

  if (isLoading) return null;
  if (user.roleType === 'noname' && router.asPath !== '/signUp')
    router.push('/signUp');
  if (user.tfaRequired && router.asPath !== '/authentication')
    router.push('/authentication');
  return <>{children}</>;
}
