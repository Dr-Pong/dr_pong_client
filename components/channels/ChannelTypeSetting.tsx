import { useState, ChangeEvent } from 'react';

import { useSetRecoilState } from 'recoil';
import { openModalState } from 'recoils/modal';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelTypeSetting.module.scss';

type ChannelType = {
  password: string | null;
  access: string;
};

export default function ChannelTypeSetting({ roomId }: { roomId: string }) {
  const setOpenModal = useSetRecoilState(openModalState);
  const { mutationPatch } = useCustomQuery();
  const { mutate } = mutationPatch(`/channels/${roomId}`);
  const [type, setType] = useState<ChannelType>({
    password: null,
    access: 'public',
  });

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setType(prev => ({
      ...prev,
      access: value,
      password: value === 'public' ? null : prev.password,
    }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]+$/;
    if (value.length === 0 || (value.length <= 8 && regex.test(value)))
      setType(prev => ({
        ...prev,
        password: value,
      }));
  };

  const handleSettingSave = () => {
    if (type.access === 'protected' && (type.password === null || type.password === ''))
      return null;
    mutate(
      { type },
      {
        onSuccess: () => {
          setOpenModal(false);
        },
      }
    );
  };

  return (
    <form className={styles.modal} onSubmit={handleSettingSave}>
      <div className={styles.label}>
        <label>Type</label>
        <div className={styles.input}>
          <input
            type='radio'
            id='public'
            value='public'
            checked={type.access === 'public'}
            onChange={handleTypeChange}
          />
          <label htmlFor='public'>public</label>
        </div>
        <div className={styles.input}>
          <input
            type='radio'
            id='protected'
            value='protected'
            checked={type.access === 'protected'}
            onChange={handleTypeChange}
          />
          <label htmlFor='protected'>protected</label>
        </div>
      </div>
      <div className={styles.label}>
        <label>Password</label>
        <div className={styles.input}>
          <input
            className={styles.text}
            type='text'
            value={type.password ? type.password : ''}
            onChange={handlePasswordChange}
            placeholder='Password'
            disabled={type.access === 'public'}
          />
        </div>
      </div>
      <div className={styles.button}>
        <BasicButton style='basic' color='black' handleButtonClick={handleSettingSave}>
          Save
        </BasicButton>
      </div>
    </form>
  );
}
