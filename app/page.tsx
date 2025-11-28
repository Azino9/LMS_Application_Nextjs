'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProtectedButton from '@/components/ProtectedButton';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">NextAuth App</h1>
            <div className="flex items-center space-x-4">
              {status === 'loading' ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : session ? (
                <>
                  <span className="text-sm text-gray-600">
                    Hello, <span className="font-semibold capitalize">{session.user.name}</span>
                  </span>
                  <button
                    onClick={() => router.push('/login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    View Dashboard
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NextAuth Multi-Role App
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A demonstration of role-based authentication with protected routes and client-side routing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Authentication</h3>
            <p className="text-sm text-gray-600">JWT-based authentication with NextAuth</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Role-Based Access</h3>
            <p className="text-sm text-gray-600">Different dashboards for different roles</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Protected Routes</h3>
            <p className="text-sm text-gray-600">Client-side route protection with redirects</p>
          </div>
        </div>

        {/* Admin-Only Button Demo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role-Based UI Component</h3>
          <p className="text-sm text-gray-600 mb-6">
            The button below only appears for users with admin role
          </p>
          <ProtectedButton />
          {(!session || session.user.role !== 'admin') && (
            <p className="text-sm text-gray-500 mt-4 italic">
              (Sign in as admin to see the protected button)
            </p>
          )}
        </div>

        {/* Test Credentials */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Test Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-900 mb-2">Admin</p>
              <p className="text-sm text-gray-700">admin@example.com</p>
              <p className="text-sm text-gray-700">adminpass</p>
              <p className="text-xs text-gray-500 mt-2">Access: /dashboard</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-900 mb-2">Author</p>
              <p className="text-sm text-gray-700">author@example.com</p>
              <p className="text-sm text-gray-700">authorpass</p>
              <p className="text-xs text-gray-500 mt-2">Access: Limited</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-900 mb-2">Consumer</p>
              <p className="text-sm text-gray-700">consumer@example.com</p>
              <p className="text-sm text-gray-700">consumerpass</p>
              <p className="text-xs text-gray-500 mt-2">Access: /consumer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
