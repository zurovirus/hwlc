import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const companies = await prisma.company.findMany();
      return res.status(200).json(companies);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return res.status(500);
  }
}
