// pages/api/Esrs2GeneralDisclosures.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';

// ✅ IMPROVEMENT 1: Use singleton pattern to avoid multiple Prisma instances
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ✅ IMPROVEMENT 2: Add input validation schema
const Esrs2Schema = z.object({
  companyId: z.string().uuid('Invalid company ID'),
  reportingPeriod: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid reporting period format (YYYY-MM)'),
  consolidationScope: z.string().min(1, 'Consolidation scope is required'),
  valueChainBoundaries: z.string().min(1, 'Value chain boundaries is required'),
  boardRoleInSustainability: z.string().min(1, 'Board role is required'),
  esgIntegrationInRemuneration: z.number().int().min(0).max(100).nullable().optional(),
  assessmentProcess: z.string().min(1, 'Assessment process is required'),
});

// ✅ IMPROVEMENT 3: Add proper TypeScript types
type SuccessResponse = {
  success: true;
  data: any;
};

type ErrorResponse = {
  success: false;
  error: string;
  details?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // ✅ IMPROVEMENT 4: Handle multiple HTTP methods
  if (req.method === 'POST') {
    return handleCreate(req, res);
  }
  
  if (req.method === 'PUT') {
    return handleUpdate(req, res);
  }
  
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  return res.status(405).json({ 
    success: false,
    error: 'Method not allowed' 
  });
}

// CREATE handler
async function handleCreate(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  try {
    // ✅ IMPROVEMENT 5: Validate input with Zod
    const validationResult = Esrs2Schema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.issues,
      });
    }

    const body = validationResult.data;

    // ✅ IMPROVEMENT 6: Better date handling with validation
    const reportingPeriodDate = new Date(`${body.reportingPeriod}-01T00:00:00.000Z`);
    
    if (isNaN(reportingPeriodDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid reporting period date',
      });
    }

    // ✅ IMPROVEMENT 7: Check for existing record (unique constraint)
    const existing = await prisma.esrs2GeneralDisclosures.findUnique({
      where: {
        companyId_reportingPeriod: {
          companyId: body.companyId,
          reportingPeriod: reportingPeriodDate,
        },
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'A record already exists for this company and reporting period',
        details: { existingId: existing.id },
      });
    }

    // ✅ IMPROVEMENT 8: Verify company exists
    const company = await prisma.company.findUnique({
      where: { id: body.companyId },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found',
      });
    }

    // Create record
    const created = await prisma.esrs2GeneralDisclosures.create({
      data: {
        companyId: body.companyId,
        reportingPeriod: reportingPeriodDate,
        consolidationScope: body.consolidationScope,
        valueChainBoundaries: body.valueChainBoundaries,
        boardRoleInSustainability: body.boardRoleInSustainability,
        esgIntegrationInRemuneration: body.esgIntegrationInRemuneration ?? null,
        assessmentProcess: body.assessmentProcess,
      },
      // ✅ IMPROVEMENT 9: Include related data in response
      include: {
        company: {
          select: {
            id: true,
            name: true,
            industry: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      data: created,
    });

  } catch (error) {
    console.error('ESRS2 Create Error:', error);

    // ✅ IMPROVEMENT 10: Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          error: 'A record with this combination already exists',
        });
      }
      
      // Foreign key constraint violation
      if (error.code === 'P2003') {
        return res.status(400).json({
          success: false,
          error: 'Invalid company reference',
        });
      }
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to create ESRS 2 record',
    });
  }
}

// UPDATE handler
async function handleUpdate(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  try {
    const { id, ...updateData } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid record ID is required',
      });
    }

    // Validate update data
    const UpdateSchema = Esrs2Schema.partial().omit({ companyId: true });
    const validationResult = UpdateSchema.safeParse(updateData);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.issues,
      });
    }

    const body = validationResult.data;

    // Convert reporting period if provided
    let reportingPeriodDate: Date | undefined;
    if (body.reportingPeriod) {
      reportingPeriodDate = new Date(`${body.reportingPeriod}-01T00:00:00.000Z`);
      if (isNaN(reportingPeriodDate.getTime())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid reporting period date',
        });
      }
    }

    const updated = await prisma.esrs2GeneralDisclosures.update({
      where: { id },
      data: {
        ...(reportingPeriodDate && { reportingPeriod: reportingPeriodDate }),
        ...(body.consolidationScope && { consolidationScope: body.consolidationScope }),
        ...(body.valueChainBoundaries && { valueChainBoundaries: body.valueChainBoundaries }),
        ...(body.boardRoleInSustainability && { boardRoleInSustainability: body.boardRoleInSustainability }),
        ...(body.esgIntegrationInRemuneration !== undefined && { 
          esgIntegrationInRemuneration: body.esgIntegrationInRemuneration 
        }),
        ...(body.assessmentProcess && { assessmentProcess: body.assessmentProcess }),
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            industry: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {
    console.error('ESRS2 Update Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          error: 'Record not found',
        });
      }
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to update ESRS 2 record',
    });
  }
}

// GET handler
async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  try {
    const { companyId, reportingPeriod, id } = req.query;

    // Get single record by ID
    if (id && typeof id === 'string') {
      const record = await prisma.esrs2GeneralDisclosures.findUnique({
        where: { id },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              industry: true,
            },
          },
        },
      });

      if (!record) {
        return res.status(404).json({
          success: false,
          error: 'Record not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: record,
      });
    }

    // Get specific record by company and period
    if (companyId && reportingPeriod && typeof companyId === 'string' && typeof reportingPeriod === 'string') {
      const reportingDate = new Date(`${reportingPeriod}-01T00:00:00.000Z`);
      
      const record = await prisma.esrs2GeneralDisclosures.findUnique({
        where: {
          companyId_reportingPeriod: {
            companyId,
            reportingPeriod: reportingDate,
          },
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              industry: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: record,
      });
    }

    // Get all records for a company
    if (companyId && typeof companyId === 'string') {
      const records = await prisma.esrs2GeneralDisclosures.findMany({
        where: { companyId },
        orderBy: { reportingPeriod: 'desc' },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              industry: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: records,
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Either id, or companyId is required',
    });

  } catch (error) {
    console.error('ESRS2 Get Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch ESRS 2 records',
    });
  }
}

// ✅ IMPROVEMENT 11: Clean up Prisma connection on hot reload
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.dispose(() => {
      prisma.$disconnect();
    });
  }
}