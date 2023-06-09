import { NextApiRequest, NextApiResponse } from 'next';

import { Channel } from 'types/channelTypes';

type Error = {
  message: string;
};

type Response = {
  myChannel: Channel | null;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({ myChannel: myChannel });
    // res.status(200).json({ myChannel: null });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const myChannel: Channel = {
  id: 1,
  title: '너 안에 나 있다',
  headCount: 10,
  maxCount: 10,
};
