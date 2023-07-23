import { useRecoilState } from 'recoil';

import React from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { soundEffectState } from 'recoils/sound';

import { useSoundEffect } from 'hooks/useSoundEffect';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/SettingField.module.scss';

export default function SoundEffectField() {
  const [soundEffectOn, setSoundEffectOn] = useRecoilState(soundEffectState);
  const { effects, loaded } = useSoundEffect();
  const enableSoundEffect = () => {
    localStorage.setItem('soundEffectOn', 'true');
    setSoundEffectOn(true);
    if (loaded) effects.get('cork')?.(true);
  };

  const disableSoundEffect = () => {
    localStorage.removeItem('soundEffectOn');
    setSoundEffectOn(false);
  };

  if (!loaded) return null;

  return (
    <div className={styles.fieldContainer}>
      <BasicButton
        style='basic'
        color='purple'
        handleButtonClick={
          soundEffectOn ? disableSoundEffect : enableSoundEffect
        }
      >
        {soundEffectOn ? <HiSpeakerXMark /> : <HiSpeakerWave />}
      </BasicButton>
    </div>
  );
}
