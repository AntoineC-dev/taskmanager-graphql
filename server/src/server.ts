import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const dummy: Omit<User, "id"> = {
  email: "exemple@email.com",
  password: "password123",
  username: "Antoine Cheminat",
};

async function main() {
  await prisma.$connect();
  await prisma.user.create({
    data: dummy,
  });
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
