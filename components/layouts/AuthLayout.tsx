'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Footer from './Footer';

/**
 * AuthLayout Component Props
 */
interface AuthLayoutProps {
  /** Form content to render */
  children: ReactNode;
  /** Form title (e.g., "Sign In", "Create Account") */
  title?: string;
  /** Form subtitle/description */
  subtitle?: string;
}

/**
 * AuthLayout Component
 * 
 * Layout wrapper for authentication pages (login, register).
 * Redirects authenticated users to dashboard.
 * Provides centered card with logo and form container.
 */
export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // Don't render auth forms if already authenticated (will redirect)
  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Logo Header */}
      <div className="p-4 sm:p-6">
        <Link href="/" className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">NA</span>
          </div>
          <span className="text-xl font-bold text-gray-900">NextAuth</span>
        </Link>
      </div>

      {/* Main Content - Centered Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              {title && (
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-gray-600 text-sm">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            <div>{children}</div>
          </div>

          {/* Additional Info */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer minimal />
    </div>
  );
}
