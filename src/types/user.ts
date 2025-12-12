//**File:** `src/types/user.ts`

//```typescript
export type UserRole = 'admin' | 'manager' | 'auditor' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithCompany extends User {
  company: {
    id: string;
    name: string;
  };
}