//**File:** `src/types/company.ts`

//```typescript
export interface Company {
  id: string;
  name: string;
  legal_entity: string;
  industry: string;
  country_of_registration: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date | null;
}

export interface CompanyWithStats extends Company {
  userCount: number;
}