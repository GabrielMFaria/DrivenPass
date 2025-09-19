import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function signUpController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.signUpUser(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
