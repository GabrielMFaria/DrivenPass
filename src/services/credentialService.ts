import * as credentialRepo from "../repositories/credentialRepository";

export async function createCredential(userId: number, data: any) {
  const existing = await credentialRepo.findCredentialByTitle(userId, data.title);
  if (existing) {
    const error = new Error("Credential title already exists");
    (error as any).status = 409;
    throw error;
  }

  return await credentialRepo.createCredential({ ...data, userId });
}

export async function getAllCredentials(userId: number) {
  return await credentialRepo.findCredentialsByUserId(userId);
}

export async function getCredentialById(userId: number, id: number) {
  const credential = await credentialRepo.findCredentialById(userId, id);
  if (!credential) {
    const error = new Error("Credential not found");
    (error as any).status = 404;
    throw error;
  }
  return credential;
}

export async function deleteCredential(userId: number, id: number) {
  const credential = await credentialRepo.findCredentialById(userId, id);
  if (!credential) {
    const error = new Error("Credential not found");
    (error as any).status = 404;
    throw error;
  }
  await credentialRepo.deleteCredential(id);
}
