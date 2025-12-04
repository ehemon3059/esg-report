import { z } from "zod";

// --- Enums ---
export const DataStatusSchema = z.enum([
  "DRAFT",
  "UNDER_REVIEW",
  "APPROVED",
  "PUBLISHED",
  "REJECTED",
]);

export const DNSHStatusSchema = z.enum([
  "ALL_OBJECTIVES_PASSED",
  "SOME_OBJECTIVES_NOT_MET",
  "ASSESSMENT_IN_PROGRESS",
]);

export const SocialSafeguardsStatusSchema = z.enum([
  "FULL_COMPLIANCE",
  "NON_COMPLIANCE",
  "PARTIAL_REMEDIATION",
]);

export const AssuranceScopeSchema = z.enum([
  "LIMITED",
  "REASONABLE",
  "MIXED",
]);

// --- User Schemas ---
export const UserCreateSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.string().default("user"),
  companyId: z.string().uuid("Invalid company ID"),
});

export const UserUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(1, "Name is required").max(255).optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.string().optional(),
  companyId: z.string().uuid("Invalid company ID").optional(),
});

// --- Company Schemas ---
export const CompanyCreateSchema = z.object({
  name: z.string().min(1, "Company name is required").max(255),
  legal_entity: z.string().min(1, "Legal entity is required").max(100),
  industry: z.string().min(1, "Industry is required").max(100),
  country_of_registration: z.string().default("Germany").max(100),
  createdBy: z.string().uuid().optional(),
});

export const CompanyUpdateSchema = z.object({
  name: z.string().min(1, "Company name is required").max(255).optional(),
  legal_entity: z.string().min(1, "Legal entity is required").max(100).optional(),
  industry: z.string().min(1, "Industry is required").max(100).optional(),
  country_of_registration: z.string().max(100).optional(),
  updatedBy: z.string().uuid().optional(),
});

// --- Site Schemas ---
export const SiteCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  name: z.string().min(1, "Site name is required").max(255),
  address: z.string().max(500).optional(),
  country: z.string().length(2, "Country code must be 2 characters").default("DE"),
  createdBy: z.string().uuid().optional(),
});

export const SiteUpdateSchema = z.object({
  name: z.string().min(1, "Site name is required").max(255).optional(),
  address: z.string().max(500).optional(),
  country: z.string().length(2, "Country code must be 2 characters").optional(),
  updatedBy: z.string().uuid().optional(),
});

// --- Energy Activity Schemas ---
export const EnergyActivityCreateSchema = z.object({
  siteId: z.string().uuid("Invalid site ID"),
  date: z.coerce.date(),
  energyType: z.string().min(1, "Energy type is required").max(100),
  consumption: z.number().positive("Consumption must be positive"),
  unit: z.string().min(1, "Unit is required").max(20),
});

export const EnergyActivityUpdateSchema = z.object({
  date: z.coerce.date().optional(),
  energyType: z.string().min(1, "Energy type is required").max(100).optional(),
  consumption: z.number().positive("Consumption must be positive").optional(),
  unit: z.string().min(1, "Unit is required").max(20).optional(),
});

// --- Fuel Activity Schemas ---
export const FuelActivityCreateSchema = z.object({
  siteId: z.string().uuid("Invalid site ID"),
  date: z.coerce.date(),
  fuelType: z.string().min(1, "Fuel type is required").max(100),
  volume: z.number().positive("Volume must be positive"),
  unit: z.string().min(1, "Unit is required").max(20),
});

export const FuelActivityUpdateSchema = z.object({
  date: z.coerce.date().optional(),
  fuelType: z.string().min(1, "Fuel type is required").max(100).optional(),
  volume: z.number().positive("Volume must be positive").optional(),
  unit: z.string().min(1, "Unit is required").max(20).optional(),
});

// --- Emission Record Schemas ---
export const EmissionRecordCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportId: z.string().uuid("Invalid report ID").optional(),
  scope: z.string().min(1, "Scope is required").max(100),
  tco2e_calculated: z.number().nonnegative("tCO2e must be non-negative"),
  date_calculated: z.coerce.date().default(() => new Date()),
  energyActivityId: z.string().uuid().optional(),
  fuelActivityId: z.string().uuid().optional(),
  emissionFactorId: z.string().uuid("Invalid emission factor ID"),
}).refine(
  (data) => data.energyActivityId || data.fuelActivityId,
  {
    message: "Either energyActivityId or fuelActivityId must be provided",
  }
);

