import { useRecoilState, useRecoilValue } from 'recoil';

import React, { useEffect, useRef } from 'react';
import { IoMdMore } from 'react-icons/io';

import { dropdownUserState, dropdownVisibilitySelector } from 'recoils/friends';

import Dropdown from 'components/global/Dropdown';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendDropdown.module.scss';
import buttonStyles from 'styles/global/Button.module.scss';

export default function FriendDropdown({ nickname }: { nickname: string }) {
  const isDropdownVisibleFor = useRecoilValue(dropdownVisibilitySelector);
  const [dropdownUser, setDropdownUser] = useRecoilState(dropdownUserState);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setDropdownUser('');
    }
  };

  useEffect(() => {
    if (isDropdownVisibleFor(nickname)) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownVisibleFor(nickname)]);
  const profile = () => {};
  const spectate = () => {};
  const breakup = () => {};
  const block = () => {};

  const buttons: { content: string; handler: () => void }[] = [
    { content: 'profile', handler: profile },
    { content: 'spectate', handler: spectate },
    { content: 'delete', handler: breakup },
    { content: 'block', handler: block },
  ];

  const kebabClickHandler = () => {
    if (dropdownUser === nickname) {
      setDropdownUser('');
    } else {
      setDropdownUser(nickname);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        ref={buttonRef}
        className={`${buttonStyles.button} ${buttonStyles['round']} ${buttonStyles['opaque']}`}
        onClick={kebabClickHandler}
      >
        <IoMdMore />
      </button>
      <Dropdown style={'friend'} visibility={isDropdownVisibleFor(nickname)}>
        <ul ref={dropdownRef}>
          {buttons.map(({ content, handler }) => (
            <li key={content}>
              <BasicButton
                style={'thin'}
                color={'white'}
                handleButtonClick={handler}
              >
                {content}
              </BasicButton>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}
