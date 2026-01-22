import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '../../../lib/prisma';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

async function getUser(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    
    if (!token) {
      return null;
    }
    
    const { payload } = await jwtVerify(token, secret);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        companyId: true,
      },
    });
    
    return user;
  } catch (error) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    // Get pagination parameters from query string
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    // Fetch users from the same company
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          companyId: user.companyId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          companyId: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: {
          companyId: user.companyId,
        },
      }),
    ]);

    return NextResponse.json({
      data: {
        users: users.map(u => ({
          ...u,
          createdAt: u.createdAt.toISOString(),
          updatedAt: u.updatedAt.toISOString(),
        })),
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('GET users error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch users' } },
      { status: 500 }
    );
  }
}