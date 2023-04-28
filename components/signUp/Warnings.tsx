import useTranslation from 'next-translate/useTranslation';

import styles from 'styles/signUp/SignUp.module.scss';

type WarningsProps = {
  wrongFields: string[];
};

export default function Warnings({ wrongFields }: WarningsProps) {
  const { t } = useTranslation('signUp');
  const warnings: { [key: string]: string } = {
    nickname: t('wrong name'),
    imgId: t('wrong image'),
  };

  return (
    <div className={styles.warnings}>
      {wrongFields.map((field) => {
        return <div>{warnings[field]}</div>;
      })}
    </div>
  );
}
