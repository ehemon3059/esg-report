//## 4.2 Create Company Profile Page

//**File:** `src/app/(dashboard)/company/page.tsx`

//```typescript
'use client';

import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '../../../lib/utils';

interface Company {
  id: string;
  name: string;
  legal_entity: string;
  industry: string;
  country_of_registration: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  creator?: { name: string };
  updater?: { name: string };
}

export default function CompanyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.companyId) {
      fetch(`/api/companies/${user.companyId}`)
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            setCompany(data.data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  const canEdit = user?.role === 'admin' || user?.role === 'manager';

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          {canEdit && (
            <button
              onClick={() => router.push('/dashboard/company/edit')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Company Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{company.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Legal Entity</dt>
            <dd className="mt-1 text-sm text-gray-900">{company.legal_entity}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Industry</dt>
            <dd className="mt-1 text-sm text-gray-900">{company.industry}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Country</dt>
            <dd className="mt-1 text-sm text-gray-900">{company.country_of_registration}</dd>
          </div>
        </dl>
      </div>

      {/* Team Overview */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Team Overview</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Users</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{company.userCount}</dd>
          </div>
        </div>
        <div className="mt-6">
          <a
            href="/dashboard/users"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all users →
          </a>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Audit Trail</h2>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(company.createdAt)}
              {company.creator && ` by ${company.creator.name}`}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(company.updatedAt)}
              {company.updater && ` by ${company.updater.name}`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}