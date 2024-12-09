import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firtsName: 'Juan',
      lastName: 'Páez García',
      username: 'juanp123',
      email: 'juan@example.com',
      password: 'hashed_password_123',
    },
  });

  await prisma.user.create({
    data: {
      firtsName: 'Ana',
      lastName: 'Gómez',
      username: 'anag123',
      email: 'ana@example.com',
      password: 'hashed_password_456',
    },
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });