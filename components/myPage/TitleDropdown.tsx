import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { editableState } from 'recoils/user';

import { Title } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import Dropdown from 'components/global/Dropdown';
import { DetailDto } from 'components/myPage/ProfileCard';

export default function TitleDropdown({
  detailDto,
  setDetailDto,
  userName,
}: {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
  userName: string;
}) {
  const { getTitles } = useMyPageQuery(userName);
  const editable = useRecoilValue(editableState);
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  const handleDropdownClick = () => {
    setDropdownVisibility(!dropdownVisibility);
  };
  const { isLoading, isError, data } = getTitles();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const titles = data.titles as Title[];
  return (
    <div>
      {editable && (
        <div onClick={handleDropdownClick}>
          <IoIosArrowDown />
        </div>
      )}
      <Dropdown visibility={editable && dropdownVisibility}>
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
  title: 'ㅤ',
};
