import $ from 'jquery';
import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import PageHeader from 'components/global/PageHeader';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/pages/settings.module.scss';

export default function settings() {
  const { t } = useTranslation('settings');
  const locales = [
    { locale: 'en', value: 'English' },
    { locale: 'ko', value: '한국어' },
  ];
  const router = useRouter();
  const { locale, defaultLocale, pathname } = router;
  const currentLocale = locale || defaultLocale;

  const changeLocale = (lang: string | undefined) => {
    router.push(pathname, pathname, { locale: lang || defaultLocale });
  };

  const saveSettings = () => {
    changeLocale($('input:radio[name=locale]:checked').val()?.toString());
  };

  return (
    <div className={styles.settingsPageContainer}>
      <PageHeader title={t('Settings')} button={null} />
      <div>{t('Language')}</div>
      {locales.map(({ locale, value }) => {
        return (
          <span>
            <input
              type='radio'
              name='locale'
              id={locale}
              value={locale}
              defaultChecked={currentLocale === locale}
            />
            <label htmlFor={locale}>{value}</label>
          </span>
        );
      })}
      <BasicButton
        style='basic'
        color='black'
        value='저장'
        handleButtonClick={saveSettings}
      />
    </div>
  );
}