// --- Emission Factor Schemas ---
export const EmissionFactorCreateSchema = z.object({
  scope: z.string().min(1, "Scope is required").max(100),
  activityType: z.string().min(1, "Activity type is required").max(100),
  region: z.string().min(1, "Region is required").max(100),
  factor: z.number().positive("Factor must be positive"),
  unit: z.string().min(1, "Unit is required").max(50),
  version: z.string().min(1, "Version is required").max(50),
  source: z.string().max(255).optional(),
  validFrom: z.coerce.date().default(() => new Date()),
  validUntil: z.coerce.date().optional(),
  isActive: z.boolean().default(true),
});

export const EmissionFactorUpdateSchema = z.object({
  scope: z.string().min(1, "Scope is required").max(100).optional(),
  activityType: z.string().min(1, "Activity type is required").max(100).optional(),
  region: z.string().min(1, "Region is required").max(100).optional(),
  factor: z.number().positive("Factor must be positive").optional(),
  unit: z.string().min(1, "Unit is required").max(50).optional(),
  version: z.string().min(1, "Version is required").max(50).optional(),
  source: z.string().max(255).optional(),
  validFrom: z.coerce.date().optional(),
  validUntil: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
});

// --- ESRS 2 General Disclosures Schemas ---
export const Esrs2GeneralDisclosuresCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportingPeriod: z.coerce.date(),
  consolidationScope: z.string().min(1, "Consolidation scope is required"),
  valueChainBoundaries: z.string().min(1, "Value chain boundaries is required"),
  boardRoleInSustainability: z.string().min(1, "Board role in sustainability is required"),
  esgIntegrationInRemuneration: z.number().int().min(0).max(100).optional(),
  assessmentProcess: z.string().min(1, "Assessment process is required"),
});

export const Esrs2GeneralDisclosuresUpdateSchema = z.object({
  reportingPeriod: z.coerce.date().optional(),
  consolidationScope: z.string().min(1, "Consolidation scope is required").optional(),
  valueChainBoundaries: z.string().min(1, "Value chain boundaries is required").optional(),
  boardRoleInSustainability: z.string().min(1, "Board role in sustainability is required").optional(),
  esgIntegrationInRemuneration: z.number().int().min(0).max(100).optional(),
  assessmentProcess: z.string().min(1, "Assessment process is required").optional(),
});

// --- Environmental Topics Schemas ---
export const EnvironmentalTopicsCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportingPeriod: z.coerce.date(),
  createdBy: z.string().uuid().optional(),
  status: DataStatusSchema.default("DRAFT"),
  
  // E1 - Climate Change
  e1_material: z.boolean().default(false),
  e1_climatePolicy: z.string().optional(),
  e1_reductionTarget: z.string().max(255).optional(),
  
  // E2 - Pollution
  e2_nox_t_per_year: z.number().nonnegative().optional(),
  e2_sox_t_per_year: z.number().nonnegative().optional(),
  
  // E3 - Water & Marine
  e3_water_withdrawal_m3: z.number().nonnegative().optional(),
  e3_water_recycling_rate_pct: z.number().min(0).max(100).optional(),
  
  // E4 - Biodiversity
  e4_protected_areas_impact: z.string().optional(),
  
  // E5 - Circular Economy
  e5_recycling_rate_pct: z.number().min(0).max(100).optional(),
  e5_recycled_input_materials_pct: z.number().min(0).max(100).optional(),
});

export const EnvironmentalTopicsUpdateSchema = z.object({
  reportingPeriod: z.coerce.date().optional(),
  updatedBy: z.string().uuid().optional(),
  status: DataStatusSchema.optional(),
  
  e1_material: z.boolean().optional(),
  e1_climatePolicy: z.string().optional(),
  e1_reductionTarget: z.string().max(255).optional(),
  
  e2_nox_t_per_year: z.number().nonnegative().optional(),
  e2_sox_t_per_year: z.number().nonnegative().optional(),
  
  e3_water_withdrawal_m3: z.number().nonnegative().optional(),
  e3_water_recycling_rate_pct: z.number().min(0).max(100).optional(),
  
  e4_protected_areas_impact: z.string().optional(),
  
  e5_recycling_rate_pct: z.number().min(0).max(100).optional(),
  e5_recycled_input_materials_pct: z.number().min(0).max(100).optional(),
});

// --- Social Topics Schemas ---
export const SocialTopicsCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportingPeriod: z.coerce.date(),
  createdBy: z.string().uuid().optional(),
  status: DataStatusSchema.default("DRAFT"),
  
  // S1 - Own Workforce
  s1_material: z.boolean().default(false),
  s1_employee_count_by_contract: z.string().optional(),
  s1_health_and_safety: z.string().optional(),
  s1_training_hours_per_employee: z.number().int().nonnegative().optional(),
  
  // S2 - Workers in Value Chain
  s2_material: z.boolean().default(false),
  s2_pct_suppliers_audited: z.number().int().min(0).max(100).optional(),
  s2_remediation_actions: z.string().optional(),
  
  // S3 - Affected Communities
  s3_material: z.boolean().default(false),
  s3_community_engagement: z.string().optional(),
  s3_complaints_and_outcomes: z.string().max(500).optional(),
  
  // S4 - Consumers & End Users
  s4_material: z.boolean().default(false),
  s4_product_safety_incidents: z.number().int().nonnegative().optional(),
  s4_consumer_remediation: z.string().optional(),
});

