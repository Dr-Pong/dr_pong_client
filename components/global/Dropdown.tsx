import React, { useEffect, useState } from 'react';

import styles from 'styles/global/Dropdown.module.scss';

const Dropdown = ({
  style,
  visibility,
  children,
}: {
  style: string;
  visibility: boolean;
  children: React.ReactNode;
}) => {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  useEffect(() => {
    if (visibility) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 150);
    }
  }, [visibility]);
  return (
    <article
      className={`${styles[style]} ${
        visibility ? styles.fadeIn : styles.fadeOut
      }`}
    >
      {visibilityAnimation && children}
    </article>
  );
};

export default Dropdown;
