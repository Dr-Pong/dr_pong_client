import React from 'react';

import { EditableStatus } from 'components/myPage/MyPageFrame';

import styles from 'styles/myPage/EditableContent.module.scss';

export default function EditableContent({
  content,
  editableStatus,
}: {
  content: string;
  editableStatus: EditableStatus;
}) {
  return (
    <div className={styles.editableContent}>
      {editableStatus == EditableStatus.PLAIN && (
        <div className={styles.content}>{content}</div>
      )}
      {editableStatus == EditableStatus.EDIT && (
        <input className={styles.content} type='text' value={content} />
      )}
      {editableStatus == EditableStatus.DROPDOWN && (
        <div className={styles.dropDown}></div>
      )}
    </div>
  );
}
