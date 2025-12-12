//**File:** `src/validations/user.ts`

//```typescript

import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'manager', 'auditor', 'user']),
});

export const inviteUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'manager', 'auditor', 'user']),
});

export type UserInput = z.infer<typeof userSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;