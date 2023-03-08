import {NextApiRequest, NextApiResponse} from "next";

interface DataCommission  {

}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataCommission>) {
  switch (req.method) {
    case 'GET':
      return getCommissionData(req, res)

    case 'POST':
      return createCommissionData(req, res)
  }
}

const getCommissionData = async (req: NextApiRequest, res: NextApiResponse<DataCommission>) => {

}
const createCommissionData = async (req: NextApiRequest, res: NextApiResponse<DataCommission>) => {

}
