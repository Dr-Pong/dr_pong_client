import { NextApiRequest, NextApiResponse } from 'next';

import { Achievement, Achievements } from 'types/userTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<Achievements | Error>
) => {
  const { selected } = req.query;
  if (req.method === 'GET') {
    selected
      ? res.status(200).json({ achievements: achievements.slice(0, 3) })
      : res.status(200).json({ achievements: achievements });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const achievements: Achievement[] = [
  {
    id: 1,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'selected',
  },
  {
    id: 2,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'selected',
  },
  {
    id: 3,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'selected',
  },
  {
    id: 4,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'unachieved',
  },
  {
    id: 5,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'achieved',
  },
  {
    id: 6,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'achieved',
  },
  {
    id: 7,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'achieved',
  },
  {
    id: 8,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'unachieved',
  },
  {
    id: 9,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'unachieved',
  },
  {
    id: 10,
    name: '초보자',
    imgUrl: 'https://i.imgur.com/gMyCd.jpeg',
    content: '초보자',
    status: 'achieved',
  },
  {
    id: 11,
    name: '중급자',
    imgUrl: 'https://i.imgur.com/IPrFWOw.jpeg',
    content: '중급자',
    status: 'unachieved',
  },
  {
    id: 12,
    name: '상급자',
    imgUrl: 'https://i.imgur.com/OIazUYI.jpeg',
    content: '상급자',
    status: 'unachieved',
  },
];
