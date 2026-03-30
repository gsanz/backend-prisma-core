import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const users = [
    {
      name: 'Juan',
      email: 'juan@tragsa.com',
      password: '123456',
    },
    {
      name: 'Ana',
      email: 'ana@tragsa.com',
      password: '123456',
    },
  ];

  for (const user of users) {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Usuarios creados con UUID automático');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
