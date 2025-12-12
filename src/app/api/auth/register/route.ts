//**File:** `src/app/api/auth/register/route.ts`

//```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { hashPassword } from '../../../../lib/auth';
import { registerSchema } from '../../../../validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: { code: 'DUPLICATE_EMAIL', message: 'Email already registered' } },
        { status: 400 }
      );
    }

    // Check if company name exists
    const existingCompany = await prisma.company.findUnique({
      where: { name: validatedData.companyName },
    });

    if (existingCompany) {
      return NextResponse.json(
        { error: { code: 'DUPLICATE_COMPANY', message: 'Company name already exists' } },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create company and user in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create company
      const company = await tx.company.create({
        data: {
          name: validatedData.companyName,
          legal_entity: validatedData.legalEntity,
          industry: validatedData.industry,
          country_of_registration: validatedData.country,
        },
      });

      // Create user
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          name: validatedData.name,
          password: hashedPassword,
          role: 'admin', // First user is admin
          companyId: company.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          companyId: true,
          createdAt: true,
        },
      });

      // Update company to set creator
      await tx.company.update({
        where: { id: company.id },
        data: { createdBy: user.id },
      });

      return { user, company };
    });

    return NextResponse.json({ data: result.user }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Registration failed' } },
      { status: 500 }
    );
  }
}