import useTranslation from 'next-translate/useTranslation';

import { FcGoogle } from 'react-icons/fc';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/login/LoginButtons.module.scss';

export default function LoginButtons() {
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
      link: '/login/google?code=1234',
    },
  ];
  return (
    <div className={styles.loginButtons}>
      {oauths.map(({ name, logo, value, link }) => {
        return (
          <BasicButton key={name} style='big' color='white'>
            <a href={link}>
              <span className={styles.logo}>{logo}</span>
              <span className={styles.string}>{value}</span>
            </a>
          </BasicButton>
        );
      })}
    </div>
  );
}
