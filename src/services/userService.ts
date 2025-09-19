import bcrypt from "bcrypt";
import * as userRepo from "../repositories/userRepository";
import jwt from "jsonwebtoken";

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

export async function signInUser(email: string, password: string) {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    const error = new Error("User not found");
    (error as any).status = 404;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error("Invalid password");
    (error as any).status = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return { token };
}

export async function eraseUser(userId: number) {
  await userRepo.deleteUserAndCredentials(userId);
}