import useTranslation from 'next-translate/useTranslation';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import Dropdown from 'components/global/Dropdown';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelSortDropdown.module.scss';

type ChannelSortDropdownProps = {
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
};

export default function ChannelSortDropdown({
  order,
  setOrder,
}: ChannelSortDropdownProps) {
  const { t } = useTranslation('channels');
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const buttons: { content: string; handleButtonClick: () => void }[] = [
    {
      content: t('recent'),
      handleButtonClick: () => {
        setOrder('recent');
        setShowDropdown(false);
      },
    },
    {
      content: t('popular'),
      handleButtonClick: () => {
        setOrder('popular');
        setShowDropdown(false);
      },
    },
  ];

  const handleSortClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        ref={buttonRef}
        className={styles.dropdownButton}
        onClick={handleSortClick}
      >
        {t(order)}
        <IoMdArrowDropdown />
      </button>
      <Dropdown style={'channel'} visibility={showDropdown}>
        <ul ref={dropdownRef}>
          {buttons.map(({ content, handleButtonClick }) => (
            <li key={content}>
              <BasicButton
                style={'dropdown'}
                color={'white'}
                handleButtonClick={handleButtonClick}
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
