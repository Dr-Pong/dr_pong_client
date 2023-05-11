import React, { Dispatch, SetStateAction, useRef } from 'react';

import styles from 'styles/authentication/NumberInputBox.module.scss';

export default function NumberInputBox({
  setCode,
  boxNumber,
}: {
  setCode: Dispatch<SetStateAction<string>>;
  boxNumber: number;
}) {
  const boxes: number[] = Array.from({ length: boxNumber }, (_, i) => i);
  const inputRef = useRef<any>([]);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    const currentIdx = parseInt(e.target.id);

    if (currentValue && currentIdx < boxNumber - 1) {
      inputRef.current[currentIdx + 1].focus();
    }
    setCode(boxes.toString());
  };

  return (
    <div className={styles.numberInputBoxContainer}>
      {boxes.map((idx: number) => {
        return (
          <span key={idx} className={styles.inputBoxWrap}>
            <input
              type='number'
              min='0'
              max='9' // TODO: 현재 작동 안해서 고쳐야함
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
