import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  let fileName: string | string[] | undefined = req.query.id;
  const filePath = path.resolve('uploads/' + fileName);
  try {
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'image/jpg');
    res.setHeader('content-disposition', `attachment; filename="${fileName}"`);
    res.send(imageBuffer);
  } catch (err) {
    let data = {
      success: 0,
      error: 'Image not found',
    };
    res.status(200).json(data);
  }
}
