import { useRecoilValue } from 'recoil';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { editableState } from 'recoils/user';

import { Title } from 'types/userTypes';
import { DetailDto } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import Dropdown from 'components/global/Dropdown';
import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/myPage/ProfileCard.module.scss';

type TitleDropdownProps = {
  nickname: string;
  detailDto: DetailDto;
  setDetailDto: Dispatch<SetStateAction<DetailDto>>;
};

export default function TitleDropdown({
  nickname,
  detailDto,
  setDetailDto,
}: TitleDropdownProps) {
  const editable = useRecoilValue(editableState);
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  const { titlesGet } = useMyPageQuery(nickname);
  const { isLoading, isError, data } = titlesGet();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;
  const titles = data.titles as Title[];

  const handleDropdownClick = () => {
    setDropdownVisibility(!dropdownVisibility);
  };

  return (
    <div className={styles.titleDropdownContainer}>
      {editable && (
        <IoMdArrowDropdown
          className={styles.dropdownArrow}
          onClick={handleDropdownClick}
        />
      )}
      <Dropdown style={'title'} visibility={editable && dropdownVisibility}>
        <ul>
          {titles.map(({ id, title }) => (
            <li
              key={id}
              onClick={() => {
                setDetailDto({ ...detailDto, title: { id, title } });
                setDropdownVisibility(false);
              }}
            >
              {title}
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}

export const empty: Title = {
  id: 0,
  title: '-----',
};
