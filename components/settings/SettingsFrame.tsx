import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import RadioButtons from 'components/global/RadioButtons';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/Settings.module.scss';

export default function SettingsFrame() {
  const { t } = useTranslation('settings');
  const router = useRouter();
  const { locale, defaultLocale, pathname } = router;
  const currentLocale = locale || defaultLocale || 'en';

  const localeOptions = [
    { id: 'en', value: 'English' },
    { id: 'ko', value: '한국어' },
  ];
  const authOptions = [
    { id: 'enable', value: t('enable') },
    { id: 'disable', value: t('disable') },
  ];

  const changeLocale = (lang: string | undefined) => {
    router.push(pathname, pathname, { locale: lang || defaultLocale });
  };

  const changeSecondAuth = () => {
    // patch
  };

  const saveSettings = () => {
    changeLocale(
      document.querySelector('input[type=radio][name=locale]:checked')?.id
    );
    changeSecondAuth();
  };

  return (
    <div className={styles.settingListContainer}>
      <ul>
        <li>
          <div className={styles.listTopic}>{t('Language')}</div>
          <RadioButtons
            name='locale'
            options={localeOptions}
            currentId={currentLocale}
          />
        </li>
        <li>
          <div className={styles.listTopic}>{t('2nd Authentication')}</div>
          <RadioButtons
            name='secondAuth'
            options={authOptions}
            currentId='enable'
          />
        </li>
      </ul>
      <div className={styles.saveButton}>
        <BasicButton
          style='basic'
          color='black'
          value='저장'
          handleButtonClick={saveSettings}
        />
      </div>
    </div>
  );
}
