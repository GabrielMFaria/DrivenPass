import prisma from "../config/database";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUser(name: string, email: string, password: string) {
  return await prisma.user.create({
    data: { name, email, password },
  });
}

export async function deleteUserAndCredentials(userId: number) {
    
  await prisma.credential.deleteMany({ where: { userId } });

  await prisma.user.delete({ where: { id: userId } });
}
