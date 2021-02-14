import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';

import { isValidUrl } from '@/utils/isValidUrl';

import Url, { IUrl } from '../../../models/Url';
import DatabaseService from '../../../services/database';

const secret = process.env.JWT_SECRET;
const signingKey = process.env.JWT_SIGNING_PRIVATE_KEY;

interface TokenProps {
  name: string;
  email: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  const token = ((await jwt.getToken({
    req,
    secret,
    signingKey,
  })) as unknown) as TokenProps;

  if (token === null) {
    return res.status(401).end(JSON.stringify({ error: 'Please login!' }));
  }

  DatabaseService.connect();
  let url: IUrl | IUrl[];

  try {
    switch (method) {
      case 'GET':
        url = await Url.find({ userId: token.sub });
        res.status(200).json(url);
        break;
      case 'POST':
        {
          const { longUrl } = req.body;
          if (!isValidUrl(longUrl, ['http', 'https'])) {
            return res.status(400).send({
              error: `Couldn't shorten the URL because of validation errors.\n${longUrl}`,
            });
          }
          url = new Url({
            longUrl,
            userId: token.sub,
          });
          await url.save();
          res.status(200).json(url);
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res
          .status(405)
          .end(JSON.stringify({ error: `Method ${method} Not Allowed` }));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
