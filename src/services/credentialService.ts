import * as credentialRepo from "../repositories/credentialRepository";
import cryptr from "../config/cryptr";

export async function createCredential(userId: number, data: any) {
  const existing = await credentialRepo.findCredentialByTitle(userId, data.title);
  if (existing) {
    const error = new Error("Credential title already exists");
    (error as any).status = 409;
    throw error;
  }

  data.password = cryptr.encrypt(data.password);
  return await credentialRepo.createCredential({ ...data, userId });
}

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepo.findCredentialsByUserId(userId);
  return credentials.map((c: { password: string; }) => ({ ...c, password: cryptr.decrypt(c.password) }));
}

export async function getCredentialById(userId: number, id: number) {
  const credential = await credentialRepo.findCredentialById(userId, id);
  if (!credential) {
    const error = new Error("Credential not found");
    (error as any).status = 404;
    throw error;
  }
  return { ...credential, password: cryptr.decrypt(credential.password) };
}

export async function updateCredentialService(userId: number, id: number, data: any) {
  const credential = await credentialRepo.findCredentialById(userId, id);
  if (!credential) {
    const error = new Error("Credential not found");
    (error as any).status = 404;
    throw error;
  }

  if (data.password) data.password = cryptr.encrypt(data.password);

  await credentialRepo.updateCredential(id, data);
}

export async function deleteCredentialService(userId: number, id: number) {
  const credential = await credentialRepo.findCredentialById(userId, id);
  if (!credential) {
    const error = new Error("Credential not found");
    (error as any).status = 404;
    throw error;
  }
  await credentialRepo.deleteCredential(id);
}
