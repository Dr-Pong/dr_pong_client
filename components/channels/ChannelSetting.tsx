import { Dispatch, SetStateAction } from 'react';

import ChannelDropdown from 'components/channels/ChannelDropdown';

import { useQueryClient } from 'react-query';

import styles from 'styles/channels/ChannelSetting.module.scss';
import { IoIosAdd } from 'react-icons/io';
import { IoIosRefresh } from 'react-icons/io';

import BasicButton from 'components/global/buttons/BasicButton';

export default function ChannelSetting({
  order,
  setOrder
}: {
  order: string,
  setOrder: Dispatch<SetStateAction<string>>
}) {
  const queryClient = useQueryClient();
  const onClickRefreshChannel = () => {
    queryClient.invalidateQueries({ queryKey: ['channel_key'] });
  }
  const onClickCreateChannel = () => {
    // 변경된 useMutation 적용 예정
    // 모달 띄우고 title, password, maxCount 설정
    // mutaion.('/channels', {title: string, password: null | string, maxCount: number});
  }

  return (
    <div className={styles.channelSetting}>
      <ChannelDropdown
        order={order}
        setOrder={setOrder}
      />
      <BasicButton
        style={'short'}
        color={'opaque'}
        handleButtonClick={onClickRefreshChannel}
      >
        <IoIosRefresh />
      </BasicButton>
      <BasicButton
        style={'short'}
        color={'opaque'}
        handleButtonClick={onClickCreateChannel}
      >
        <IoIosAdd />
      </BasicButton>
    </div>
  );
}
