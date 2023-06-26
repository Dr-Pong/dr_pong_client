import { useRouter } from 'next/router';

import useTranslation from 'next-translate/useTranslation';

import React, { ReactElement, useState } from 'react';

import GameLobby from 'components/game/GameLobby';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const router = useRouter();
  const { t } = useTranslation('game');
  const [normalClicked, setNormalClicked] = useState(false);

  const handleLadderClick = () => {
    //요청 보내고
    //응답 올때까지
    //Waiting 띄워주기
    router.push(`/game/ladder/1`);
  };

  const handleNormalClick = () => {
    setNormalClicked(true);
  };

  const buttons = [
    <button
      key={'ladder'}
      className={`${styles.button} ${styles.ladder}`}
      onClick={handleLadderClick}
    >
      {t('ladder')}
    </button>,
    <button
      key={'normal'}
      className={`${styles.button} ${styles.normal}`}
      onClick={handleNormalClick}
    >
      {t('normal')}
    </button>,
  ];

  return (
    <div className={styles.gamePageContainer}>
      {normalClicked ? (
        <GameLobby />
      ) : (
        <div className={styles.buttonList}>
          {buttons.map((button) => button)}
        </div>
      )}
    </div>
  );
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
