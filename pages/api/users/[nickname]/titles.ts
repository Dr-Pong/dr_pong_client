import { NextApiRequest, NextApiResponse } from 'next';

import { Title, Titles } from 'types/userTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Titles | Error>) => {
  const { selected } = req.query;
  if (req.method === 'GET') {
    selected
      ? res.status(200).json({ titles: titles.slice(0, 3) })
      : res.status(200).json({ titles: titles });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const titles: Title[] = [
  {
    id: 1,
    title: 'I am the boss',
  },
  {
    id: 2,
    title: 'I am the badass',
  },
  {
    id: 3,
    title: 'I am the king',
  },
  {
    id: 4,
    title: 'I am the queen',
  },
  {
    id: 5,
    title: 'I am the fool',
  },
  {
    id: 6,
    title: 'I am the idiot',
  },
  {
    id: 7,
    title: 'the beginner',
  },
  {
    id: 8,
    title: 'the intermediate',
  },
  {
    id: 9,
    title: 'the advanced',
  },
  {
    id: 10,
    title: 'the legend',
  },
  {
    id: 11,
    title: 'the master',
  },
  {
    id: 12,
    title: 'Dr. Pong',
  },
];
