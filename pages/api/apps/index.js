import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const apps = await prisma.apps.findMany();
      return res.status(200).json(apps);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return res.status(500);
  }
}
