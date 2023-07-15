import useTranslation from 'next-translate/useTranslation';

import React, { useState } from 'react';

import PetitPagination from 'components/global/PetitPagination';
import ModalTitle from 'components/modals/modalParts/ModalTitle';

import styles from 'styles/game/GameGuide.module.scss';

type Manual = {
  title: string;
  image?: string;
  alt?: string;
  text?: string;
};

export const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export default function GameGuide() {
  const { t } = useTranslation('guide');
  const [page, setPage] = useState(1);
  const manual: Manual[] = [
    {
      title: t('control'),
      text: isTouchScreen
        ? t('control_description_mobile')
        : t('control_description_pc'),
    },
    {
      title: t('spin'),
      text: t('spin_description'),
    },
    {
      title: t('ladder'),
      text: t('ladder_description'),
    },
    {
      title: t('normal'),
      text: t('normal_description'),
    },
    {
      title: t('result'),
      text: t('result_description'),
    },
  ];

  const current = manual[page - 1];

  return (
    <div>
      <ModalTitle title={current.title} />
      <div className={styles.contents}>
        {current.image && (
          <img className={styles.image} src={current.image} alt={current.alt} />
        )}
        <div className={styles.text}>{current.text}</div>
      </div>
      <PetitPagination total={manual.length} page={page} setPage={setPage} />
    </div>
  );
}
