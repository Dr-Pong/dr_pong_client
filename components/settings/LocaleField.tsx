import { useRouter } from 'next/router';

import styles from 'styles/settings/LocaleField.module.scss';

export default function LocaleField() {
  const router = useRouter();
  const { locale, defaultLocale, pathname, query } = router;
  const currentLocale = locale || defaultLocale || 'en';

  const localeOptions = [
    { id: 'en', value: 'English' },
    { id: 'ko', value: '한국어' },
  ];

  const handleLocaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({ pathname, query }, pathname, {
      locale: e.target.id || defaultLocale,
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
