import { useRouter } from 'next/router';

import React from 'react';
import { useCookies } from 'react-cookie';

import styles from 'styles/settings/LocaleField.module.scss';

export default function LocaleField() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const { locale, defaultLocale, pathname, query } = router;
  const currentLocale = locale || defaultLocale || 'en';

  const localeOptions = [
    { id: 'en', value: 'English' },
    { id: 'ko', value: '한국어' },
  ];

  const handleLocaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({ pathname, query }, undefined, {
      locale: e.target.id || defaultLocale,
    });
    setCookie('NEXT_LOCALE', e.target.id || defaultLocale, {
      path: '/',
    });
  };

  return (
    <div className={styles.localeFieldContainer}>
      {localeOptions.map(({ id, value }, i) => {
        return (
          <label key={i} className={styles.radioButton}>
            <input
              type='radio'
              name='locale'
              id={id}
              defaultChecked={id === currentLocale}
              onChange={handleLocaleChange}
            />
            {value}
          </label>
        );
      })}
    </div>
  );
}
