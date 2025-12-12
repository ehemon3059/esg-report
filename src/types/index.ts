//**File:** `src/types/index.ts`

//```typescript

export * from './user';
export * from './company';

export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}