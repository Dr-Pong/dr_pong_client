import { NextApiRequest, NextApiResponse } from 'next';

import { UserDetail } from 'types/userTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<UserDetail | Error>
) => {
  const { nickname } = req.query;

  if (req.method === 'GET') {
    const user = userDetaiils.filter((el) => el.nickname === nickname);
    if (user.length === 1) res.status(200).json(user[0]);
    res.status(400).json({ message: 'No such user' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const userDetaiils: UserDetail[] = [
  {
    nickname: 'tom',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 1,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'jerry',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 2,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'hakim',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 3,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'naeImDa',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 4,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'jiyun',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 5,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'jihyukim',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 5,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'keokim',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 5,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'nheo',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 5,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'jaehwkim',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 5,
    title: null,
    statusMessage: 'hello world',
  },
  {
    nickname: 'junyopar',
    image: {
      id: 1,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    level: 5,
    title: null,
    statusMessage: 'hello world',
  },
];
