import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/toasts/AchievementToast.module.scss';

export default function AchievementToast({
  achievement,
}: {
  achievement: {
    imgUrl: string;
    name: string;
  };
}) {
  const { t } = useTranslation('achievement');
  const { imgUrl, name } = achievement;

  return (
    <div className={styles.achievementToastContainer}>
      <img className={styles.achievementToastImg} src={imgUrl} alt={name} />
      <div className={styles.achievementToastMessage}>
        {` ${t(name)} ${t('achieved')}!`}
      </div>
    </div>
  );
}
