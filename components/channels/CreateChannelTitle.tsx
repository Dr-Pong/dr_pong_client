import { ChangeEvent } from 'react';

import styles from 'styles/channels/CreateChannel.module.scss';

export default function CreateChannelTitle({
  title,
  handleTitleChange
}: {
  title: string,
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
      <div className={styles.info}>* 16글자 이내</div>
    </div>
  );
}
