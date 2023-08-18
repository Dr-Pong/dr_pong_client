import useTranslation from 'next-translate/useTranslation';
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
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);

  const statusMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 60)
      setDetailDto({ ...detailDto, statusMessage: value });
  };

  return (
    <div className={`${styles.statusMessageContainer} ${styles[style]}`}>
      <div className={styles.title}>{t('status message')}</div>
      {editable ? (
        <div className={styles.messageInput}>
          <input
            type='text'
            value={detailDto.statusMessage}
            onChange={statusMessageHandler}
          />
          <span
            className={styles.inputCount}
          >{`${detailDto.statusMessage.length}/60`}</span>
        </div>
      ) : (
        <div className={`${styles.message} ${styles[style]}`}>
          {detailDto.statusMessage}
        </div>
      )}
    </div>
  );
}
