import { Dispatch, SetStateAction } from 'react';

import ChannelBox from './ChannelBox';
import Pagination from './Pagination';
import { AllChannels } from 'types/channelTypes';

export default function ChannelsList({
  channel,
  page,
  setPage
}: {
  channel: AllChannels | undefined,
  page: number,
  setPage: Dispatch<SetStateAction<number>>
}) {
  return (
    <>
      <ChannelBox channel={channel} />
      <Pagination
        total={channel?.totalPage}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
