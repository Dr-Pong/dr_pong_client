import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import Link from 'next/link';

import React from 'react';

import { userState } from 'recoils/user';

import useAuthHandler from 'hooks/useAuthHandler';

import BasicButton from 'components/global/buttons/BasicButton';
import BgmField from 'components/settings/BgmField';
import LocaleField from 'components/settings/LocaleField';
import SoundEffectField from 'components/settings/SoundEffectField';
import TfaField from 'components/settings/TfaField';

import styles from 'styles/settings/Settings.module.scss';

export default function Settings() {
  const { t } = useTranslation('common');
  const { onLogout, onAuthFailure } = useAuthHandler();
  const { roleType } = useRecoilValue(userState);
  const handleLogout = () => {
    onLogout();
  };

  const handleLoginClick = () => {
    onAuthFailure();
  };

  const settingFieldsForCommon = [
    {
      topic: t('Language'),
      field: <LocaleField />,
    },
    {
      topic: t('BGM'),
      field: <BgmField />,
    },
    {
      topic: t('Sound Effect'),
      field: <SoundEffectField />,
    },
  ];

  const settingFieldsForGuest = [
    {
      topic: t('Login'),
      field: (
        <BasicButton
          style='basic'
          color='purple'
          handleButtonClick={handleLoginClick}
        >
          {t('login')}
        </BasicButton>
      ),
    },
  ];

  const settingFieldsForMember = [
    {
      topic: t('2fa'),
      field: <TfaField />,
    },
    {
      topic: t('Logout'),
      field: (
        <BasicButton
          style='basic'
          color='purple'
          handleButtonClick={handleLogout}
        >
          {t('logout')}
        </BasicButton>
      ),
    },
  ];

  const settingFields = settingFieldsForCommon.concat(
    roleType === 'guest' ? settingFieldsForGuest : settingFieldsForMember
  );

  return (
    <div className={styles.settingsContainer}>
      <ul>
        {settingFields.map(({ topic, field }, i) => {
          return (
            <li key={i}>
              <div className={styles.listTopic}>{topic}</div>
              {field}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
