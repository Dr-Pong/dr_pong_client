import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  if (req.method === 'DELETE') {
    const rand = Math.floor(Math.random() * 10);
    if (rand % 2 === 0) res.status(200).json({ message: 'success' });
    else res.status(405).json({ message: 'Method Not Allowed' });
  }
};
