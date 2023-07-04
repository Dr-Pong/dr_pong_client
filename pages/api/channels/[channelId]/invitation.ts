import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Error>) => {
  const { nickname } = req.body;

  if (req.method === 'POST' && nickname) {
    res.status(200).json({ message: 'invitation sent successfully' });
  } else if (req.method === 'PATCH') {
    res.status(200).json({ message: 'success' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
