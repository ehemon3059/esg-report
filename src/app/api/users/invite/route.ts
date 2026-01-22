import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '../../../../lib/prisma';
import { hashPassword, generateToken } from '../../../../lib/auth';
import { inviteUserSchema } from '../../../../validations/user';

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

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    // Check permissions - only admin and manager can invite users
    if (user.role !== 'admin' && user.role !== 'manager') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions to invite users' } },
        { status: 403 }
      );
    }

    const body = await req.json();
    
    // Validate input
    const validatedData = inviteUserSchema.parse(body);

    // Check role-based creation permissions
    const targetRole = validatedData.role;
    
    if (user.role === 'manager') {
      // Managers can only create users and auditors
      if (targetRole === 'admin' || targetRole === 'manager') {
        return NextResponse.json(
          { 
            error: { 
              code: 'FORBIDDEN', 
              message: `Managers cannot create ${targetRole} users` 
            } 
          },
          { status: 403 }
        );
      }
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: { code: 'DUPLICATE_EMAIL', message: 'Email already registered' } },
        { status: 400 }
      );
    }

    // Generate temporary password
    const tempPassword = generateToken();
    const hashedPassword = await hashPassword(tempPassword);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        role: validatedData.role,
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
    });

    // TODO: In production, send invitation email with temp password
    // For now, we'll return it in the response (ONLY FOR DEVELOPMENT)
    console.log(`
      ========================================
      NEW USER INVITED
      ========================================
      Email: ${newUser.email}
      Temporary Password: ${tempPassword}
      ========================================
      NOTE: In production, this should be sent via email
    `);

    return NextResponse.json({
      data: {
        user: {
          ...newUser,
          createdAt: newUser.createdAt.toISOString(),
          updatedAt: newUser.updatedAt.toISOString(),
        },
        // REMOVE THIS IN PRODUCTION - Only for development
        tempPassword: process.env.NODE_ENV === 'development' ? tempPassword : undefined,
      },
    }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      );
    }

    console.error('Invite user error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to invite user' } },
      { status: 500 }
    );
  }
}