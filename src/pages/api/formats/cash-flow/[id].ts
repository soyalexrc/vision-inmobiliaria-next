import {NextApiRequest, NextApiResponse} from "next";

interface DataCashFlow  {

}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataCashFlow>) {
  switch (req.method) {
    case 'GET':
      return getCashFlowsData(req, res)

    case 'PUT':
      return updateCashFlowData(req, res)

    case 'DELETE':
      return deleteCashFlowData(req, res)
  }
}

const getCashFlowsData = async (req: NextApiRequest, res: NextApiResponse<DataCashFlow>) => {

}
const updateCashFlowData = async (req: NextApiRequest, res: NextApiResponse<DataCashFlow>) => {
}

const deleteCashFlowData = async (req: NextApiRequest, res: NextApiResponse<DataCashFlow>) => {

}
