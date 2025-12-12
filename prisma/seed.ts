//**File:** `prisma/seed.ts`

//```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a test company
  const company = await prisma.company.create({
    data: {
      name: 'Test Company GmbH',
      legal_entity: 'GmbH',
      industry: 'Automotive',
      country_of_registration: 'Germany',
    },
  });

  // Create an admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 12);
  
  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      companyId: company.id,
    },
  });

  console.log('✓ Seed data created');
  console.log('Email: admin@test.com');
  console.log('Password: Admin123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });