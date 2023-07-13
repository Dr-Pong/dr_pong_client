import useTranslation from 'next-translate/useTranslation';

import React, { useState } from 'react';

import PettiPagenation from 'components/global/PettiPagenation';

type Manual = {
  image?: string;
  alt?: string;
  text?: string;
};
export default function GameGuide() {
  const { t } = useTranslation('guide');
  const [page, setPage] = useState(1);
  const manual: Manual[] = [
    {
      text: 'hi',
    },
    {
      text: 'bye',
    },
  ];
  const current = manual[page - 1];
  return (
    <div>
      <div>
        {current.image && <img src={current.image} alt={current.alt} />}
        <div>{current.text}</div>
      </div>
      <PettiPagenation total={manual.length} page={page} setPage={setPage} />
    </div>
  );
}
