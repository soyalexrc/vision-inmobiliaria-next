import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from '@/../database';
import {SqlResponse, User} from "../../../../interfaces";
import {v4 as uuid4} from 'uuid';
import path from 'path';
import {queriesUser as queries} from '@/../database/queries'
import fs from 'fs';


type DataUser =
  | { message: string; }
  | SqlResponse
  | User

export default function handler(req: NextApiRequest, res: NextApiResponse<DataUser>) {

  switch (req.method) {
    case 'GET':
      return getUser(req, res);

    case 'PUT':
      return updateUser(req, res);

    case 'DELETE':
      return deleteUser(req, res)

    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse<DataUser>) => {
  const {id} = req.query;

  const pool: any = await db.poolPromise;
  const result = await pool.request().input('id', db.sql.VarChar, id).query(queries.getById)
  if (result.recordset.length < 1) {
    res.status(200).json({message: 'No se encontro un user con el id ' + id})
  } else {
    res.status(200).json(result)
  }
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<DataUser>) => {
  const {id} = req.query;

  console.log(id);

  const pool = await db.poolPromise;
  const result = await pool.request().input('id', db.sql.VarChar, id).query(queries.delete)
  res.status(200).json({message: 'Se elimino el usuario con exito!'})
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<DataUser>) => {
  try {

    const pool = await db.poolPromise;
    const result = await pool.request()
      .input('id', db.sql.Int, parseInt(req.body.id))
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
      .query(queries.update)

    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Ocurrio un error'})
  }
}
