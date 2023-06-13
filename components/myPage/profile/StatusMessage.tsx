import { useRecoilValue } from 'recoil';

import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { editableState } from 'recoils/user';

import { DetailDto, ProfileStyle } from 'types/userTypes';

import styles from 'styles/myPage/StatusMessage.module.scss';

type StatusMessageProps = {
  detailDto: DetailDto;
  setDetailDto: Dispatch<SetStateAction<DetailDto>>;
  style: ProfileStyle;
};

export default function StatusMessage({
  detailDto,
  setDetailDto,
  style,
}: StatusMessageProps) {
  const editable = useRecoilValue(editableState);

  const statusMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailDto({ ...detailDto, statusMessage: e.target.value });
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
