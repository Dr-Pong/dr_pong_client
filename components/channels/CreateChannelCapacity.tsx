import { ChangeEvent } from 'react';

import styles from 'styles/channels/CreateChannel.module.scss';

export default function CreateChannelCapacity({
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
