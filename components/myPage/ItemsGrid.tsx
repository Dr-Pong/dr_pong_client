import React from 'react';

import styles from 'styles/myPage/ItemsGrid.module.scss';

import { EditableStatus } from './MyPageFrame';
import { ItemType } from './Profile';
import SelectableItem from './SelectableItem';
import { Achievement, Emoji } from "./SelectedItems";

export default function ItemsGrid({
  itemType,
  editableStatus,
}: {
  itemType: ItemType;
  editableStatus: EditableStatus;
}) {
  const items: Achievement[] | Emoji[] = emojis;
  return (
    <div className={styles.itemsGrid}>
      {items.map((item) => (
        <SelectableItem
          key={item.id}
          itemType={itemType}
          item={item}
          editableStatus={editableStatus}
        />
      ))}
    </div>
  );
}

const emojis: Emoji[] = [
  {
    id: 1,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 2,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 3,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 4,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 5,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 6,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 7,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 8,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 9,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 10,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 11,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
  {
    id: 12,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'achieved',
  },
];
