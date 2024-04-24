import { prisma } from "@/components/lib/prisma";
import { hashPassword } from "@/components/lib/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const hashedPassword = await hashPassword(req.body.password);
    const appData = req.body.selectedApps.map((app) => parseInt(app));
    console.log(appData);

    const userData = await prisma.userForm.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        assetTag: req.body.deviceTag,
        deviceSerialNumber: req.body.deviceSerial,
        extraApps: req.body.otherApps,
        notes: req.body.notes,
        company: {
          connect: { id: parseInt(req.body.company) },
        },
        apps: {
          connect: appData.map((id) => ({ id })),
        },
      },
    });
    return res.status(200).json(userData);
  } else {
    return res.status(500);
  }
}
