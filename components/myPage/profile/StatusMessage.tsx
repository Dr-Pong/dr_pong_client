import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { editableState } from 'recoils/user';

import { ProfileStyle } from 'types/userTypes';

import styles from 'styles/myPage/StatusMessage.module.scss';

type StatusMessageProps = {
  statusMessage: string;
  setStatusMessage: Dispatch<SetStateAction<string>>;
  style: ProfileStyle;
};

export default function StatusMessage({
  statusMessage,
  setStatusMessage,
  style,
}: StatusMessageProps) {
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);

  const statusMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 60) setStatusMessage(value);
  };

  return (
    <div className={`${styles.statusMessageContainer} ${styles[style]}`}>
      <div className={styles.title}>{t('status message')}</div>
      {editable ? (
        <div className={styles.messageInput}>
          <textarea
            value={statusMessage}
            onChange={statusMessageHandler}
            maxLength={60}
          />
          <span
            className={styles.inputCount}
          >{`${statusMessage.length}/60`}</span>
        </div>
      ) : (
        <div className={`${styles.message} ${styles[style]}`}>
          {statusMessage}
        </div>
      )}
    </div>
  );
}
