import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import UserImages from 'components/global/UserImages';

import styles from 'styles/signUp/SignUp.module.scss';

export default function SignUpFields() {
  const { t } = useTranslation('signUp');
  const fields = [
    {
      name: 'userImage',
      label: t('Profile picture'),
      input: <UserImages />,
    },
    {
      name: 'nickname',
      label: t('Nickname'),
      input: (
        <input type='text' name='nickname' className={styles.nicknameInput} />
      ),
    },
  ];

  return (
    <div className={styles.signUpFields}>
      {fields.map(({ name, label, input }, i) => {
        return (
          <div key={i} className={styles.signUpField}>
            <label htmlFor={name}>{label}</label>
            {input}
          </div>
        );
      })}
    </div>
  );
}
