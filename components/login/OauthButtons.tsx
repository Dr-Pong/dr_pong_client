import useTranslation from 'next-translate/useTranslation';

import React from 'react';
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
      link: `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_FT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FT_REDIRECT_URI}&response_type=code`,
    },
    {
      name: 'Google',
      logo: <FcGoogle />,
      value: t('Login with Google'),
      link: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GG_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GG_REDIRECT_URI}&response_type=code&include_granted_scopes=true&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20`,
    },
  ];
  return (
    <div className={styles.oauthButtonsContainer}>
      {oauths.map(({ name, logo, value, link }) => {
        return (
          <a key={name} href={link} className={styles.oauthButton}>
            <span className={styles.logo}>{logo}</span>
            <span className={styles.string}>{value}</span>
          </a>
        );
      })}
    </div>
  );
}
