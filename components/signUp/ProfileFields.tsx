import useTranslation from 'next-translate/useTranslation';

import styles from 'styles/signUp/SignUp.module.scss';

import UserImage from './UserImage';

export default function ProfileFields() {
  const { t } = useTranslation('signUp');
  const profiles = [
    {
      name: 'userImage',
      label: t('Profile picture'),
      input: <UserImage key='userUmage' />,
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
    <div className={styles.profileFields}>
      {profiles.map(({ name, label, input }, i) => {
        return (
          <div key={i} className={styles.field}>
            <label htmlFor={name}>{label}</label>
            {input}
          </div>
        );
      })}
    </div>
  );
}
