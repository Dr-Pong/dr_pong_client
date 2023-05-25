import { useState, ChangeEvent, useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import { openModalState } from 'recoils/modal';

import useCustomQuery from 'hooks/useCustomQuery';

import { TypeSection, TitleSection, PasswordSection, CapacitySection } from 'components/channels/CreateChannelForm';

import { NewChannel } from 'types/channelTypes';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/CreateChannel.module.scss';

export default function CreateChannel() {
  const setOpenModal = useSetRecoilState(openModalState);
  const [type, setType] = useState<string>('public');
  const [title, setTitle] = useState<string>('');
  const [titleCheck, setTitleCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number>(10);
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost('/channels');

  const handleTypeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setType(value);
    if (value === 'private')
      setPassword(null);
  }, [type]);

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 16)
      setTitle(value);
  }, [title]);

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]+$/;
    if (value.length === 0)
      setPassword(null);
    else if (value.length <= 8 && regex.test(value))
      setPassword(value);
  }, [password]);


  const handleCapacityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  }, [capacity]);

  const handleCreateChannel = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const channelData: NewChannel = {
      type: type,
      title: title,
      password: password,
      capacity: capacity
    };
    if (!title)
      setTitleCheck(true);
    else {
      mutate({ channelData });
      setOpenModal(false);
    }
  }, [type, title, password, capacity]);

  const formSections = [
    {
      label: 'Type',
      input: (
        <TypeSection
          type={type}
          handleTypeChange={handleTypeChange}
        />
      ),
    },
    {
      label: 'Title',
      input: (
        <TitleSection
          title={title}
          titleCheck={titleCheck}
          handleTitleChange={handleTitleChange}
        />
      ),
    },
    {
      label: 'Password',
      input: (
        <PasswordSection
          password={password}
          type={type}
          handlePasswordChange={handlePasswordChange}
        />
      ),
    },
    {
      label: 'Capacity',
      input: (
        <CapacitySection
          capacity={capacity}
          handleCapacityChange={handleCapacityChange}
        />
      ),
    },
  ];

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleCreateChannel}>
        {formSections.map(({ label, input }, i) => (
          <label key={i} className={styles.label}>
            {label}
            {input}
          </label>
        ))}
        <div className={styles.button}>
          <BasicButton style='basic' color='black' handleButtonClick={handleCreateChannel}>
            Create
          </BasicButton>
        </div>
      </form>
    </div>
  );
};
