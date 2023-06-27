import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  if (req.method === 'PATCH') {
    res.status(200).json({ message: 'success' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
