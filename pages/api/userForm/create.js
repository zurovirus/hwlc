import { prisma } from "@/components/lib/prisma";
import { hashPassword } from "@/components/lib/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
  } else {
    return res.status(500);
  }
}
