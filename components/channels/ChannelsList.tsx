import { Dispatch, SetStateAction } from 'react';

import ChannelBoxes from 'components/channels/ChannelBoxes';
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
      <ChannelBoxes channel={channel} />
      <Pagination
        total={channel?.totalPage}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
