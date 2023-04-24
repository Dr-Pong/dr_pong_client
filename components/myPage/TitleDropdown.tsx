import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useQuery } from 'react-query';

import { editableState } from 'recoils/myPage';

import { Title } from 'types/myPageTypes';

import instance from 'utils/axios';

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
  const editable = useRecoilValue(editableState);
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  const handleDropdownClick = () => {
    setDropdownVisibility(!dropdownVisibility);
  };
  const fetchTitles = async (): Promise<Title[]> => {
    const res = await instance.get(`/users/${userName}/titles`);
    console.log(unshiftEmptyTitle(res.data));
    return unshiftEmptyTitle(res.data);
  };

  const unshiftEmptyTitle = (titles: Title[]): Title[] => {
    return [empty, ...titles];
  };

  const {
    isLoading,
    isError,
    data: userTitles,
  } = useQuery('userTitles', fetchTitles);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const titles = userTitles as Title[];
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

const empty: Title = {
  id: 0,
  title: 'ㅤ',
};
