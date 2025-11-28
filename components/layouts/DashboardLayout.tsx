'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * DashboardLayout Component Props
 */
interface DashboardLayoutProps {
  /** Page content to render */
  children: ReactNode;
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Maximum content width */
  maxWidth?: string;
  /** Show footer */
  showFooter?: boolean;
}

/**
 * DashboardLayout Component
 * 
 * Protected layout wrapper for dashboard pages.
 * Provides consistent navigation, footer, and content area.
 * Automatically redirects unauthenticated users to login.
 */
export default function DashboardLayout({
  children,
  title,
  description,
  maxWidth = '7xl',
  showFooter = true,
}: DashboardLayoutProps) {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Don't render content if not authenticated (will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <div className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
          {/* Page Header */}
          {(title || description) && (
            <div className="mb-8">
              {title && (
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              )}
              {description && (
                <p className="text-gray-600">{description}</p>
              )}
            </div>
          )}

          {/* Page Content */}
          <div>{children}</div>
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer minimal />}
    </div>
  );
}
