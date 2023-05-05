import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';

import Modal from 'components/modals/Modal';

import styles from 'styles/layouts/Layout.module.scss';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(['user_key'], '/users/me', setUser);
  const router = useRouter();

  if (isLoading) return null;
  if (user.roleType === 'noname') router.push('/signUp');

  return (
    <div id='layoutRoot'>
      <Modal />
      <div className={styles.layoutContainer}>
        <div className={styles.pageContainer}>{children}</div>
      </div>
    </div>
  );
}
