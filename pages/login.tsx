import { useRouter } from 'next/router';

import LoginFrame from 'components/login/LoginFrame';

import styles from 'styles/login/Login.module.scss';

export default function Login() {
  const router = useRouter();
  const presentPath = router.asPath;
  const code = presentPath.split('?code=')[1];

  if (code) {
    // post
    // access-token 저장
    return null;
  }

  return (
    <div className={styles.loginPageContainer}>
      <LoginFrame />
    </div>
  );
}
