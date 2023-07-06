import useTranslation from 'next-translate/useTranslation';

import { FcGoogle } from 'react-icons/fc';

import styles from 'styles/login/OauthButtons.module.scss';

export default function OauthButtons() {
  const { t } = useTranslation('login');
  const oauths = [
    {
      name: '42Intra',
      logo: (
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg'
          alt='logo'
        />
      ),
      value: t('Login with 42Intra'),
      link: 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-9178ebee1b15304ba011ca8b7e3b17306c8c6b8c5e6d2bf5bfda8c6c57b5a24b&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2F42&response_type=code',
    },
    {
      name: 'Google',
      logo: <FcGoogle />,
      value: t('Login with Google'),
      link: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=565279220221-q1b3fggetohm67q9bs49q0k4hm3iqlg1.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Fgoogle&response_type=code&include_granted_scopes=true&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20',
    },
  ];
  return (
    <div className={styles.oauthButtonsContainer}>
      {oauths.map(({ name, logo, value, link }) => {
        return (
          // <BasicButton key={name} style='big' color='purple'>
          <a key={name} href={link} className={styles.oauthButton}>
            <span className={styles.logo}>{logo}</span>
            <span className={styles.string}>{value}</span>
          </a>
          // </BasicButton>
        );
      })}
    </div>
  );
}
