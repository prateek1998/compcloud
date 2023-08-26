import { NextApiHandler, NextApiRequest } from 'next';
import formidable from 'formidable';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs, { existsSync } from 'fs';
import Sharp from 'sharp';

let filePath = './uploads';

export const config = {
  api: {
    bodyParser: false,
  },
};
const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
  fileDetails: formidable.Fields;
}> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(filePath);
    options.filename = (name, ext, path, form) => {
      let fileExt = path.originalFilename?.split('.')[1];
      return uuidv4() + '.' + fileExt;
      //Date.now().toString() + "_" + path.originalFilename
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, async (error: any, fields: any, files: any) => {
      let fileExt: string = fields.fileExt[0];
      let newFilePath: string = path.join(filePath, uuidv4() + '.' + fileExt);
      let info: any = await Sharp(files.images[0].filepath)
        .webp({ quality: 10 })
        .toFile(newFilePath); // (err, info) => { console.log(info) });
      info['originalSize'] = files.images[0].size;
      info['filePath'] = newFilePath;
      if (error) reject(error);
      resolve({ fields, files, fileDetails: info });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    // step 1: check images folder exist or not
    const isUploadDirExist = existsSync(filePath);
    if (!isUploadDirExist) {
      fs.mkdirSync(filePath);
    }
    // step 2: upload images to this folder then we need to compress this images
    let { fileDetails }: any = await readFile(req, false).catch((err) => {
      console.log('error in conversion', err);
    });
    let respData = {
      success: 1,
      data: {
        originalSize: fileDetails.originalSize,
        finalSize: fileDetails.size,
        filePath: fileDetails.filePath,
        height: fileDetails.height,
        width: fileDetails.width,
      },
    };
    return res.send(respData);
  }
};

export default handler;
