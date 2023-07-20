import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/signUp/Warnings.module.scss';

type WarningsProps = {
  wrongFields: string[];
};

export default function Warnings({ wrongFields }: WarningsProps) {
  const { t } = useTranslation('signUp');
  const warnings: { [key: string]: string } = {
    nickname: t('wrong nickname'),
    imgId: t('wrong image'),
  };

  return (
    <div className={styles.warnings}>
      {wrongFields.map((field, i) => {
        return <div key={i}>{warnings[field]}</div>;
      })}
    </div>
  );
}
