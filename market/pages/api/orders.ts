import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Orders API ready. Connect database + payment logic." });
}
