import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState } from 'recoils/user';

import { DetailDto } from 'types/userTypes';

import styles from 'styles/myPage/StatusMessage.module.scss';

type StatusMessageProps = {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
};

export default function StatusMessage({
  detailDto,
  setDetailDto,
}: StatusMessageProps) {
  const editable = useRecoilValue(editableState);

  const statusMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailDto({ ...detailDto, statusMessage: event.target.value });
  };

  return (
    <div className={styles.statusMessageContainer}>
      {editable ? (
        <input
          className={styles.messageInput}
          type='text'
          value={detailDto.statusMessage}
          onChange={statusMessageHandler}
        />
      ) : (
        <div className={styles.message}>{detailDto.statusMessage}</div>
      )}
    </div>
  );
}
