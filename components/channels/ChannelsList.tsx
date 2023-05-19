import { Dispatch, SetStateAction } from 'react';

import ChannelBox from 'components/channels/ChannelBox';
import Pagination from 'components/channels/Pagination';
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
