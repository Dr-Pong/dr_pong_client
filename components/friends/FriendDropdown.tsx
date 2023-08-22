import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import React, { useEffect, useRef } from 'react';
import { IoMdMore } from 'react-icons/io';

import { dropdownUserState, showDropdownSelector } from 'recoils/friends';

import { ButtonDesign } from 'types/buttonTypes';

import useModalProvider from 'hooks/useModalProvider';

import RelationButton from 'components/friends/RelationButton';
import Dropdown from 'components/global/Dropdown';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendDropdown.module.scss';
import buttonStyles from 'styles/global/Button.module.scss';

const button: ButtonDesign = {
  style: 'dropdown',
  color: 'white',
};

export default function FriendDropdown({ nickname }: { nickname: string }) {
  const { t } = useTranslation('friends');
  const showDropdownFor = useRecoilValue(showDropdownSelector);
  const setDropdownUser = useSetRecoilState(dropdownUserState);
  const { useProfileModal } = useModalProvider();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOuterClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setDropdownUser('');
    }
  };

  useEffect(() => {
    if (showDropdownFor(nickname)) {
      document.addEventListener('click', handleOuterClick);
    } else {
      document.removeEventListener('click', handleOuterClick);
    }
    return () => {
      document.removeEventListener('click', handleOuterClick);
    };
  }, [showDropdownFor(nickname)]);

  const kebabClickHandler = () => {
    if (showDropdownFor(nickname)) {
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
      {showDropdownFor(nickname) && (
        <Dropdown style={'friend'}>
          <ul
            ref={dropdownRef}
            onClick={() => {
              setDropdownUser('');
            }}
          >
            <li>
              <BasicButton
                style={'dropdown'}
                color={'white'}
                handleButtonClick={() => {
                  useProfileModal(nickname);
                  setDropdownUser('');
                }}
              >
                {t('profile')}
              </BasicButton>
            </li>
            <li>
              <RelationButton
                button={button}
                type='friendDelete'
                target={nickname}
              >
                {t('delete')}
              </RelationButton>
            </li>
            <li>
              <RelationButton button={button} type='block' target={nickname}>
                {t('block')}
              </RelationButton>
            </li>
          </ul>
        </Dropdown>
      )}
    </div>
  );
}
