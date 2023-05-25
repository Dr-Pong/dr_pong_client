import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import React, { useEffect, useRef } from 'react';
import { IoMdMore } from 'react-icons/io';

import { dropdownUserState, dropdownVisibilitySelector } from 'recoils/friends';

import { ButtonDesign } from 'types/buttonTypes';

import useRelationButtons from 'hooks/useRelationButtons';

import Dropdown from 'components/global/Dropdown';

import styles from 'styles/friends/FriendDropdown.module.scss';
import buttonStyles from 'styles/global/Button.module.scss';

const buttonDesign: ButtonDesign = {
  style: 'thin',
  color: 'white',
};

export default function FriendDropdown({ nickname }: { nickname: string }) {
  const { t } = useTranslation('common');
  const isDropdownVisibleFor = useRecoilValue(dropdownVisibilitySelector);
  const setDropdownUser = useSetRecoilState(dropdownUserState);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openProfile, spectate, deleteFriend, blockUser } = useRelationButtons(
    buttonDesign,
    nickname
  );

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

  const buttons: { content: string; button: JSX.Element }[] = [
    { content: 'profile', button: openProfile(t('profile')) },
    { content: 'spectate', button: spectate(t('spectate')) },
    { content: 'delete', button: deleteFriend(t('delete')) },
    { content: 'block', button: blockUser(t('block')) },
  ];

  const kebabClickHandler = () => {
    if (isDropdownVisibleFor(nickname)) {
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
          {buttons.map(({ content, button }) => (
            <li key={content}>{button}</li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}
