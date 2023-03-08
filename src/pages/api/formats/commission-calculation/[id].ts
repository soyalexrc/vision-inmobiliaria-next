import {NextApiRequest, NextApiResponse} from "next";

interface DataCommission  {

}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataCommission>) {
  switch (req.method) {
    case 'GET':
      return getCommissionsData(req, res)

    case 'PUT':
      return updateCommissionData(req, res)

    case 'DELETE':
      return deleteCommissionData(req, res)
  }
}

const getCommissionsData = async (req: NextApiRequest, res: NextApiResponse<DataCommission>) => {

}
const updateCommissionData = async (req: NextApiRequest, res: NextApiResponse<DataCommission>) => {
}

const deleteCommissionData = async (req: NextApiRequest, res: NextApiResponse<DataCommission>) => {

}
