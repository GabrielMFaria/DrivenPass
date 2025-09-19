import { Request, Response } from "express";
import * as credentialService from "../services/credentialService";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function createCredentialController(req: AuthRequest, res: Response) {
  try {
    const credential = await credentialService.createCredential(req.userId!, req.body);
    res.status(201).json(credential);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export async function getAllCredentialsController(req: AuthRequest, res: Response) {
  const credentials = await credentialService.getAllCredentials(req.userId!);
  res.status(200).json(credentials);
}

export async function getCredentialByIdController(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  const credential = await credentialService.getCredentialById(req.userId!, id);
  res.status(200).json(credential);
}

export async function deleteCredentialController(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  await credentialService.deleteCredential(req.userId!, id);
  res.status(204).send();
}
