import { PrismaClient, Statistic } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const body = req.body as Statistic[]

      await prisma.statistic.createMany({ data: body, skipDuplicates: false })

      res.status(200).json({ message: "Success", data: body })
    } catch (error) {
      console.log({ error: error })
      return res.status(500).json({ error: "internal server error" })
    }
  } else {
    res.status(405).end()
  }
}
