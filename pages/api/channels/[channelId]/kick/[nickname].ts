import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  if (req.method === 'DELETE') {
    res.status(200).json({ message: 'Kicked successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
