import { NextApiRequest, NextApiResponse } from 'next';

import { UserImages } from 'types/userTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<UserImages | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(userImages);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const userImages = {
  images: [
    {
      id: 1,
      url: '',
    },
    {
      id: 2,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    },
    {
      id: 3,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jiyun.jpeg?imwidth=100',
    },
    {
      id: 4,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jihyukim.jpeg?imwidth=100',
    },
    {
      id: 5,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/nheo.jpeg?imwidth=100',
    },
    {
      id: 6,
      url: 'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jaehwkim.jpeg?imwidth=100',
    },
  ],
};
