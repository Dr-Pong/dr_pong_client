import React, { useEffect, useState } from 'react';

import styles from 'styles/myPage/Dropdown.module.scss';

export interface DropdownProps {
  visibility: boolean;
  children: React.ReactNode;
}

const Dropdown = (props: DropdownProps) => {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  useEffect(() => {
    if (props.visibility) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
    }
  }, [props.visibility]);
  return (
    <article
      className={`${styles.dropdown} ${
        props.visibility ? styles.fadeIn : styles.fadeOut
      }`}
    >
      {visibilityAnimation && props.children}
    </article>
  );
};

export default Dropdown;
