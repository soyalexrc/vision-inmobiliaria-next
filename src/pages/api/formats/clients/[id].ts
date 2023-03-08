import {NextApiRequest, NextApiResponse} from "next";
import {sleep} from "../../../../../utils";

interface DataClients  {

}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataClients>) {
  switch (req.method) {
    case 'GET':
      return getClientsData(req, res)

    case 'PUT':
      return updateClientData(req, res)

    case 'DELETE':
      return deleteClientData(req, res)
  }
}

const getClientsData = async (req: NextApiRequest, res: NextApiResponse<DataClients>) => {

}
const updateClientData = async (req: NextApiRequest, res: NextApiResponse<DataClients>) => {
}

const deleteClientData = async (req: NextApiRequest, res: NextApiResponse<DataClients>) => {
  await sleep(2000)

  res.status(200).json({message: 'Se elimino la data con exito!'})
}
