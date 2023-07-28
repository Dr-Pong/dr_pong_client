import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, useState } from 'react';

import GameInvitationButton from 'components/game/GameInvitationButton';

import { ButtonDesign } from 'types/buttonTypes';

import styles from 'styles/game/GameInvitationSelectMode.module.scss';

const button: ButtonDesign = {
  style: 'long',
  color: 'pink',
};

export default function GameInvitableSelectMode(
  { target }: { target: string }) {
  const { t } = useTranslation('common');
  const modeList = ['classic', 'randomBounce'];
  const [gameMode, setGameMode] = useState<string>('classic');

  const handleModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGameMode(value);
  };

  return (
    <div className={styles.contents}>
      <div className={styles.modeList}>
        {modeList.map((mode, i) => {
          return (
            <label key={i} className={styles.radio} htmlFor={mode}>
              <input
                type='radio'
                id={mode}
                name='mode'
                value={mode}
                checked={gameMode === mode}
                onChange={handleModeChange}
              />
              {t(mode)}
            </label>
          );
        })}
      </div>
      <GameInvitationButton
        nickname={target}
        mode={gameMode}
        buttonDesign={button}
      >
        {t('invite')}
      </GameInvitationButton>
    </div>
  );
}