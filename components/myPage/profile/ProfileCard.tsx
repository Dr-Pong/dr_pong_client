import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { Dispatch, SetStateAction } from 'react';

import { editableState } from 'recoils/user';

import { DetailDto, ProfileStyle } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import TitleDropdown from 'components/myPage/profile/TitleDropdown';

import styles from 'styles/myPage/ProfileCard.module.scss';

type CardContentsType = {
  label: string;
  content: string;
  child?: React.ReactNode;
};

type ProfildCardProps = {
  nickname: string;
  detailDto: DetailDto;
  setDetailDto: Dispatch<SetStateAction<DetailDto>>;
  style: ProfileStyle;
};

export default function ProfileCard({
  nickname,
  detailDto,
  setDetailDto,
  style,
}: ProfildCardProps) {
  const { t } = useTranslation('myPage');
  const { profileGet } = useMyPageQuery(nickname);
  const editable = useRecoilValue(editableState);
  const { isLoading, isError, data } = profileGet(setDetailDto);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  const { level } = data;
  const cardContents: CardContentsType[] = [
    {
      label: 'Name',
      content: nickname,
    },
    {
      label: 'Level',
      content: level.toString(),
    },
    {
      label: 'Title',
      content: detailDto.title?.title ?? '',
      child: (
        <TitleDropdown
          nickname={nickname}
          detailDto={detailDto}
          setDetailDto={setDetailDto}
        />
      ),
    },
  ];

  return (
    <div className={`${styles.profileCardContainer} ${styles[style]}`}>
      {cardContents.map(
        ({ label, content, child }: CardContentsType, i: number) => {
          return (
            <div key={i} className={styles.profileField}>
              <div className={styles.fieldLabel}>{t(label)}</div>
              <div
                className={`${styles.fieldContent} ${
                  editable && styles[label]
                }`}
              >
                {content}
                {child}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
