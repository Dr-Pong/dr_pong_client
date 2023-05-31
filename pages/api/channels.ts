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
    let filteredChannels = [...channelsList.channel];

    if (typeof keyword === 'string') {
      const lowercaseKeyword = keyword.toLowerCase();
      filteredChannels = filteredChannels.filter((channel) =>
        channel.title.toLowerCase().includes(lowercaseKeyword)
      );
    }

    if (order === 'popular') {
      filteredChannels.sort((a, b) => b.headCount - a.headCount);
    } else if (order === 'recent') {
      filteredChannels.sort((a, b) => a.id - b.id);
    }

    const totalPages = Math.ceil(filteredChannels.length / countNum);
    const slicedChannels = filteredChannels.slice((pageNum - 1) * countNum, pageNum * countNum);

    res.status(200).json({
      channel: slicedChannels,
      currentPage: pageNum,
      totalPage: totalPages
    });
  } else if (req.method === 'POST') {
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};


const channelsList: AllChannels = {
  channel: [
    {
      id: 1,
      title: '파이썬 기초반 1',
      access: 'public',
      headCount: 1,
      maxCount: 2
    },
    {
      id: 2,
      title: '파이썬 기초반 2',
      access: 'protected',
      headCount: 3,
      maxCount: 4
    },
    {
      id: 3,
      title: '파이썬 기초반 3',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 4,
      title: '파이썬 기초반 4',
      access: 'protected',
      headCount: 7,
      maxCount: 8
    },
    {
      id: 5,
      title: '파이썬 기초반 5',
      access: 'public',
      headCount: 8,
      maxCount: 8
    },
    {
      id: 6,
      title: '파이썬 기초반 6',
      access: 'protected',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 7,
      title: '파이썬 기초반 7',
      access: 'public',
      headCount: 15,
      maxCount: 16
    },
    {
      id: 8,
      title: '파이썬 기초반 8',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 9,
      title: '파이썬 기초반 9',
      access: 'public',
      headCount: 10,
      maxCount: 10
    },
    {
      id: 10,
      title: '파이썬 기초반 10',
      access: 'public',
      headCount: 2,
      maxCount: 11
    },
    {
      id: 11,
      title: '파이썬 기초반 11',
      access: 'public',
      headCount: 22,
      maxCount: 35
    },
    {
      id: 12,
      title: '파이썬 기초반 12',
      access: 'public',
      headCount: 33,
      maxCount: 33
    },
    {
      id: 13,
      title: '파이썬 기초반 13',
      access: 'public',
      headCount: 14,
      maxCount: 15
    },
    {
      id: 14,
      title: '파이썬 기초반 14',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 15,
      title: '파이썬 기초반 15',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 16,
      title: '파이썬 기초반 16',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 17,
      title: '파이썬 기초반 17',
      access: 'public',
      headCount: 2,
      maxCount: 2
    },
    {
      id: 18,
      title: '파이썬 기초반 18',
      access: 'public',
      headCount: 4,
      maxCount: 30
    },
    {
      id: 19,
      title: '파이썬 기초반 19',
      access: 'public',
      headCount: 35,
      maxCount: 36
    },
    {
      id: 20,
      title: '파이썬 기초반 20',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 21,
      title: '파이썬 기초반 21',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 22,
      title: '파이썬 기초반 22',
      access: 'public',
      headCount: 3,
      maxCount: 4
    },
    {
      id: 23,
      title: '파이썬 기초반 23',
      access: 'public',
      headCount: 5,
      maxCount: 6
    },
    {
      id: 24,
      title: '파이썬 기초반 24',
      access: 'public',
      headCount: 9,
      maxCount: 9
    },
    {
      id: 25,
      title: '파이썬 기초반 25',
      access: 'public',
      headCount: 10,
      maxCount: 50
    },
    {
      id: 26,
      title: '파이썬 기초반 26',
      access: 'public',
      headCount: 33,
      maxCount: 50
    },
    {
      id: 27,
      title: '파이썬 기초반 27',
      access: 'public',
      headCount: 53,
      maxCount: 56
    },
    {
      id: 28,
      title: '파이썬 기초반 28',
      access: 'public',
      headCount: 44,
      maxCount: 50
    },
    {
      id: 29,
      title: '파이썬 기초반 29',
      access: 'public',
      headCount: 13,
      maxCount: 50
    },
    {
      id: 30,
      title: '파이썬 기초반 30',
      access: 'public',
      headCount: 23,
      maxCount: 50
    },
    {
      id: 31,
      title: '파이썬 기초반 31',
      access: 'public',
      headCount: 50,
      maxCount: 50
    },
    {
      id: 32,
      title: '파이썬 기초반 32',
      access: 'public',
      headCount: 50,
      maxCount: 50
    },
    {
      id: 33,
      title: '파이썬 기초반 33',
      access: 'public',
      headCount: 34,
      maxCount: 50
    },
    {
      id: 34,
      title: '파이썬 기초반 34',
      access: 'public',
      headCount: 30,
      maxCount: 50
    },
    {
      id: 35,
      title: '파이썬 기초반 35',
      access: 'public',
      headCount: 23,
      maxCount: 50
    },
    {
      id: 36,
      title: '파이썬 기초반 36',
      access: 'public',
      headCount: 5,
      maxCount: 5
    },
    {
      id: 37,
      title: '파이썬 기초반 37',
      access: 'public',
      headCount: 24,
      maxCount: 44
    },
    {
      id: 38,
      title: '파이썬 기초반 38',
      access: 'public',
      headCount: 25,
      maxCount: 25
    },
    {
      id: 39,
      title: '파이썬 기초반 39',
      access: 'public',
      headCount: 13,
      maxCount: 34
    },
  ],
  currentPage: 1,
  totalPage: 3,
};
