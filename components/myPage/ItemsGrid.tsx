import React from 'react';
import { useQuery } from 'react-query';

import { Achievement, Emoji } from 'types/myPageTypes';

import instance from 'utils/axios';

import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/ItemsGrid.module.scss';

export default function ItemsGrid({
  userName,
  itemType,
}: {
  userName: string;
  itemType: string;
}) {
  const itemsQuery = itemType === 'achieve' ? 'achievements' : 'emojies';
  const fetchItems = async (): Promise<Achievement[] | Emoji[]> => {
    const res = await instance.get(`/users/${userName}/${itemsQuery}`);
    return res.data;
  };
  const { data, isLoading, isError } = useQuery(['item'], fetchItems);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const items = data as Achievement[] | Emoji[];
  return (
    <div className={styles.itemsGrid}>
      {items.map((item) => (
        <SelectableItem key={item.id} itemType={itemType} item={item} />
      ))}
    </div>
  );
}

// const initVal: Emoji[] | Achievement[] = [
//   { id: 1, name: '', imgUrl: '', content: '', status: '' },
//   { id: 2, name: '', imgUrl: '', content: '', status: '' },
//   { id: 3, name: '', imgUrl: '', content: '', status: '' },
// ];
