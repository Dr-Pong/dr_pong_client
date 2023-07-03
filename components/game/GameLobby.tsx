import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { alertTypeState, openAlertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/game/GameLobby.module.scss';

interface Options {
  [key: string]: boolean;
}

export default function GameLobby() {
  const { t } = useTranslation('game');
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
  const { useGameInvitationModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const { mutationPost, mutationDelete } = useCustomQuery();
  const exitQueue = mutationDelete(`/games/queue`, {
    onSuccess: () => {
      closeUpperModal();
    },
    onError: () => {
      setAlertType('fail');
      setOpenAlert(true);
    },
  });
  const enterQueue = mutationPost(`/games/queue/normal`, {
    onSuccess: () => {
      useMatchWaitingUpperModal(exitQueue.mutate);
    },
    onError: () => {
      setAlertType('fail');
      setOpenAlert(true);
    },
  });

  const [options, setOptions] = useState<Options>({
    bullet: false,
    deathMatch: false,
    loserPaysForBeer: false,
  });
  const optionList = ['bullet', 'deathMatch', 'loserPaysForBeer'];

  const handleQueueClick = () => {
    enterQueue.mutate({
      mode: 'mode'
    });
  };

  const handleInviteClick = () => {
    useGameInvitationModal('mode');
  };

  return (
    <div className={styles.prepareRoomContainer}>
      <PageHeader title={t('prepare')} />
      <div className={styles.contents}>
        <div className={styles.optionList}>
          {optionList.map((option) => {
            return (
              <Option
                key={option}
                option={option}
                options={options}
                setOptions={setOptions}
              />
            );
          })}
        </div>
        <div className={styles.buttonList}>
          <button
            className={`${styles.button} ${styles.queue}`}
            onClick={handleQueueClick}
          >
            {t('queue')}
          </button>
          <button
            className={`${styles.button} ${styles.invite}`}
            onClick={handleInviteClick}
          >
            {t('invite')}
          </button>
        </div>
      </div>
    </div>
  );
}

function Option({
  option,
  options,
  setOptions,
}: {
  option: string;
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
}) {
  const { t } = useTranslation('game');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptions((prev) => {
      return { ...prev, [name]: value === 'true' };
    });
  };

  return (
    <div key={option} className={styles.option}>
      {t(option)}
      <div className={styles.radios}>
        <label className={'radio'}>
          <input
            type='radio'
            id={option + 'true'}
            name={option}
            value={'true'}
            defaultChecked={options[option] === true}
            onChange={handleRadioChange}
          />
          {t('on')}
        </label>
        <label className={'radio'}>
          <input
            type='radio'
            id={option + 'false'}
            name={option}
            value={'false'}
            defaultChecked={options[option] === false}
            onChange={handleRadioChange}
          />
          {t('off')}
        </label>
      </div>
    </div>
  );
}
