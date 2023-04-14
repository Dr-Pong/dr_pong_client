import React from 'react';

import styles from 'styles/myPage/SelectedItems.module.scss';

import SelectableItem from './SelectableItem';

export interface Achievement {
  id: number;
  name: string;
  imgUrl: string;
  content: string;
  status: string;
}

export interface Emoji {
  id: number;
  name: string;
  imgUrl: string;
  status: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    content: '초보자',
    status: 'selected',
  },
  {
    id: 2,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    content: '중급자',
    status: 'selected',
  },
  {
    id: 3,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    content: '상급자',
    status: 'selected',
  },
];

const emojis: Emoji[] = [
  {
    id: 1,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
  {
    id: 2,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
  {
    id: 3,
    name: '화남',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
];
export default function SelectedItems({ itemType }: { itemType: string }) {
  const selectedItems = itemType === 'achieve' ? achievements : emojis;
  return (
    <div className={styles.selectedItems}>
      {selectedItems.map((item) => (
        <SelectableItem key={item.id} itemType={itemType} item={item} />
      ))}
    </div>
  );
}
