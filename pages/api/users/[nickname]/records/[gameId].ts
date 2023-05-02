import { NextApiRequest, NextApiResponse } from 'next';

import { randomInt } from 'next/dist/shared/lib/bloom-filter/utils';

import { RecordDetail, Records } from 'types/historyTypes';

type Error = {
  message: string;
};
export default (
  req: NextApiRequest,
  res: NextApiResponse<Records | RecordDetail | Error>
) => {
  const { gameId } = req.query;
  if (req.method === 'GET') {
    console.log('in get');
    switch (gameId) {
      case '1':
        res.status(200).json({
          duration: 214,
          me: {
            lp: 4242,
            lpChange: 42,
          },
          you: {
            lp: 4158,
            lpChange: -42,
          },
          rounds: [
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
          ],
        });
        break;
      case '2':
        res.status(200).json({
          duration: 142,
          me: {
            lp: 0,
            lpChange: 0,
          },
          you: {
            lp: 0,
            lpChange: 0,
          },
          rounds: [
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
          ],
        });
        break;
      case '3':
        res.status(200).json({
          duration: 264,
          me: {
            lp: 4200,
            lpChange: -42,
          },
          you: {
            lp: 4242,
            lpChange: 42,
          },
          rounds: [
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
          ],
        });
        break;
      case '4':
        res.status(200).json({
          duration: 264,
          me: {
            lp: 0,
            lpChange: 0,
          },
          you: {
            lp: 0,
            lpChange: 0,
          },
          rounds: [
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: false,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
            {
              bounces: randomInt(1, 42),
              meWin: true,
            },
          ],
        });
        break;
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
