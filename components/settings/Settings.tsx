import useTranslation from 'next-translate/useTranslation';

import useAuthHandler from 'hooks/useAuthHandler';

import BasicButton from 'components/global/buttons/BasicButton';
import LocaleField from 'components/settings/LocaleField';
import TfaField from 'components/settings/TfaField';

import styles from 'styles/settings/Settings.module.scss';

export default function Settings() {
  const { t } = useTranslation('common');
  const { onLogout } = useAuthHandler();

  const handleLogout = () => {
    onLogout();
  };

  const settingFields = [
    {
      topic: t('Language'),
      field: <LocaleField />,
    },
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
