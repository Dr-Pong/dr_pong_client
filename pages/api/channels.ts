import { NextApiRequest, NextApiResponse } from 'next';

import { AllChannels } from 'types/channelTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<AllChannels | Error>) => {
  const { page, count, order, keyword } = req.query;
  const pageNum = typeof page === 'string' ? parseInt(page) : 1;
  const countNum = typeof count === 'string' ? parseInt(count) : 1;

  if (req.method === 'GET') {
    res.status(200).json({
      channel: channelsList.channel.slice((pageNum - 1) * countNum, pageNum * countNum),
      currentPage: pageNum,
      totalPage: channelsList.totalPage
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowd' });
  }
};

const channelsList: AllChannels = {
  channel: [
    {
      id: 1,
      title: '파이썬 기초반 1',
      access: 'public',
      headCount: '1',
      maxCount: '2'
    },
    {
      id: 2,
      title: '파이썬 기초반 2',
      access: 'protected',
      headCount: '3',
      maxCount: '4'
    },
    {
      id: 3,
      title: '파이썬 기초반 3',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 4,
      title: '파이썬 기초반 4',
      access: 'protected',
      headCount: '7',
      maxCount: '8'
    },
    {
      id: 5,
      title: '파이썬 기초반 5',
      access: 'public',
      headCount: '8',
      maxCount: '8'
    },
    {
      id: 6,
      title: '파이썬 기초반 6',
      access: 'protected',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 7,
      title: '파이썬 기초반 7',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 8,
      title: '파이썬 기초반 8',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 9,
      title: '파이썬 기초반 9',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 10,
      title: '파이썬 기초반 10',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 11,
      title: '파이썬 기초반 11',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 12,
      title: '파이썬 기초반 12',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 13,
      title: '파이썬 기초반 13',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 14,
      title: '파이썬 기초반 14',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 15,
      title: '파이썬 기초반 15',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 16,
      title: '파이썬 기초반 16',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 17,
      title: '파이썬 기초반 17',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 18,
      title: '파이썬 기초반 18',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 19,
      title: '파이썬 기초반 19',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 20,
      title: '파이썬 기초반 20',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 21,
      title: '파이썬 기초반 21',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 22,
      title: '파이썬 기초반 22',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 23,
      title: '파이썬 기초반 23',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 24,
      title: '파이썬 기초반 24',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    },
    {
      id: 25,
      title: '파이썬 기초반 25',
      access: 'public',
      headCount: '5',
      maxCount: '6'
    }
  ],
  currentPage: 1,
  totalPage: 3,
};
