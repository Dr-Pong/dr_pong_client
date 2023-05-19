import React, { useEffect, useRef, Dispatch, SetStateAction, useState } from 'react';
import Dropdown from 'components/global/Dropdown';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelDropdown.module.scss';
import buttonStyles from 'styles/global/Button.module.scss';

export default function ChannelDropdown({
  order,
  setOrder
}: {
  order: string,
  setOrder: Dispatch<SetStateAction<string>>
}) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownVisible]);

  const recent = () => {
    setOrder('recent');
    setDropdownVisible(false);
  };

  const popular = () => {
    setOrder('popular');
    setDropdownVisible(false);
  };

  const buttons: { content: string; handler: () => void }[] = [
    { content: 'recent', handler: recent },
    { content: 'popular', handler: popular },
  ];

  const kebabClickHandler = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        ref={buttonRef}
        className={`${buttonStyles.button} ${buttonStyles['basic']} ${buttonStyles['opaque']}`}
        onClick={kebabClickHandler}
      >
        {order}
      </button>
      <Dropdown style={'channel'} visibility={dropdownVisible}>
        <ul ref={dropdownRef}>
          {buttons.map(({ content, handler }) => (
            <li key={content}>
              <BasicButton
                style={'thin'}
                color={'black'}
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
