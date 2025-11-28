'use client';

import { useSession } from 'next-auth/react';

/**
 * ProtectedButton Component
 * 
 * A reusable component that only renders for users with admin role
 * Demonstrates role-based UI rendering
 * Can be placed anywhere in the application
 * 
 * Usage:
 * <ProtectedButton />
 */
export default function ProtectedButton() {
  const { data: session, status } = useSession();

  // Don't show anything while loading session
  if (status === 'loading') {
    return null;
  }

  // Only render if user is authenticated AND has admin role
  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }

  // Render admin-only button
  return (
    <div className="inline-flex items-center">
      <button className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>Admin Controls</span>
      </button>
    </div>
  );
}
