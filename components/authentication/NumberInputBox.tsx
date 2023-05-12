import React, { MutableRefObject } from 'react';

import styles from 'styles/authentication/NumberInputBox.module.scss';

export default function NumberInputBox({
  inputRef,
  boxNumber,
}: {
  inputRef: MutableRefObject<any>;
  boxNumber: number;
}) {
  const boxes: number[] = Array.from({ length: boxNumber }, (_, i) => i);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    const currentIdx = parseInt(e.target.id);
    const regex = /^[0-9\b -]$/;
    if (!regex.test(e.target.value)) {
      e.target.value = e.target.value.slice(-1);
    }
    if (currentValue && currentIdx < boxNumber - 1) {
      inputRef.current[currentIdx + 1].focus();
    }
  };

  return (
    <div className={styles.numberInputBoxContainer}>
      {boxes.map((idx: number) => {
        return (
          <span key={idx} className={styles.inputBoxWrap}>
            <input
              type='text'
              id={`${idx}`}
              className={styles.inputBox}
              ref={(el) => (inputRef.current[idx] = el)}
              onChange={handleFocus}
            />
          </span>
        );
      })}
    </div>
  );
}
