import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState } from 'recoils/myPage';

import { DetailDto } from 'components/myPage/ProfileCard';

import styles from 'styles/myPage/ProfileStatusMessage.module.scss';

export default function ProfileStatusMessage({
  detailDto,
  setDetailDto,
}: {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
}) {
  const statusMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailDto({ ...detailDto, statusMessage: event.target.value });
  };
  const editable = useRecoilValue(editableState);
  return (
    <div className={styles.statusMessage}>
      {editable ? (
        <input
          className={styles.content}
          type='text'
          value={detailDto.statusMessage}
          onChange={statusMessageHandler}
        />
      ) : (
        <div className={styles.content}>{detailDto.statusMessage}</div>
      )}
    </div>
  );
}
