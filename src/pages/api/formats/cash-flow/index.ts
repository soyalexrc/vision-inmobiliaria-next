import {NextApiRequest, NextApiResponse} from "next";

interface DataCashFlow  {

}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataCashFlow>) {
  switch (req.method) {
    case 'GET':
      return getCashFlowData(req, res)

    case 'POST':
      return createClientData(req, res)
  }
}

const getCashFlowData = async (req: NextApiRequest, res: NextApiResponse<DataCashFlow>) => {

}
const createClientData = async (req: NextApiRequest, res: NextApiResponse<DataCashFlow>) => {

}
