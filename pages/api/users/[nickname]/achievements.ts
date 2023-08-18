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
    name: 'seahorse',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Seahorse.svg',
    content: '1승',
    status: 'selected',
  },
  {
    id: 2,
    name: 'octopus',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Octopus.svg',
    content: '8승',
    status: 'selected',
  },
  {
    id: 3,
    name: 'squid',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Squid.svg',
    content: '10승',
    status: 'selected',
  },
  {
    id: 4,
    name: 'hatched',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Hatched.svg',
    content: '달걀퐁 탈출',
    status: 'unachieved',
  },
  {
    id: 5,
    name: 'summa cum laude',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Summa+Pong+Laude.svg',
    content: '학사퐁이 되다',
    status: 'achieved',
  },
  {
    id: 6,
    name: 'transcendence',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Transcendence.svg',
    content: '석사퐁이 되다',
    status: 'achieved',
  },
  {
    id: 7,
    name: 'dr.pong',
    imgUrl:
      'https://drpong.s3.ap-northeast-2.amazonaws.com/achievements/Dr.Pong.svg',
    content: '박사퐁 박사퐁',
    status: 'achieved',
  },
];
