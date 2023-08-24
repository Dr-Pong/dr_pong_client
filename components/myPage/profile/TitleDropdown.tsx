import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Title } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import Dropdown from 'components/global/Dropdown';
import ErrorRefresher from 'components/global/ErrorRefresher';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/myPage/ProfileCard.module.scss';

type TitleDropdownProps = {
  nickname: string;
  title: Title | null;
  setTitle: Dispatch<SetStateAction<Title | null>>;
};

export default function TitleDropdown({
  nickname,
  title,
  setTitle,
}: TitleDropdownProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { titlesGet } = useMyPageQuery(nickname);
  const { isLoading, isError, data } = titlesGet();

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  if (isLoading)
    return (
      <div className={styles.titleDropdownContainer}>
        <button
          ref={buttonRef}
          className={styles.dropdownButton}
          onClick={handleDropdownClick}
        >
          {title?.title || '-----'}
          <IoMdArrowDropdown className={styles.arrow} />
        </button>
      </div>
    );
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.titleDropdownContainer}>
      <button
        ref={buttonRef}
        className={styles.dropdownButton}
        onClick={handleDropdownClick}
      >
        {title?.title || '-----'}
        <IoMdArrowDropdown className={styles.arrow} />
      </button>
      {showDropdown && (
        <Dropdown style={'title'}>
          <ul ref={dropdownRef}>
            {data.titles.map(({ id, title }: Title) => (
              <li key={id}>
                <BasicButton
                  style='dropdown'
                  color='white'
                  handleButtonClick={() => {
                    setTitle({ id, title });
                    setShowDropdown(false);
                  }}
                >
                  {title}
                </BasicButton>
              </li>
            ))}
          </ul>
        </Dropdown>
      )}
    </div>
  );
}
