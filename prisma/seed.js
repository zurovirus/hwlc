const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.app.upsert({
    where: { appName: "Office 365" },
    update: {},
    create: {
      appName: "Office 365",
    },
  });

  await prisma.app.upsert({
    where: { appName: "Microsoft Teams" },
    update: {},
    create: {
      appName: "Microsoft Teams",
    },
  });

  await prisma.app.upsert({
    where: { appName: "Adobe Acrobat Pro" },
    update: {},
    create: {
      appName: "Adobe Acrobat Pro",
    },
  });

  await prisma.app.upsert({
    where: { appName: "Citrix" },
    update: {},
    create: {
      appName: "Citrix",
    },
  });

  await prisma.app.upsert({
    where: { appName: "Great Plains" },
    update: {},
    create: {
      appName: "Great Plains",
    },
  });

  await prisma.app.upsert({
    where: { appName: "Power BI" },
    update: {},
    create: {
      appName: "Power BI",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Wired Mouse" },
    update: {},
    create: {
      peripheralName: "Wired Mouse",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Wired Keyboard" },
    update: {},
    create: {
      peripheralName: "Wired Keyboard",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Wireless Mouse/Keyboard" },
    update: {},
    create: {
      peripheralName: "Wireless Mouse/Keyboard",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Telephone" },
    update: {},
    create: {
      peripheralName: "Telephone",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Webcam" },
    update: {},
    create: {
      peripheralName: "Webcam",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Headset" },
    update: {},
    create: {
      peripheralName: "Headset",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Speakers" },
    update: {},
    create: {
      peripheralName: "Speakers",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Microphone" },
    update: {},
    create: {
      peripheralName: "Microphone",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Docking Station" },
    update: {},
    create: {
      peripheralName: "Docking Station",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Bag Tag Printer" },
    update: {},
    create: {
      peripheralName: "Bag Tag Printer",
    },
  });

  await prisma.peripheral.upsert({
    where: { peripheralName: "Ticket Printer" },
    update: {},
    create: {
      peripheralName: "Ticket Printer",
    },
  });

  await prisma.company.upsert({
    where: { companyName: "Perimeter Aviation" },
    update: {},
    create: {
      companyName: "Perimeter Aviation",
    },
  });

  await prisma.company.upsert({
    where: { companyName: "Custom Helicopter" },
    update: {},
    create: {
      companyName: "Custom Helicopter",
    },
  });

  await prisma.company.upsert({
    where: { companyName: "Keewatin Airlines" },
    update: {},
    create: {
      companyName: "Keewatin Airlines",
    },
  });

  await prisma.company.upsert({
    where: { companyName: "Calmair" },
    update: {},
    create: {
      companyName: "Calmair",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
