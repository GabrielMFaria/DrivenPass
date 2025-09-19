import prisma from "../config/database";

export async function createCredential(data: any) {
  return await prisma.credential.create({ data });
}

export async function findCredentialByTitle(userId: number, title: string) {
  return await prisma.credential.findFirst({ where: { userId, title } });
}

export async function findCredentialsByUserId(userId: number) {
  return await prisma.credential.findMany({ where: { userId } });
}

export async function findCredentialById(userId: number, id: number) {
  return await prisma.credential.findFirst({ where: { id, userId } });
}

export async function deleteCredential(id: number) {
  return await prisma.credential.delete({ where: { id } });
}
