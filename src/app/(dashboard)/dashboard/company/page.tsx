'use client';

import { useAuth } from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '../../../../lib/utils';
import Link from 'next/link';

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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // Wait for auth to load first
    if (authLoading) {
      console.log('Auth still loading...');
      return () => {
        mounted = false;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    // Check if user exists
    if (!user) {
      console.log('No user found');
      // schedule state updates to avoid synchronous setState in effect
      timeoutId = setTimeout(() => {
        if (!mounted) return;
        setError('User not authenticated');
        setLoading(false);
      }, 0);

      return () => {
        mounted = false;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    // Debug: Log the entire user object to see its structure
    console.log('==== USER OBJECT ====');
    console.log('Full user:', JSON.stringify(user, null, 2));
    console.log('user.companyId:', user.companyId);
    console.log('user.company:', user.company);
    console.log('user.company?.id:', user.company?.id);
    console.log('===================');

    // Get company ID from either user.companyId or user.company.id
    const companyId = user.companyId || user.company?.id;

    if (!companyId) {
      console.log('No company ID found');
      // schedule state updates to avoid synchronous setState in effect
      timeoutId = setTimeout(() => {
        if (!mounted) return;
        setError('No company associated with this user');
        setLoading(false);
      }, 0);

      return () => {
        mounted = false;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    console.log('Fetching company with ID:', companyId);

    // Fetch company data
    fetch(`/api/companies/${companyId}`)
      .then(res => {
        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);
        
        if (!res.ok) {
          // Try to get error details
          return res.json().then(errData => {
            console.error('Error response:', errData);
            throw new Error(errData.error?.message || `HTTP error! status: ${res.status}`);
          }).catch(jsonErr => {
            // If JSON parsing fails, throw generic error
            throw new Error(`HTTP error! status: ${res.status}`);
          });
        }
        return res.json();
      })
      .then(data => {
        console.log('Company data received:', data);
        if (data.data) {
          if (!mounted) return;
          setCompany(data.data);
          setError(null);
        } else {
          console.error('No data in response:', data);
          if (!mounted) return;
          setError('Company data not found in response');
        }
      })
      .catch(err => {
        console.error('Error fetching company:', err);
        if (!mounted) return;
        setError(err.message || 'Failed to load company data');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, authLoading]);

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Company
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="mt-4 p-4 bg-gray-50 rounded text-left">
            <p className="text-sm text-gray-700 font-medium mb-2">Debug Information:</p>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify({
                hasUser: !!user,
                userEmail: user?.email,
                companyId: user?.companyId,
                companyFromUser: user?.company,
              }, null, 2)}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show company not found
  if (!company) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Company Not Found
          </h2>
          <p className="text-gray-600">
            The company information could not be retrieved.
          </p>
        </div>
      </div>
    );
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
          <Link
            href="/dashboard/users"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all users →
          </Link>
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