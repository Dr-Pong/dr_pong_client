import useTranslation from 'next-translate/useTranslation';

import React, { useState } from 'react';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/game/PrepareRoom.module.scss';

interface Options {
  [key: string]: boolean;
}

export default function GameLobby() {
  const { t } = useTranslation('game');
  const [options, setOptions] = useState<Options>({
    bullet: false,
    deathMatch: false,
    loserPaysForBeer: false,
  });
  const optionList = ['bullet', 'deathMatch', 'loserPaysForBeer'];

  const handleQueueClick = () => {
    //요청 보내고
    //응답 올때까지
    //Waiting 띄워주기
    console.log(options);
  };

  const handleInviteClick = () => {
    console.log(options);
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
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
}) {
  const { t } = useTranslation('game');

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
