import { useRecoilState } from 'recoil';

import React from 'react';
import { TbMusic, TbMusicOff } from 'react-icons/tb';

import { bgmState } from 'recoils/sound';

import { useBgm } from 'hooks/useBgm';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/SettingField.module.scss';

export default function BgmField() {
  const [bgmOn, setBgmOn] = useRecoilState(bgmState);
  const { bgms, loaded } = useBgm({
    bgm: '/sound/bgm.mp3',
  });
  const enableBgm = () => {
    bgms.get('bgm')();
    setBgmOn(true);
  };

  const disableBgm = () => {
    bgms.get('bgm_stop')();
    setBgmOn(false);
  };

  if (!loaded) return null;
  return (
    <div className={styles.fieldContainer}>
      <BasicButton
        style='basic'
        color='purple'
        handleButtonClick={bgmOn ? disableBgm : enableBgm}
      >
        {bgmOn ? <TbMusicOff /> : <TbMusic />}
      </BasicButton>
    </div>
  );
}
