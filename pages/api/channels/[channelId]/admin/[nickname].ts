import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Admin privileges have been granted successfully' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: 'Admin privilege has been successfully released' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
