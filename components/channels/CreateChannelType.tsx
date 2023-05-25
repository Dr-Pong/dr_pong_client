import { ChangeEvent } from 'react';

import styles from 'styles/channels/CreateChannel.module.scss';

export default function CreateChannelType({
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
