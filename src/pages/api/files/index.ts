import {NextApiRequest, NextApiResponse} from "next";
import path from 'path'
import fs from 'fs'
import {db} from '@/../database';
import {queriesProperty as queries} from '@/../database/queries';

type DataProperties = { message: string; }

export default function handler(req: NextApiRequest, res: NextApiResponse<DataProperties>) {

  switch(req.method) {
    case 'POST':
      return uploadFile(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const {alias} = req.body;
  console.log('body', req.body);
  try {

    let filename: any = null;

    if (req.body.imageData) {
      const type = (req.body.imageType === 'application/pdf') ? '.pdf' : req.body.imageType.replace('image/', '.');
      filename = req.body.imageName.split('.')[0] + type;
      const filePath = path.join(process.cwd(), `/public/images/${alias}/${filename}`);

      const fileContents = new Buffer(req.body.imageData.split(';base64,').pop(), 'base64');
      fs.writeFile(filePath, fileContents, (err: any) => {
        if (err) return console.error(err);
        console.log('file saved to ', filename)
      });
    }
    res.status(201).json(filename);
  } catch (error: any) {
    res.status(500);
    res.send({message: 'No se pudo cargar la imagen'})
  }
}
