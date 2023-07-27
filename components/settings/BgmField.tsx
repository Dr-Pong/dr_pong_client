import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React from 'react';
import { TbMusic, TbMusicOff } from 'react-icons/tb';

import { bgmState } from 'recoils/sound';

import { useBgm } from 'hooks/useBgm';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/SettingField.module.scss';

export default function BgmField() {
  const { t } = useTranslation('common');
  const [bgmOn, setBgmOn] = useRecoilState(bgmState);
  const { bgms, loaded } = useBgm();
  const enableBgm = () => {
    setBgmOn(true);
    bgms.get('bgm')?.(true);
  };

  const disableBgm = () => {
    bgms.get('bgm_stop')?.();
    setBgmOn(false);
  };

  const contents = {
    enable: (
      <div className={styles.buttonContent}>
        {t('on')} <TbMusic />
      </div>
    ),
    disable: (
      <div className={styles.buttonContent}>
        {t('off')} <TbMusicOff />
      </div>
    ),
  };

  if (!loaded) return null;
  return (
    <div className={styles.fieldContainer}>
      <BasicButton
        style='basic'
        color='purple'
        handleButtonClick={bgmOn ? disableBgm : enableBgm}
      >
        <div className={styles.buttonContent}>
          {bgmOn ? contents.disable : contents.enable}
        </div>
      </BasicButton>
    </div>
  );
}
