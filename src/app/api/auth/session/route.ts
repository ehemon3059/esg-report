//## 2.5 Create API Route for Session

//**File:** `src/app/api/auth/session/route.ts`

//```typescript
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '../../../../lib/prisma';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;

    if (!token) {
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    // Verify token
    const { payload } = await jwtVerify(token, secret);

    // Fetch user with company
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
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

    if (!user) {
      return NextResponse.json(
        { error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }

    if (user.company.deletedAt) {
      return NextResponse.json(
        { error: { code: 'COMPANY_DELETED', message: 'Company account deactivated' } },
        { status: 403 }
      );
    }

    return NextResponse.json({
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
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'TOKEN_EXPIRED', message: 'Session expired' } },
      { status: 401 }
    );
  }
}