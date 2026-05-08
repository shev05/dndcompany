import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@dnd.ru' },
    update: {},
    create: {
      name: 'Админ',
      email: 'admin@dnd.ru',
      password: hashedPassword,
    },
  });

  console.log('✅ Админ создан:', admin.email);
  console.log('🔑 Логин: admin@dnd.ru');
  console.log('🔑 Пароль: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
