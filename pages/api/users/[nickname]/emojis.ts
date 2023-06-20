import { NextApiRequest, NextApiResponse } from 'next';

import { Emoji, Emojis } from 'types/userTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Emojis | Error>) => {
  const { selected } = req.query;
  if (req.method === 'GET') {
    selected
      ? res.status(200).json({ emojis: emojis.slice(0, 4) })
      : res.status(200).json({ emojis: emojis });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

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
  {
    id: 4,
    name: '빵긋',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'selected',
  },
  {
    id: 5,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'unachieved',
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
    status: 'unachieved',
  },
  {
    id: 8,
    name: '눈물',
    imgUrl: 'https://i.imgur.com/GcllAAB.jpeg',
    status: 'unachieved',
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
