import { prisma } from "@/components/lib/prisma";
import { encryptPassword, decryptPassword } from "@/components/lib/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const encryptedPassword = encryptPassword(req.body.password);
    const peripheralData = req.body.selectedPeripherals.map((peripheral) =>
      parseInt(peripheral)
    );
    const appData = req.body.selectedApps.map((app) => parseInt(app));

    const userData = await prisma.userForm.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
        assetTag: req.body.deviceTag,
        deviceSerialNumber: req.body.deviceSerial,
        extraApps: req.body.otherApps,
        notes: req.body.notes,
        monitors: req.body.monitors,
        extraPeripherals: req.body.otherPeripherals,
        printer: req.body.printer,
        company: {
          connect: { id: parseInt(req.body.company) },
        },
        apps: {
          connect: appData.map((id) => ({ id })),
        },
        peripherals: {
          connect: peripheralData.map((id) => ({ id })),
        },
      },
    });

    return res.status(200).json(userData);
  } else {
    return res.status(500);
  }
}
