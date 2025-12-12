//## 2.4 Create API Route for Login

//**File:** `src/app/api/auth/login/route.ts`

//```typescript
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { prisma } from '../../../../lib/prisma';
import { verifyPassword } from '../../../../lib/auth';
import { loginSchema } from '../../../../validations/auth';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = loginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            deletedAt: true,
          },
        },
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    // Check if company is deleted
    if (user.company.deletedAt) {
      return NextResponse.json(
        { error: { code: 'COMPANY_DELETED', message: 'Company account has been deactivated' } },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(validatedData.password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(validatedData.rememberMe ? '30d' : '7d')
      .sign(secret);

    // Create response
    const response = NextResponse.json({
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId,
          company: {
            id: user.company.id,
            name: user.company.name,
          },
        },
      },
    });

    // Set cookie
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: validatedData.rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Login failed' } },
      { status: 500 }
    );
  }
}