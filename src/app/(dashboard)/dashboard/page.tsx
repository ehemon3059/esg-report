//## 3.4 Create Dashboard Home Page

//**File:** `src/app/(dashboard)/dashboard/page.tsx`

//```typescript
'use client';

import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ userCount: 0 });

  useEffect(() => {
    // Fetch stats (we'll implement this API later)
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setStats({ userCount: data.data.total || 0 });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-2 text-gray-600">{user?.company.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-4xl">👥</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Team Members
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.userCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <a href="/dashboard/users" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all →
            </a>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg opacity-50">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-4xl">📄</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Reports
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <span className="text-sm text-gray-500">Phase 4</span>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg opacity-50">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-4xl">🏭</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Sites
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <span className="text-sm text-gray-500">Phase 2</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <a
              href="/dashboard/users"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500"
            >
              <span className="mr-3 text-2xl">➕</span>
              <span className="font-medium">Invite Team Member</span>
            </a>
          )}
          <a
            href="/dashboard/company"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500"
          >
            <span className="mr-3 text-2xl">⚙️</span>
            <span className="font-medium">Company Settings</span>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="flow-root">
          <ul className="-mb-8">
            <li>
              <div className="relative pb-8">
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                      ✓
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{user?.name}</span>
                        {' '}logged in
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}