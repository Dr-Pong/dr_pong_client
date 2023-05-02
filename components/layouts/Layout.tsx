import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';

import SignUp from 'pages/signUp';

import NavigationBar from 'components/layouts/NavigationBar';
import Modal from 'components/modals/Modal';

import styles from 'styles/layouts/Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const { mutationGet } = useCustomQuery();
  const { isFetching, isLoading, error, data } = mutationGet(
    ['user_key'],
    '/users/me',
    setUser
  );

  if (isLoading) return null;

  if (user.roleType === 'noname') return <SignUp />;

  return (
    <div id='layoutRoot'>
      <Modal />
      <div className={styles.layoutContainer}>
        <div className={styles.pageContainer}>{children}</div>
        {!router.asPath.includes('login') &&
          !router.asPath.includes('signUp') && <NavigationBar />}
      </div>
    </div>
  );
}
