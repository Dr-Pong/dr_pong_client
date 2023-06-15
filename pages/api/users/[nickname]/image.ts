import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<Error | Response>
) => {
  if (req.method === 'PATCH') {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
