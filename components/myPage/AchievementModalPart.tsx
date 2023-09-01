import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { Achievement } from 'types/userTypes';

import styles from 'styles/myPage/AchievementModalPart.module.scss';

type AchievementModalPartProps = {
  achievement: Achievement;
};

export default function AchievementModalPart({
  achievement,
}: AchievementModalPartProps) {
  const { name, imgUrl, content } = achievement;
  const { t } = useTranslation('achievement');

  return (
    <div className={styles.achievementDetail}>
      <img className={styles.image} src={imgUrl} alt={name} />
      <div className={styles.content}>
        <div className={styles.achievementName}>{`<${t(name)}>`}</div>
        <div className={styles.achievementText}>{t(content)}</div>
      </div>
    </div>
  );
}
