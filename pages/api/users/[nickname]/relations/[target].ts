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
  const { target } = req.query;

  if (req.method === 'GET') {
    if (relations.hasOwnProperty(target as string))
      res.status(200).json(relations[target as string]);
    res.status(400).json({ message: 'No such user' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

const relations: { [key: string]: Relation } = {
  hakim: {
    status: 'friend',
  },
  jiyun: {
    status: 'friend',
  },
  jihyukim: {
    status: 'blocked',
  },
  keokim: {
    status: 'none',
  },
  jaehwkim: {
    status: 'none',
  },
  junyopar: {
    status: 'none',
  },
  nheo: {
    status: 'none',
  },
  tom: {
    status: 'none',
  },
  jerry: {
    status: 'none',
  },
};
