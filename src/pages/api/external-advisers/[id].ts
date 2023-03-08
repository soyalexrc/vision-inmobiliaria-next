import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from '@/../database';
import { SqlResponse, ExternalAdviser} from "../../../../interfaces";
import {queriesOwner as queries} from '@/../database/queries'

type DataExternalAdviser =
  | { message: string; }
  | SqlResponse
  | ExternalAdviser

export default function handler(req: NextApiRequest, res: NextApiResponse<DataExternalAdviser>) {

  switch (req.method) {
    case 'GET':
      return getExternalAdviser(req, res);

    case 'PUT':
      return updateExternalAdviser(req, res);

    case 'DELETE':
      return deleteExternalAdviser(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

const getExternalAdviser = async (req: NextApiRequest, res: NextApiResponse<DataExternalAdviser>) => {
  const {id} = req.query;

  const pool: any = await db.poolPromise;
  const result = await pool.request().input('id', db.sql.VarChar, id).query(queries.getById)
  if (result.recordset.length < 1) {
    res.status(200).json({message: 'No se encontro un user con el id ' + id})
  } else {
    res.status(200).json(result)
  }
}
const updateExternalAdviser = async (req: NextApiRequest, res: NextApiResponse<DataExternalAdviser>) => {
  try {

    const pool = await db.poolPromise;
    const result = await pool.request()
      .input('id', db.sql.Int, parseInt(req.body.id))
      .input('first_name', db.sql.VarChar, req.body.firstName)
      .input('last_name', db.sql.VarChar, req.body.lastName)
      .input('phone', db.sql.VarChar, req.body.phone)
      .input('email', db.sql.VarChar, req.body.email)
      .input('birthday', db.sql.VarChar, req.body.birthday)
      .input('isInvestor', db.sql.VarChar, req.body.isInvestor)
      .input('type', db.sql.VarChar, req.body.type)
      .query(queries.update);
    res.status(200).json(result)

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Ocurrio un error'})
  }
}
const deleteExternalAdviser = async (req: NextApiRequest, res: NextApiResponse<DataExternalAdviser>) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request()
      .input('id', db.sql.VarChar, req.query?.id)
      .query(queries.delete);
    res.status(200).json(result)
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Ocurrio un error'})
  }
}
