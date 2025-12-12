import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '../../../../lib/prisma';

const secretKey = process.env.NEXTAUTH_SECRET;
if (!secretKey) {
  console.error('❌ NEXTAUTH_SECRET is not defined in environment variables!');
}
const secret = new TextEncoder().encode(secretKey || 'fallback-secret-for-error-handling');

async function getUser(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    
    console.log('🔍 Checking for session token...');
    console.log('   Token exists:', !!token);
    
    if (!token) {
      console.log('❌ No session token found in cookies');
      return null;
    }
    
    if (!secretKey) {
      console.error('❌ Cannot verify JWT - NEXTAUTH_SECRET not set');
      return null;
    }
    
    console.log('🔐 Verifying JWT token...');
    const { payload } = await jwtVerify(token, secret);
    console.log('✅ JWT verified successfully');
    console.log('   Payload userId:', payload.userId);
    
    console.log('👤 Fetching user from database...');
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
    
    if (!user) {
      console.log('❌ User not found in database');
      return null;
    }
    
    console.log('✅ User found:', {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId
    });
    
    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
    };
  } catch (error) {
    console.error('❌ Error in getUser:', error);
    return null;
  }
}

// FIX: Change the function signature to properly handle params
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // ← CHANGED: params is now a Promise
) {
  console.log('\n========================================');
  console.log('🏢 GET COMPANY API CALLED');
  console.log('========================================');
  
  try {
    // AWAIT the params
    const params = await context.params;
    
    console.log('📋 Requested Company ID:', params.id);
    console.log('🌐 Request URL:', req.url);
    console.log('🕐 Timestamp:', new Date().toISOString());
    
    // Check environment
    if (!secretKey) {
      console.error('❌ NEXTAUTH_SECRET not configured');
      return NextResponse.json(
        { error: { code: 'CONFIG_ERROR', message: 'Server configuration error' } },
        { status: 500 }
      );
    }

    // Check Prisma connection
    console.log('🗄️  Testing database connection...');
    try {
      await prisma.$connect();
      console.log('✅ Database connected');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        { error: { code: 'DB_ERROR', message: 'Database connection failed' } },
        { status: 500 }
      );
    }

    // Authenticate user
    console.log('\n🔐 AUTHENTICATION CHECK');
    console.log('─────────────────────────');
    const user = await getUser(req);
    
    if (!user) {
      console.log('❌ Authentication failed');
      console.log('========================================\n');
      return NextResponse.json(
        { error: { code: 'AUTH_REQUIRED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    console.log('✅ User authenticated successfully');

    // Check if user has a company
    if (!user.companyId) {
      console.log('❌ User has no companyId assigned');
      console.log('========================================\n');
      return NextResponse.json(
        { error: { code: 'NO_COMPANY', message: 'User not associated with a company' } },
        { status: 400 }
      );
    }

    // Fetch company from database
    console.log('\n🏢 FETCHING COMPANY DATA');
    console.log('─────────────────────────');
    console.log('   Looking for company ID:', params.id);
    
    const company = await prisma.company.findUnique({
      where: { id: params.id },
      include: {
        creator: { select: { name: true, email: true } },
        updater: { select: { name: true, email: true } },
        _count: { select: { users: true } },
      },
    });

    if (!company) {
      console.log('❌ Company not found in database');
      console.log('========================================\n');
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Company not found' } },
        { status: 404 }
      );
    }

    console.log('✅ Company found:', company.name);

    // Check access rights
    console.log('\n🔐 ACCESS CONTROL CHECK');
    console.log('─────────────────────────');
    console.log('   User companyId:', user.companyId);
    console.log('   Requested company:', company.id);
    console.log('   Match:', company.id === user.companyId);
    
    if (company.id !== user.companyId) {
      console.log('❌ Access denied - company mismatch');
      console.log('========================================\n');
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }

    console.log('✅ Access granted');

    // Prepare response
    const response = {
      data: {
        id: company.id,
        name: company.name,
        legal_entity: company.legal_entity,
        industry: company.industry,
        country_of_registration: company.country_of_registration,
        userCount: company._count.users,
        createdAt: company.createdAt.toISOString(),
        updatedAt: company.updatedAt.toISOString(),
        creator: company.creator,
        updater: company.updater,
      },
    };

    console.log('\n✅ SUCCESS - Sending response');
    console.log('========================================\n');

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('\n========================================');
    console.error('❌ FATAL ERROR IN GET COMPANY API');
    console.error('========================================');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('========================================\n');
    
    return NextResponse.json(
      { 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Failed to fetch company',
          details: error instanceof Error ? error.message : 'Unknown error'
        } 
      },
      { status: 500 }
    );
  }
}

// Also fix PUT and DELETE
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

    if (user.role !== 'admin' && user.role !== 'manager') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, legal_entity, industry, country_of_registration } = body;

    if (!name || !legal_entity || !industry || !country_of_registration) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'All fields are required' } },
        { status: 400 }
      );
    }

    const existing = await prisma.company.findFirst({
      where: {
        name: name,
        NOT: { id: params.id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: { code: 'DUPLICATE_COMPANY', message: 'Company name already exists' } },
        { status: 400 }
      );
    }

    const company = await prisma.company.update({
      where: { id: params.id },
      data: {
        name,
        legal_entity,
        industry,
        country_of_registration,
        updatedBy: user.userId,
      },
    });

    return NextResponse.json({ data: company });
  } catch (error) {
    console.error('PUT company error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to update company' } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const user = await getUser(req);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      );
    }

    await prisma.company.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.userId,
      },
    });

    return NextResponse.json({ data: { message: 'Company deleted' } });
  } catch (error) {
    console.error('DELETE company error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to delete company' } },
      { status: 500 }
    );
  }
}