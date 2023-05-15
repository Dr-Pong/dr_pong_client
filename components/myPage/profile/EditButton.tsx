import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React, { useEffect } from 'react';

import { editableState } from 'recoils/user';

import styles from 'styles/myPage/EditButton.module.scss';

export default function EditButton() {
  const { t } = useTranslation('myPage');
  const [editable, setEditable] = useRecoilState(editableState);
  useEffect(() => {
    return () => {
      setEditable(false);
    };
  }, []);
  const handleEditButtonClick = () => {
    setEditable(!editable);
  };
  return (
    <div className={styles.editButton} onClick={handleEditButtonClick}>
      {editable ? t('save') : t('edit')}
    </div>
  );
}
