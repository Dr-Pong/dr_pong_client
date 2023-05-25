import { ChangeEvent } from 'react';

import styles from 'styles/channels/CreateChannel.module.scss';

export default function PasswordSection({
  password,
  type,
  handlePasswordChange
}: {
  password: string | null,
  type: string,
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className={styles.input}>
      <input
        className={styles.text}
        type='text'
        value={password ? password : ''}
        onChange={handlePasswordChange}
        placeholder={'Channel password'}
        disabled={type === 'private'}
      />
      <div className={styles.info}>* 4~8자의 영문 / 숫자로 해라</div>
    </div>
  );
}
