import { NextApiRequest, NextApiResponse } from 'next';

import { IsMyChannel } from 'types/channelTypes';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<IsMyChannel | Error>) => {
  if (req.method === 'GET') {
    res.status(200).json(myChannel);
    // res.status(200).json(noChannel);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const myChannel: IsMyChannel = {
  id: 1,
  title: '너 안에 나 있다',
  headCount: 10,
  maxCount: 10
};

const noChannel: IsMyChannel = null;
