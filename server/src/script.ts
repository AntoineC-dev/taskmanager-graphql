import { PrismaClient, User, Session, Task } from "@prisma/client";
import { logger } from "./utils";

const prisma = new PrismaClient();

type UserInput = Pick<User, "email" | "password" | "username">;
const dummyUser: UserInput = {
  email: "exemple@email.com",
  password: "password123",
  username: "Antoine Cheminat",
};

type SessionInput = Pick<Session, "userAgent" | "userId">;
const dummySession = (userId: string): SessionInput => {
  return {
    userAgent: "Agent1234",
    userId,
  };
};

type TaskInput = Pick<Task, "title" | "description" | "userId">;
const dummyTasks = (userId: string): TaskInput[] => {
  let tasks: TaskInput[] = [];
  for (let i = 0; i < 5; i++) {
    const dummy = {
      title: `Titre ${i}`,
      description: `Description ${i}`,
      userId,
    };
    tasks.push(dummy);
  }
  return tasks;
};
async function main() {
  await prisma.$connect();
  // await prisma.user.create({
  //   data: dummyUser,
  // });
  // const user = await prisma.user.findUnique({ where: { email: dummyUser.email } });
  // if (!user) {
  //   logger.error("Could not create user");
  //   return;
  // }
  // await prisma.session.create({
  //   data: dummySession(user.id),
  // });

  // await prisma.task.createMany({
  //   data: dummyTasks(user.id),
  // });

  const allUsers = await prisma.user.findMany();
  const allSessions = await prisma.user.findFirst().sessions();
  const allTasks = await prisma.user.findFirst().tasks();
  console.log("Users:", allUsers);
  console.log("Sessions:", allSessions);
  console.log("Tasks:", allTasks);
}

main()
  .catch((e) => {
    logger.error(e, "Script error");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
