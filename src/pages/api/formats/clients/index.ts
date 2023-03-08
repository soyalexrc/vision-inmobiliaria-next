import {NextApiRequest, NextApiResponse} from "next";
import {sleep} from "../../../../../utils";
import {FORMAT_CLIENTS} from "../../../../../utils/mock-data";

interface DataClients  {

}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataClients>) {
  switch (req.method) {
    case 'GET':
      return getClientsData(req, res)

    case 'POST':
      return createClientData(req, res)
  }
}

const getClientsData = async (req: NextApiRequest, res: NextApiResponse<DataClients>) => {
  await sleep(2000)
  res.status(200).json(FORMAT_CLIENTS)

}
const createClientData = async (req: NextApiRequest, res: NextApiResponse<DataClients>) => {

}
