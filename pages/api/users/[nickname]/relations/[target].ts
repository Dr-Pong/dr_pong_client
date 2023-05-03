import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

type Relation = {
  status: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<Relation | Error>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      // status: 'friend',
      // status:'blocked',
      status: 'none',
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
