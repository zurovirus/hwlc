import { prisma } from "@/components/lib/prisma";
import { decryptPassword } from "@/components/lib/auth";

export default async function handler(req, res) {
  // console.log("step 2");
  // if (req.method === "GET") {
  //   try {
  //     const loot = await prisma.userForm.findFirst({
  //       where: {
  //         firstName: "Binbin",
  //       },
  //     });
  //     console.log(loot);
  //     console.log(decryptPassword(loot.password));
  //     return res.status(200).json(loot);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // } else {
  //   return res.status(500).json(error);
  // }
}
