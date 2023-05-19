import { Dispatch, SetStateAction } from 'react';

import DropdownSelect from 'components/global/DropdownSelect';

import styles from 'styles/channels/ChannelSetting.module.scss';
import { IoIosAdd } from 'react-icons/io';
import { IoIosRefresh } from 'react-icons/io';

import BasicButton from 'components/global/buttons/BasicButton';

export default function ChannelSetting({
  setOrder
}: {
  setOrder: Dispatch<SetStateAction<string>>
}) {
  const orders: string[] = ['recent', 'popular'];

  return (
    <div className={styles.channelSetting}>
      <DropdownSelect
        label='Order'
        options={orders}
        setState={setOrder}
      />
      <BasicButton
        style={'short'}
        color={'opaque'}
        handleButtonClick={() => { }}
      >
        <IoIosRefresh />
      </BasicButton>
      <BasicButton
        style={'short'}
        color={'opaque'}
        handleButtonClick={() => { }}
      >
        <IoIosAdd />
      </BasicButton>
    </div>
  );
}
