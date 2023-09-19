import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import ModalTitle from 'components/modals/modalParts/ModalTitle';

import styles from 'styles/leaderboard/SeasonGuide.module.scss';

export default function SeasonGuide() {
  const { t } = useTranslation('season');

  return (
    <div className={styles.seasonGuideContainer}>
      <ModalTitle title={t('season')} />
      <div className={styles.contents}>
        <div className={styles.text}>{t('season_description')}</div>
      </div>
    </div>
  );
}
