import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { Achievement } from 'types/userTypes';

import styles from 'styles/myPage/AchievementModalPart.module.scss';

export default function AchievementModalPart({
  achievement,
}: {
  achievement: Achievement;
}) {
  const { name, imgUrl, content } = achievement;
  const { t } = useTranslation('achievement');
  return (
    <div className={styles.achievementDetail}>
      <img className={styles.achievementImage} src={imgUrl} alt={name} />
      <div className={styles.achievementText}>{t(content)}</div>
    </div>
  );
}
