import React from 'react';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendButtons.module.scss';

export default function FriendButtons({
  tab,
  nickname,
}: {
  tab: string;
  nickname: string;
}) {
  const goDM = () => {};

  const dropDown = () => {};

  const accept = () => {};

  const reject = () => {};

  const unblock = () => {};

  const buttons: {
    [key: string]: { content: string | JSX.Element; handler: () => void }[];
  } = {
    friend: [
      { content: 'DM', handler: goDM },
      { content: 'Kebab', handler: dropDown },
    ],
    request: [
      { content: 'Accept', handler: accept },
      { content: 'Reject', handler: reject },
    ],
    block: [{ content: 'Unblock', handler: unblock }],
  };
  return (
    <div className={styles.buttons}>
      {buttons[tab].map(({ content: c, handler: h }) => (
        <BasicButton color={'black'} style={'basic'} handleButtonClick={h}>
          {c}
        </BasicButton>
      ))}
    </div>
  );
}
