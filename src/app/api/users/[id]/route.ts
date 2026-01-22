import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '../../../../lib/prisma';
import { userSchema } from '../../../../validations/user';

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

// GET single user
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
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

    if (!targetUser) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }

    // Check if user belongs to same company
    if (targetUser.companyId !== user.companyId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }

    return NextResponse.json({
      data: {
        user: {
          ...targetUser,
          createdAt: targetUser.createdAt.toISOString(),
          updatedAt: targetUser.updatedAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('GET user error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch user' } },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    // Fetch target user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        companyId: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }

    // Check if user belongs to same company
    if (targetUser.companyId !== user.companyId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }

    // Check edit permissions
    const canEdit = checkEditPermission(user.role, targetUser.role);
    
    if (!canEdit) {
      return NextResponse.json(
        { 
          error: { 
            code: 'FORBIDDEN', 
            message: `You cannot edit ${targetUser.role} users` 
          } 
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    
    // Validate input
    const validatedData = userSchema.parse(body);

    // Check if new role assignment is allowed
    if (validatedData.role !== targetUser.role) {
      const canAssignRole = checkRoleAssignmentPermission(user.role, validatedData.role);
      
      if (!canAssignRole) {
        return NextResponse.json(
          { 
            error: { 
              code: 'FORBIDDEN', 
              message: `You cannot assign ${validatedData.role} role` 
            } 
          },
          { status: 403 }
        );
      }
    }

    // Check if email is being changed and if it already exists
    if (validatedData.email !== targetUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: { code: 'DUPLICATE_EMAIL', message: 'Email already in use' } },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        role: validatedData.role,
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

    return NextResponse.json({
      data: {
        user: {
          ...updatedUser,
          createdAt: updatedUser.createdAt.toISOString(),
          updatedAt: updatedUser.updatedAt.toISOString(),
        },
      },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } },
        { status: 400 }
      );
    }

    console.error('PUT user error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to update user' } },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    // Only admins can delete users
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Only admins can delete users' } },
        { status: 403 }
      );
    }

    // Fetch target user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        companyId: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }

    // Check if user belongs to same company
    if (targetUser.companyId !== user.companyId) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (targetUser.id === user.id) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'You cannot delete yourself' } },
        { status: 403 }
      );
    }

    // Check if this is the last admin
    if (targetUser.role === 'admin') {
      const adminCount = await prisma.user.count({
        where: {
          companyId: user.companyId,
          role: 'admin',
        },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { 
            error: { 
              code: 'FORBIDDEN', 
              message: 'Cannot delete the last admin. Assign another admin first.' 
            } 
          },
          { status: 403 }
        );
      }
    }

    // Delete user
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      data: {
        message: 'User deleted successfully',
        deletedUserId: params.id,
      },
    });
  } catch (error) {
    console.error('DELETE user error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to delete user' } },
      { status: 500 }
    );
  }
}

// Helper function to check edit permissions
function checkEditPermission(userRole: string, targetRole: string): boolean {
  // Admin can edit anyone
  if (userRole === 'admin') return true;
  
  // Manager can only edit users and auditors
  if (userRole === 'manager' && (targetRole === 'user' || targetRole === 'auditor')) {
    return true;
  }
  
  return false;
}

// Helper function to check role assignment permissions
function checkRoleAssignmentPermission(userRole: string, targetRole: string): boolean {
  // Admin can assign any role
  if (userRole === 'admin') return true;
  
  // Manager can only assign user and auditor roles
  if (userRole === 'manager' && (targetRole === 'user' || targetRole === 'auditor')) {
    return true;
  }
  
  return false;
}