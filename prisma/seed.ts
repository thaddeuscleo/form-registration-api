import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
    await prisma.booking.deleteMany({})
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
