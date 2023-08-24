import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { editableState } from 'recoils/user';

import { ProfileStyle, Title } from 'types/userTypes';

import TitleDropdown from 'components/myPage/profile/TitleDropdown';

import styles from 'styles/myPage/ProfileCard.module.scss';

type CardContentsType = {
  label: string;
  content: string | ReactNode;
};

type ProfildCardProps = {
  nickname: string;
  level: number;
  title: Title | null;
  setTitle: Dispatch<SetStateAction<Title | null>>;
  style: ProfileStyle;
};

export default function ProfileCard({
  nickname,
  level,
  title,
  setTitle,
  style,
}: ProfildCardProps): JSX.Element {
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);
  const cardContents: CardContentsType[] = [
    {
      label: 'Name',
      content: nickname,
    },
    {
      label: 'Level',
      content: level,
    },
    {
      label: 'Title',
      content: editable ? (
        <TitleDropdown nickname={nickname} title={title} setTitle={setTitle} />
      ) : (
        title?.title || '-----'
      ),
    },
  ];

  return (
    <div className={`${styles.profileCardContainer} ${styles[style]}`}>
      {cardContents.map(({ label, content }: CardContentsType, i: number) => {
        return (
          <div key={i} className={styles.profileField}>
            <div className={styles.fieldLabel}>{t(label)}</div>
            <div className={styles.fieldContent}>{content}</div>
          </div>
        );
      })}
    </div>
  );
}
