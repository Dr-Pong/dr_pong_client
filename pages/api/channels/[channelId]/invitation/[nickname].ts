import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Invited successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
