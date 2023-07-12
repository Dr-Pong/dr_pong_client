import { NextApiRequest, NextApiResponse } from 'next';

import { ExpResult } from 'types/gameTypes';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<ExpResult | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json(stat);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const stat: ExpResult = {
  beforeExp: 450,
  expChange: 100,
  levelExp: 500,
};
