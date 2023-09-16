import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs, { existsSync } from 'fs';

const accessKeyId: any = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey: any = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;
const filePath = process.env.File_Path;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let fileLink = req.body.filePath;
    if (!existsSync(fileLink)) {
      return res.status(200).json({
        status: 0,
        errorMsg: 'File not found',
      });
    }
    let content = fs.readFileSync(fileLink);
    let fileName = fileLink.split('\\')[1];
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: Bucket,
      Key: filePath + fileName,
      Body: content,
      ContentType: 'image/jpeg',
    });
    let s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
    const data = await s3Client.send(command);
    // console.log(data);
    let imageUrl = 'https://' + Bucket + '/' + filePath + fileName;
    return res.status(200).json({
      success: 1,
      data: {
        message: 'successfully uploaded file to S3',
        location: imageUrl,
        path: fileLink,
      },
    });
  }
}