export const SocialTopicsUpdateSchema = z.object({
  reportingPeriod: z.coerce.date().optional(),
  updatedBy: z.string().uuid().optional(),
  status: DataStatusSchema.optional(),
  
  s1_material: z.boolean().optional(),
  s1_employee_count_by_contract: z.string().optional(),
  s1_health_and_safety: z.string().optional(),
  s1_training_hours_per_employee: z.number().int().nonnegative().optional(),
  
  s2_material: z.boolean().optional(),
  s2_pct_suppliers_audited: z.number().int().min(0).max(100).optional(),
  s2_remediation_actions: z.string().optional(),
  
  s3_material: z.boolean().optional(),
  s3_community_engagement: z.string().optional(),
  s3_complaints_and_outcomes: z.string().max(500).optional(),
  
  s4_material: z.boolean().optional(),
  s4_product_safety_incidents: z.number().int().nonnegative().optional(),
  s4_consumer_remediation: z.string().optional(),
});

// --- Governance Schemas ---
export const SGovernanceCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportingPeriod: z.coerce.date(),
  createdBy: z.string().uuid().optional(),
  status: DataStatusSchema.default("DRAFT"),
  
  g1_board_composition_independence: z.string().max(500).optional(),
  g1_gender_diversity_pct: z.number().int().min(0).max(100).optional(),
  g1_esg_oversight: z.string().optional(),
  
  g1_whistleblower_cases: z.string().optional(),
  g1_anti_corruption_policies: z.string().max(500).optional(),
  g1_related_party_controls: z.string().max(500).optional(),
});

export const SGovernanceUpdateSchema = z.object({
  reportingPeriod: z.coerce.date().optional(),
  updatedBy: z.string().uuid().optional(),
  status: DataStatusSchema.optional(),
  
  g1_board_composition_independence: z.string().max(500).optional(),
  g1_gender_diversity_pct: z.number().int().min(0).max(100).optional(),
  g1_esg_oversight: z.string().optional(),
  
  g1_whistleblower_cases: z.string().optional(),
  g1_anti_corruption_policies: z.string().max(500).optional(),
  g1_related_party_controls: z.string().max(500).optional(),
});

// --- EU Taxonomy Schemas ---
export const EUTaxonomyCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportingPeriod: z.coerce.date(),
  createdBy: z.string().uuid().optional(),
  status: DataStatusSchema.default("DRAFT"),
  
  economicActivities: z.string().optional(),
  taxonomyEligibleRevenuePct: z.number().int().min(0).max(100).optional(),
  taxonomyAlignedRevenuePct: z.number().int().min(0).max(100).optional(),
  
  technicalScreeningCriteria: z.string().optional(),
  dnsh_status: DNSHStatusSchema.optional(),
  social_safeguards_status: SocialSafeguardsStatusSchema.optional(),
  
  taxonomyEligibleCapexPct: z.number().int().min(0).max(100).optional(),
  taxonomyAlignedCapexPct: z.number().int().min(0).max(100).optional(),
  taxonomyAlignedOpexPct: z.number().int().min(0).max(100).optional(),
});

export const EUTaxonomyUpdateSchema = z.object({
  reportingPeriod: z.coerce.date().optional(),
  updatedBy: z.string().uuid().optional(),
  status: DataStatusSchema.optional(),
  
  economicActivities: z.string().optional(),
  taxonomyEligibleRevenuePct: z.number().int().min(0).max(100).optional(),
  taxonomyAlignedRevenuePct: z.number().int().min(0).max(100).optional(),
  
  technicalScreeningCriteria: z.string().optional(),
  dnsh_status: DNSHStatusSchema.optional(),
  social_safeguards_status: SocialSafeguardsStatusSchema.optional(),
  
  taxonomyEligibleCapexPct: z.number().int().min(0).max(100).optional(),
  taxonomyAlignedCapexPct: z.number().int().min(0).max(100).optional(),
  taxonomyAlignedOpexPct: z.number().int().min(0).max(100).optional(),
});

