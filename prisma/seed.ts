import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@driven.com.br";
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("demo123", 10); 
    await prisma.user.create({
      data: {
        name: "Demo",
        email,
        password: hashedPassword
      }
    });
    console.log("Usuário demo criado com sucesso!");
  } else {
    console.log("Usuário demo já existe.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
