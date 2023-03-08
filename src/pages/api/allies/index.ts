import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from '@/../database';
import {queriesOwner as queries} from '@/../database/queries';
import {Ally, SqlResponse} from '@/../interfaces'

type DataAlly =
  | { message: string; }
  | Ally[]
  | Ally
  | SqlResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<DataAlly>) {

  switch (req.method) {
    case 'GET':
      return getAllies(req, res);

    case 'POST':
      return createAlly(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

export const getAllies = async (req: NextApiRequest, res: NextApiResponse<DataAlly>) => {
  const pool = await db.poolPromise;
  const result = await pool.request()
    .input('type', db.sql.VarChar, req.query?.type)
    .query(queries.getAll)

  res.status(200).json(result.recordset)
}

const createAlly = async (req: NextApiRequest, res: NextApiResponse<DataAlly>) => {
  try {

    const pool = await db.poolPromise;

    let index;
    const queryForSequence = "SELECT * FROM dbo.[user] WHERE SUBSTRING(first_name, 1,1) = @first_name AND SUBSTRING(last_name, 1,1) = @last_name ORDER BY id asc";

    const resultQueryForSequence = await pool.request()
      .input('first_name', db.sql.VarChar, req.body.firstName[0])
      .input('last_name', db.sql.VarChar, req.body.lastName[0])
      .query(queryForSequence);

    const forLoop = async () => {
      for (index = 0; index < resultQueryForSequence.recordset.length; index++) {
        if (resultQueryForSequence.recordset[index].sequence === 0 || resultQueryForSequence.recordset[index].sequence === null) {
          const queryForUpdateSequence = 'update dbo.[user] set sequence = '+ index +' where id = ' + resultQueryForSequence.recordset[index].id;
          await pool.request()
            .query(queryForUpdateSequence);
        }
      }
    };
    await forLoop();

    const result = await pool.request()
      .input('first_name', db.sql.VarChar, req.body.firstName)
      .input('last_name', db.sql.VarChar, req.body.lastName)
      .input('phone', db.sql.VarChar, req.body.phone)
      .input('email', db.sql.VarChar, req.body.email)
      .input('birthday', db.sql.VarChar, req.body.birthday)
      .input('isInvestor', db.sql.VarChar, req.body.isInvestor)
      .input('type', db.sql.VarChar, req.body.type)
      .query(queries.add);
    res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor...'})
  }
}

