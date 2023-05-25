import { ChangeEvent } from 'react';

import styles from 'styles/channels/CreateChannelForm.module.scss';

export function TypeSection({
  type,
  handleTypeChange
}: {
  type: string,
  handleTypeChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <label className={styles.radio} htmlFor='public'>
        <input
          type='radio'
          id='public'
          name='type'
          value='public'
          checked={type === 'public'}
          onChange={handleTypeChange}
        />
        public
      </label>
      <label className={styles.radio} htmlFor='private'>
        <input
          type='radio'
          id='private'
          name='type'
          value='private'
          checked={type === 'private'}
          onChange={handleTypeChange}
        />
        private
      </label>
    </>
  )
}

export function TitleSection({
  title,
  titleCheck,
  handleTitleChange
}: {
  title: string,
  titleCheck: boolean,
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className={styles.input}>
      <input
        className={styles.text}
        type='text'
        value={title}
        onChange={handleTitleChange}
        placeholder={'Channel title'}
      />
      <div className={styles.info}>* 16글자 이내 {titleCheck && '* Title 필수임'}</div>
    </div>
  );
}

export function PasswordSection({
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

export function CapacitySection({
  capacity,
  handleCapacityChange
}: {
  capacity: number,
  handleCapacityChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <label className={styles.radio} htmlFor='10'>
        <input
          type='radio'
          id='10'
          value='10'
          checked={capacity === 10}
          onChange={handleCapacityChange}
        />
        10
      </label>
      <label className={styles.radio} htmlFor='30'>
        <input
          type='radio'
          id='30'
          value='30'
          checked={capacity === 30}
          onChange={handleCapacityChange}
        />
        30
      </label>
      <label className={styles.radio} htmlFor='50'>
        <input
          type='radio'
          id='50'
          value='50'
          checked={capacity === 50}
          onChange={handleCapacityChange}
        />
        50
      </label>
    </>
  );
}