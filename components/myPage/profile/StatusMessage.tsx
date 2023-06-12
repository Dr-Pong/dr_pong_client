import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState } from 'recoils/user';

import { DetailDto, ProfileStyle } from 'types/userTypes';

import styles from 'styles/myPage/StatusMessage.module.scss';

type StatusMessageProps = {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
  style: ProfileStyle;
};

export default function StatusMessage({
  detailDto,
  setDetailDto,
  style,
}: StatusMessageProps) {
  const editable = useRecoilValue(editableState);

  const statusMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailDto({ ...detailDto, statusMessage: event.target.value });
  };

  return (
    <div className={`${styles.statusMessageContainer} ${styles[style]}`}>
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
