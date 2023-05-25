import { useState, ChangeEvent, useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import { openModalState } from 'recoils/modal';

import useCustomQuery from 'hooks/useCustomQuery';

import CreateChannelType from 'components/channels/CreateChannelType';
import CreateChannelTitle from 'components/channels/CreateChannelTitle';
import CreateChannelPassword from 'components/channels/CreateChannelPassword';
import CreateChannelCapacity from 'components/channels/CreateChannelCapacity';

import { NewChannel } from 'types/channelTypes';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/CreateChannel.module.scss';

export default function CreateChannel() {
  const setOpenModal = useSetRecoilState(openModalState);
  const [newChannel, setNewChannel] = useState<NewChannel>({
    type: 'public',
    title: '',
    password: null,
    capacity: 10,
  });
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost('/channels');

  const handleTypeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewChannel(prevChannel => ({
      ...prevChannel,
      type: value,
      password: value === 'private' ? null : prevChannel.password,
    }));
  }, [newChannel]);

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 16) {
      setNewChannel(prevChannel => ({
        ...prevChannel,
        title: value,
      }));
    }
  }, [newChannel]);

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]+$/;
    if (value.length === 0 || (value.length <= 8 && regex.test(value))) {
      setNewChannel(prevChannel => ({
        ...prevChannel,
        password: value,
      }));
    }
  }, [newChannel]);

  const handleCapacityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewChannel(prevChannel => ({
      ...prevChannel,
      capacity: Number(event.target.value),
    }));
  }, [newChannel]);

  const handleCreateChannel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newChannel.title) {
      mutate({ newChannel });
      setOpenModal(false);
    }
  };

  const formSections = [
    {
      label: 'Type',
      input: (
        <CreateChannelType
          type={newChannel.type}
          handleTypeChange={handleTypeChange}
        />
      ),
    },
    {
      label: 'Title',
      input: (
        <CreateChannelTitle
          title={newChannel.title}
          handleTitleChange={handleTitleChange}
        />
      ),
    },
    {
      label: 'Password',
      input: (
        <CreateChannelPassword
          password={newChannel.password}
          type={newChannel.type}
          handlePasswordChange={handlePasswordChange}
        />
      ),
    },
    {
      label: 'Capacity',
      input: (
        <CreateChannelCapacity
          capacity={newChannel.capacity}
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
