//## 2.6 Create API Route for Logout

//**File:** `src/app/api/auth/logout/route.ts`

//```typescript
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ data: { message: 'Logged out successfully' } });
  
  // Clear session cookie
  response.cookies.delete('session');
  
  return response;
}