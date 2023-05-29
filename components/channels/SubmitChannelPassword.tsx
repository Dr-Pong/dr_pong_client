import { useState, ChangeEvent } from 'react';

import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';
import { openModalState } from 'recoils/modal';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/SubmitChannelPassword.module.scss';

export default function SubmitChannelPassword({ roomId }: { roomId: string }) {
  const router = useRouter();
  const setOpenModal = useSetRecoilState(openModalState);
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost(`channels/${roomId}/participants`);
  const [password, setPassword] = useState<string>('');
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]+$/;
    if (value.length === 0 || (value.length <= 8 && regex.test(value)))
      setPassword(value);
  };

  const handleSubmit = () => {
    mutate(
      { password },
      {
        onSuccess: () => {
          router.push(`/chats/channel/${roomId}`);
          setOpenModal(false);
        },
        onError: () => {
          // 비번 불일치
        },
      }
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.input}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.text}
          type='text'
          value={password}
          onChange={handlePasswordChange}
          placeholder='Password'
        />
      </div>
      <div className={styles.button}>
        <BasicButton style='basic' color='black' handleButtonClick={handleSubmit}>
          Submit
        </BasicButton>
      </div>
    </div>
  );
}
