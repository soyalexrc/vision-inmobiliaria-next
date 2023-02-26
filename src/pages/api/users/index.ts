import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from '@/../database';

type Data =
  | { message: string; }
  | any
  // | IEntry[]
  // | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch(req.method) {
    case 'GET':
      return getUsers(res);

    case 'POST':
      return createUser(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

const getUsers = async( res: NextApiResponse<Data>) => {
  const pool = db.executeQuery("SELECT * FROM [dbo].[user]");
  // const result = pool.request() .query("SELECT * FROM [dbo].[user]")
  res.status(200).json({data: JSON.stringify(pool)})
}

const createUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {description = ''} = req.body;

  // const newEntry = new Entry({
  //   description,
  //   createdAt: Date.now(),
  // })

  try {
    // await db.connect()
    // await newEntry.save();
    // await db.disconnect()
    //
    // res.status(201).json(newEntry)
  } catch(e) {
    // await db.disconnect()
    // console.log(e);

    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor...'})
  }

}
