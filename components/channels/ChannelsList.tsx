import { Dispatch, SetStateAction } from 'react';

import ChannelBox from 'components/channels/ChannelBox';
import Pagination from 'components/channels/Pagination';
import { AllChannels, EachChannel } from 'types/channelTypes';

import styles from 'styles/channels/ChannelsList.module.scss';

export default function ChannelsList({
  channels,
  page,
  setPage
}: {
  channels: AllChannels | undefined,
  page: number,
  setPage: Dispatch<SetStateAction<number>>
}) {
  return (
    <>
      <div className={styles.channelList}>
        {channels?.channel.map((eachChannel: EachChannel) => {
          return (
            <ChannelBox channel={eachChannel} />
          );
        })}
      </div>
      <Pagination
        total={channels?.totalPage}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
