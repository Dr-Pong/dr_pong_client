import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HowToUse() {
  const { t, i18n } = useTranslation(['page']);
  const changeLanguageToKo = () => i18n.changeLanguage('ko');
  const changeLanguageToEn = () => i18n.changeLanguage('en');

  return (
    <div>
      <button onClick={changeLanguageToKo}>Korean</button>
      <button onClick={changeLanguageToEn}>English</button>
      <h1>{t('Usage')}</h1>
    </div>
  );
}
