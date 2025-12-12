'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">ESG Platform</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.name}</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {user.role}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
          <nav className="mt-5 px-2 space-y-1">
            <Link
              href="/dashboard"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/dashboard')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3">🏠</span>
              Dashboard
            </Link>
            
            <Link
              href="/dashboard/company"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/dashboard/company')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3">🏢</span>
              Company
            </Link>
            
            {(user.role === 'admin' || user.role === 'manager') && (
              <Link
                href="/dashboard/users"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/users')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">👥</span>
                Users
              </Link>
            )}
            
            <Link
              href="/dashboard/profile"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/dashboard/profile')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3">👤</span>
              Profile
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
// ```

// ---

// ## Fix 3: Verify Your Folder Structure is Correct

// Your folder structure should look like this:
// ```
// src/
// ├── app/
// │   ├── (auth)/
// │   │   ├── layout.tsx
// │   │   ├── login/
// │   │   │   └── page.tsx
// │   │   └── register/
// │   │       └── page.tsx
// │   │
// │   ├── (dashboard)/
// │   │   ├── layout.tsx
// │   │   ├── dashboard/
// │   │   │   └── page.tsx
// │   │   ├── company/
// │   │   │   ├── page.tsx
// │   │   │   └── edit/
// │   │   │       └── page.tsx
// │   │   ├── users/
// │   │   │   └── page.tsx
// │   │   └── profile/
// │   │       └── page.tsx
// │   │
// │   ├── api/
// │   │   ├── auth/
// │   │   │   ├── login/
// │   │   │   │   └── route.ts
// │   │   │   ├── register/
// │   │   │   │   └── route.ts
// │   │   │   ├── session/
// │   │   │   │   └── route.ts
// │   │   │   └── logout/
// │   │   │       └── route.ts
// │   │   ├── companies/
// │   │   │   └── [id]/
// │   │   │       └── route.ts
// │   │   └── users/
// │   │       ├── route.ts
// │   │       ├── invite/
// │   │       │   └── route.ts
// │   │       └── [id]/
// │   │           └── route.ts
// │   │
// │   ├── layout.tsx
// │   ├── page.tsx
// │   └── globals.css
// │
// ├── context/
// │   └── AuthContext.tsx
// │
// └── lib/
//     ├── prisma.ts
//     ├── auth.ts
//     └── utils.ts