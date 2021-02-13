import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';

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
  const {
    method,
    query: { shortUrl },
  } = req;
  const token = ((await jwt.getToken({
    req,
    secret,
    signingKey,
  })) as unknown) as TokenProps;

  if (token === null) {
    return res.status(401).end('Please login!');
  }

  DatabaseService.connect();
  let url: IUrl | IUrl[];

  try {
    switch (method) {
      case 'DELETE':
        url = await Url.findOneAndDelete({ shortUrl: shortUrl as string });
        if (url == null) {
          return res.status(400).send({
            error: 'ShortUrl not found!',
          });
        }
        res.status(200).json(url);
        break;
      default:
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
