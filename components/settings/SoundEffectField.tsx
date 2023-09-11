import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { soundEffectState } from 'recoils/sound';

import { useSoundEffect } from 'hooks/useSoundEffect';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/Settings.module.scss';

export default function SoundEffectField() {
  const { t } = useTranslation('common');
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

  const contents = {
    enable: (
      <div className={styles.buttonContent}>
        {t('on')} <HiSpeakerWave />
      </div>
    ),
    disable: (
      <div className={styles.buttonContent}>
        {t('off')} <HiSpeakerXMark />
      </div>
    ),
  };

  return loaded ? (
    <BasicButton
      style='basic'
      color='purple'
      handleButtonClick={soundEffectOn ? disableSoundEffect : enableSoundEffect}
    >
      {soundEffectOn ? contents.disable : contents.enable}
    </BasicButton>
  ) : (
    <BasicButton style='basic' color='purple'>
      {}
    </BasicButton>
  );
}
