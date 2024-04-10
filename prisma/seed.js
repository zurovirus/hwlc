const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.apps.upsert({
    where: { appName: "Office 365" },
    update: {},
    create: {
      appName: "Office 365",
    },
  });

  await prisma.apps.upsert({
    where: { appName: "Microsoft Teams" },
    update: {},
    create: {
      appName: "Microsoft Teams",
    },
  });

  await prisma.apps.upsert({
    where: { appName: "Adobe Acrobat Pro" },
    update: {},
    create: {
      appName: "Adobe Acrobat Pro",
    },
  });

  await prisma.apps.upsert({
    where: { appName: "Citrix" },
    update: {},
    create: {
      appName: "Citrix",
    },
  });

  await prisma.apps.upsert({
    where: { appName: "Great Plains" },
    update: {},
    create: {
      appName: "Great Plains",
    },
  });

  await prisma.apps.upsert({
    where: { appName: "Power BI" },
    update: {},
    create: {
      appName: "Power BI",
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
