import useTranslation from 'next-translate/useTranslation';

import React, { Dispatch, SetStateAction } from 'react';

import { DetailDto } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import TitleDropdown from 'components/myPage/profile/TitleDropdown';
import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

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
};

export default function ProfileCard({
  nickname,
  detailDto,
  setDetailDto,
}: ProfildCardProps) {
  const { t } = useTranslation('myPage');
  const { profileGet } = useMyPageQuery(nickname);
  const { isLoading, isError, data } = profileGet(setDetailDto);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  const { level } = data;
  const cardContents: CardContentsType[] = [
    {
      label: t('Title'),
      content: detailDto.title?.title ?? '',
      child: (
        <TitleDropdown
          nickname={nickname}
          detailDto={detailDto}
          setDetailDto={setDetailDto}
        />
      ),
    },
    {
      label: t('Level'),
      content: level.toString(),
    },
    {
      label: t('Name'),
      content: nickname,
    },
  ];

  return (
    <div className={styles.profileCardContainer}>
      {cardContents.map(
        ({ label, content, child }: CardContentsType, i: number) => {
          return (
            <div key={i} className={styles.profileField}>
              <div className={styles.fieldLabel}>{label}</div>
              <div className={styles.fieldContent}>
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
