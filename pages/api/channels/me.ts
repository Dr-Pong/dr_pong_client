import { NextApiRequest, NextApiResponse } from 'next';

import { EachChannel } from 'types/channelTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<EachChannel | null | Error>) => {
  if (req.method === 'GET') {
    res.status(200).json(myChannel);
    // res.status(200).json(null);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const myChannel: EachChannel = {
  id: 1,
  title: '너 안에 나 있다',
  headCount: 10,
  maxCount: 10
};
