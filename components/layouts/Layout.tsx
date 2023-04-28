import { useRecoilState } from 'recoil';

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
  const [user, setUser] = useRecoilState(userState);
  const { mutationGet } = useCustomQuery();
  const { isFetching, isLoading, error, data } = mutationGet(
    'user_key',
    '/users/me',
    setUser
  );

  if (user.roleType === 'noname') return <SignUp />;
  return (
    <div id='layoutRoot'>
      <Modal />
      <div className={styles.layoutContainer}>
        <div className={styles.pageContainer}>{children}</div>
        <NavigationBar />
      </div>
    </div>
  );
}
