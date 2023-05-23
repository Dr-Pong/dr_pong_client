import useTranslation from 'next-translate/useTranslation';

import useAuthHandler from 'hooks/useAuthHandler';

import BasicButton from 'components/global/buttons/BasicButton';
import LocaleField from 'components/settings/LocaleField';
import TfaField from 'components/settings/TfaField';

import styles from 'styles/settings/Settings.module.scss';

export default function Settings() {
  const { t } = useTranslation('common');
  const { onLogout } = useAuthHandler();

  const settingFields = [
    {
      topic: t('Language'),
      field: <LocaleField />,
    },
    {
      topic: t('2nd Authentication'),
      field: <TfaField />,
    },
  ];

  const handleLogout = () => {
    onLogout();
  };

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
      <div className={styles.buttons}>
        <BasicButton
          style='basic'
          color='black'
          handleButtonClick={handleLogout}
        >
          {t('logout')}
        </BasicButton>
      </div>
    </div>
  );
}
