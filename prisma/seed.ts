// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // create example company if you have Company model
  const company = await prisma.company?.create?.({
    data: {
      name: 'Demo Company Ltd',
      // add any required fields your Company model requires
    },
  }) ?? null;

  // Create Assurance example
  await prisma.assurance.create({
    data: {
      companyId: company?.id ?? null,
      assuranceProvider: 'PwC',
      scopeOfAssurance: 'LIMITED', // enum value if applicable
      reportingStandards: 'ISAE 3000',
      assuranceConclusionSummary: 'Limited assurance provided; no major qualifications.',
      assuranceReportUrl: null,
      assuranceReportFilename: null,
      assuranceReportMime: null,
      assuranceReportSizeBytes: null,
      materialMisstatementsIdentified: 'No material misstatements identified.',
      managementResponse: 'Management accepts findings and will remediate within 90 days.',
      checklist_data_collection_documented: true,
      checklist_internal_controls_tested: true,
      checklist_source_documentation_trail: true,
      checklist_calculation_method_validated: true,
    }
  });

  // Create EUTaxonomy example
  await prisma.eUTaxonomy.create({
    data: {
      companyId: company?.id ?? null,
      economicActivities: '3.3 Manufacture of low carbon technologies: 35%\n7.3 Installation of energy efficiency equipment: 12%',
      taxonomyEligibleRevenuePct: 47,
      taxonomyAlignedRevenuePct: 38,
      technicalScreeningCriteria: 'Substantial contribution demonstrated for energy efficiency',
      dnsh_status: 'ALL_OBJECTIVES_PASSED',
      social_safeguards_status: 'FULL_COMPLIANCE',
      taxonomyEligibleCapexPct: 52,
      taxonomyAlignedCapexPct: 45,
      taxonomyAlignedOpexPct: 28,
    }
  });

  // Create EnvironmentalTopics example
  await prisma.environmentalTopics.create({
    data: {
      companyId: company?.id ?? null,
      e1_material: true,
      e1_climatePolicy: 'Net-zero by 2050, interim targets 2030',
      e1_reductionTarget: '-50% Scope 1+2 by 2030 vs 2023',
      e1_scope1_tco2e: 12500,
      e1_scope2_tco2e: 8300,
      e2_nox_t_per_year: 12,
      e2_sox_t_per_year: 3,
      e3_water_withdrawal_m3: 250000,
      e3_water_recycling_rate_pct: 42,
      e4_protected_areas_impact: 'Operations outside protected zones',
      e5_recycling_rate_pct: 60,
      e5_recycled_input_materials_pct: 30,
    }
  });

  // Create SocialTopics example
  await prisma.socialTopics.create({
    data: {
      companyId: company?.id ?? null,
      s1_material: true,
      s1_employee_count_by_contract: 'Full-time: 850 (M:520, F:330), Part-time: 150 (M:60, F:90)',
      s1_health_and_safety: 'LTIFR: 2.5, Fatalities: 0',
      s1_training_hours_per_employee: 32,
      s2_material: true,
      s2_pct_suppliers_audited: 78,
      s2_remediation_actions: 'Supplier corrective action plans implemented; 5 escalated.',
      s3_material: false,
      s3_community_engagement: 'Local employment and community forum',
      s3_complaints_and_outcomes: '15 complaints, 14 resolved',
      s4_material: true,
      s4_product_safety_incidents: 2,
      s4_consumer_remediation: 'Two recalls, compensation provided',
    }
  });

  // Create SGovernance example
  await prisma.sGovernance.create({
    data: {
      companyId: company?.id ?? null,
      g1_board_composition_independence: '12 members, 8 independent (67%)',
      g1_gender_diversity_pct: 42,
      g1_esg_oversight: 'Sustainability committee, KPIs included in exec pay',
      g1_whistleblower_cases: '3 reports received; 2 substantiated; actions taken',
      g1_anti_corruption_policies: '98% employees trained, 0 incidents',
      g1_related_party_controls: 'Board approval required for >1% transactions',
    }
  });

  console.log('Seed finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
