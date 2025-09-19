import { Request, Response } from "express";
import * as userService from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function signUpController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.signUpUser(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export async function signInController(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { token } = await userService.signInUser(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export async function eraseUserController(req: AuthRequest, res: Response) {
  try {
    await userService.eraseUser(req.userId!);
    res.status(204).send(); 
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}