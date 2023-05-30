import { NextApiRequest, NextApiResponse } from 'next';

import { ChatList, DMRoom } from 'types/notificationTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<ChatList | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      chatList: chatListResponse,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const chatListResponse: DMRoom[] = [
  {
    nickname: 'hakim',
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    newChats: 24,
  },
  {
    nickname: 'iakim',
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    newChats: 99,
  },
  {
    nickname: 'jakim',
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    newChats: 120,
  },
  {
    nickname: 'kakim',
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    newChats: 0,
  },
  {
    nickname: 'lakim',
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    newChats: 0,
  },
];
