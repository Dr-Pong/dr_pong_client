import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { editableState } from 'recoils/user';

import { Title } from 'types/userTypes';
import { DetailDto } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import Dropdown from 'components/global/Dropdown';

import styles from 'styles/myPage/ProfileCard.module.scss';

type TitleDropdownProps = {
  nickname: string;
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
};

export default function TitleDropdown({
  nickname,
  detailDto,
  setDetailDto,
}: TitleDropdownProps) {
  const editable = useRecoilValue(editableState);
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  const { getTitles } = useMyPageQuery(nickname);
  const { isLoading, isError, data } = getTitles();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
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