// --- Assurance Schemas ---
export const AssuranceCreateSchema = z.object({
  companyId: z.string().uuid("Invalid company ID"),
  reportingPeriod: z.coerce.date(),
  createdBy: z.string().uuid().optional(),
  status: DataStatusSchema.default("DRAFT"),
  
  assuranceProvider: z.string().max(255).optional(),
  scopeOfAssurance: AssuranceScopeSchema.optional(),
  reportingStandards: z.string().max(255).optional(),
  assuranceConclusionSummary: z.string().optional(),
  
  assuranceReportUrl: z.string().url().optional(),
  assuranceReportFilename: z.string().max(255).optional(),
  assuranceReportMime: z.string().max(100).optional(),
  assuranceReportSizeBytes: z.number().int().positive().optional(),
  
  materialMisstatementsIdentified: z.string().optional(),
  managementResponse: z.string().optional(),
  
  checklist_data_collection_documented: z.boolean().default(false),
  checklist_internal_controls_tested: z.boolean().default(false),
  checklist_source_documentation_trail: z.boolean().default(false),
  checklist_calculation_method_validated: z.boolean().default(false),
});

export const AssuranceUpdateSchema = z.object({
  reportingPeriod: z.coerce.date().optional(),
  updatedBy: z.string().uuid().optional(),
  status: DataStatusSchema.optional(),
  
  assuranceProvider: z.string().max(255).optional(),
  scopeOfAssurance: AssuranceScopeSchema.optional(),
  reportingStandards: z.string().max(255).optional(),
  assuranceConclusionSummary: z.string().optional(),
  
  assuranceReportUrl: z.string().url().optional(),
  assuranceReportFilename: z.string().max(255).optional(),
  assuranceReportMime: z.string().max(100).optional(),
  assuranceReportSizeBytes: z.number().int().positive().optional(),
  
  materialMisstatementsIdentified: z.string().optional(),
  managementResponse: z.string().optional(),
  
  checklist_data_collection_documented: z.boolean().optional(),
  checklist_internal_controls_tested: z.boolean().optional(),
  checklist_source_documentation_trail: z.boolean().optional(),
  checklist_calculation_method_validated: z.boolean().optional(),
});

// --- Query/Filter Schemas ---
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const DateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
}).refine(
  (data) => !data.startDate || !data.endDate || data.startDate <= data.endDate,
  {
    message: "Start date must be before or equal to end date",
  }
);

// --- Type exports ---
export type DataStatus = z.infer<typeof DataStatusSchema>;
export type DNSHStatus = z.infer<typeof DNSHStatusSchema>;
export type SocialSafeguardsStatus = z.infer<typeof SocialSafeguardsStatusSchema>;
export type AssuranceScope = z.infer<typeof AssuranceScopeSchema>;

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export type CompanyCreate = z.infer<typeof CompanyCreateSchema>;
export type CompanyUpdate = z.infer<typeof CompanyUpdateSchema>;

export type SiteCreate = z.infer<typeof SiteCreateSchema>;
export type SiteUpdate = z.infer<typeof SiteUpdateSchema>;

export type EnergyActivityCreate = z.infer<typeof EnergyActivityCreateSchema>;
export type EnergyActivityUpdate = z.infer<typeof EnergyActivityUpdateSchema>;

export type FuelActivityCreate = z.infer<typeof FuelActivityCreateSchema>;
export type FuelActivityUpdate = z.infer<typeof FuelActivityUpdateSchema>;

export type EmissionRecordCreate = z.infer<typeof EmissionRecordCreateSchema>;

export type EmissionFactorCreate = z.infer<typeof EmissionFactorCreateSchema>;
export type EmissionFactorUpdate = z.infer<typeof EmissionFactorUpdateSchema>;

export type Esrs2GeneralDisclosuresCreate = z.infer<typeof Esrs2GeneralDisclosuresCreateSchema>;
export type Esrs2GeneralDisclosuresUpdate = z.infer<typeof Esrs2GeneralDisclosuresUpdateSchema>;

export type EnvironmentalTopicsCreate = z.infer<typeof EnvironmentalTopicsCreateSchema>;
export type EnvironmentalTopicsUpdate = z.infer<typeof EnvironmentalTopicsUpdateSchema>;

export type SocialTopicsCreate = z.infer<typeof SocialTopicsCreateSchema>;
export type SocialTopicsUpdate = z.infer<typeof SocialTopicsUpdateSchema>;

export type SGovernanceCreate = z.infer<typeof SGovernanceCreateSchema>;
export type SGovernanceUpdate = z.infer<typeof SGovernanceUpdateSchema>;

export type EUTaxonomyCreate = z.infer<typeof EUTaxonomyCreateSchema>;
export type EUTaxonomyUpdate = z.infer<typeof EUTaxonomyUpdateSchema>;

export type AssuranceCreate = z.infer<typeof AssuranceCreateSchema>;
export type AssuranceUpdate = z.infer<typeof AssuranceUpdateSchema>;

export type Pagination = z.infer<typeof PaginationSchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;