import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from '@/../database';
import {queriesUser as queries} from '@/../database/queries';
import {User, SqlResponse} from '@/../interfaces'

type DataUsers =
  | { message: string; }
  | User[]
  | User
  | SqlResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<DataUsers>) {

  switch (req.method) {
    case 'GET':
      return getUsers(res);

    case 'POST':
      return createUser(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

export const getUsers = async (res: NextApiResponse<DataUsers>) => {
  const pool = await db.poolPromise;
  const result = await pool.request().query(queries.getAll)
  res.status(200).json(result.recordset)
}

const createUser = async (req: NextApiRequest, res: NextApiResponse<DataUsers>) => {
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
      .input('username', db.sql.VarChar, req.body.username)
      .input('password', db.sql.VarChar, req.body.password)
      .input('phone_number1', db.sql.VarChar, req.body.phonNumber1)
      .input('phone_number2', db.sql.VarChar, req.body.phonNumber2)
      .input('email', db.sql.VarChar, req.body.email)
      .input('fiscal_address', db.sql.VarChar, req.body.fiscalAddress)
      .input('birthday', db.sql.VarChar, req.body.birthday)
      .input('profession', db.sql.VarChar, req.body.profession)
      .input('city', db.sql.VarChar, req.body.city)
      .input('state', db.sql.VarChar, req.body.state)
      .input('user_type', db.sql.VarChar, req.body.userType)
      .input('social_facebook', db.sql.VarChar, req.body.socialFacebook)
      .input('social_twitter', db.sql.VarChar, req.body.socialTwitter)
      .input('social_instagram', db.sql.VarChar, req.body.socialInstagram)
      .input('social_youtube', db.sql.VarChar, req.body.socialYoutube)
      .input('image', db.sql.VarChar, req.body.imageData)
      .input('sequence', db.sql.Int, index)
      .query(queries.add);
    res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor...'})
  }
}

