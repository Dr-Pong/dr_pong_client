import SignUpFrame from 'components/signUp/SignUpFrame';

import styles from 'styles/signUp/SignUp.module.scss';

export default function SignUp() {
  return (
    <div className={styles.signUpPageContainer}>
      <SignUpFrame />
    </div>
  );
}
