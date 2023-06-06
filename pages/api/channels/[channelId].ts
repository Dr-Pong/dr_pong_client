import { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

type Response = {
  message: string;
  body: {
    access: string;
    password: string;
  };
};

export default (
  req: NextApiRequest,
  res: NextApiResponse<Error | Response>
) => {
  if (req.method === 'PATCH') {
    res.status(200).json({ message: 'success', body: req.body });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
