import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  seasonName: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ seasonName: '10-4' });
}
