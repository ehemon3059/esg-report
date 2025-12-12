//**File:** `src/validations/company.ts`

//```typescript

import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(2).max(200),
  legal_entity: z.string().min(1),
  industry: z.string().min(1),
  country_of_registration: z.string().default('Germany'),
});

export type CompanyInput = z.infer<typeof companySchema>;