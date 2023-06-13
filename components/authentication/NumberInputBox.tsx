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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = validateInput(e.target.value);
  };

  const handleFocusJump = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentIdx = parseInt(e.target.id);
    if (e.target.value && currentIdx < boxNumber - 1) {
      inputRef.current[currentIdx + 1].focus();
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    handleFocusJump(e);
  };
  const handleFocusOnLast = (target: HTMLInputElement) => {
    const temp = target.value;
    target.value = '';
    target.value = temp;
  };
  const handleClickFocus = (e: React.MouseEvent<HTMLInputElement>) => {
    handleFocusOnLast(e.target as HTMLInputElement);
  };
  const handleArrowKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.target as HTMLInputElement;
    let idx = parseInt(current.id);
    if (e.key === 'ArrowLeft' && idx > 0) {
      idx -= 1;
    }
    if (e.key === 'ArrowRight' && idx < boxNumber - 1) {
      idx += 1;
    }
    const targetInputBox = inputRef.current[idx];
    targetInputBox.focus();
    handleFocusOnLast(targetInputBox);
  };

  return (
    <div className={styles.numberInputBoxContainer}>
      {boxes.map((idx: number) => {
        return (
          <input
            key={idx}
            type='text'
            id={`${idx}`}
            className={styles.inputBox}
            ref={(el) => (inputRef.current[idx] = el)}
            onChange={handleOnChange}
            onClick={handleClickFocus}
            onKeyDown={handleArrowKey}
          />
        );
      })}
    </div>
  );
}

const validateInput = (value: string): string => {
  const regex = /^[0-9\b -]$/;
  if (!regex.test(value)) {
    value = value.slice(-1);
  }
  if (!regex.test(value)) {
    return '';
  }
  return value;
};
