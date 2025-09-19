import bcrypt from "bcrypt";
import * as userRepo from "../repositories/userRepository";

export async function signUpUser(name: string, email: string, password: string) {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email already registered");
    (error as any).status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepo.createUser(name, email, hashedPassword);
  return user;
}
