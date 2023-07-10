import { useRecoilState } from 'recoil';

import React from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { soundEffectState } from 'recoils/sound';

import { useSoundEffect } from 'hooks/useSoundEffect';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/TfaField.module.scss';

export default function SoundEffect() {
  const [soundEffectOn, setSoundEffectOn] = useRecoilState(soundEffectState);
  const { audios, loaded } = useSoundEffect({
    cork: 'sound/cork.mp3',
  });
  const enableBgm = () => {
    localStorage.setItem('soundEffectOn', 'true');
    setSoundEffectOn(true);
    if (loaded) audios.get('cork')(true);
  };

  const disableBgm = () => {
    localStorage.removeItem('soundEffectOn');
    setSoundEffectOn(false);
  };

  if (!loaded) return null;

  return (
    <div className={styles.tfaFieldContainer}>
      <BasicButton
        style='basic'
        color='purple'
        handleButtonClick={soundEffectOn ? disableBgm : enableBgm}
      >
        {soundEffectOn ? <HiSpeakerXMark /> : <HiSpeakerWave />}
      </BasicButton>
    </div>
  );
}
