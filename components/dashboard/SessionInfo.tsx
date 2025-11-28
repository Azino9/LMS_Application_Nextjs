'use client';

import { useSession } from 'next-auth/react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

/**
 * SessionInfo Component Props
 */
interface SessionInfoProps {
  /** Show session status indicator */
  showStatus?: boolean;
  /** Show login time */
  showLoginTime?: boolean;
}

/**
 * SessionInfo Component
 * 
 * Display current user session information including:
 * - User avatar and name
 * - Role badge
 * - Email
 * - Session status
 * - Login time (optional)
 */
export default function SessionInfo({ showStatus = true, showLoginTime = false }: SessionInfoProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <SessionInfoSkeleton />;
  }

  if (!session || status !== 'authenticated') {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500">No active session</p>
        </div>
      </Card>
    );
  }

  const user = session.user;

  return (
    <Card>
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <Avatar name={user?.name || undefined} size="lg" />

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 capitalize truncate">
              {user?.name}
            </h3>
            {showStatus && (
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">Active</span>
              </span>
            )}
          </div>

          {/* Email */}
          <p className="text-sm text-gray-600 mb-3 truncate">{user?.email}</p>

          {/* Role Badge */}
          <Badge
            variant={
              user?.role === 'admin'
                ? 'blue'
                : user?.role === 'author'
                ? 'purple'
                : 'green'
            }
            size="md"
          >
            {user?.role}
          </Badge>

          {/* Login Time (optional) */}
          {showLoginTime && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Session started: {new Date().toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Session Details */}
      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">User ID</p>
          <p className="text-sm font-medium text-gray-900">{user?.id || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Role</p>
          <p className="text-sm font-medium text-gray-900 capitalize">{user?.role || 'N/A'}</p>
        </div>
      </div>
    </Card>
  );
}

/**
 * SessionInfoSkeleton Component
 * Loading skeleton for SessionInfo
 */
export function SessionInfoSkeleton() {
  return (
    <Card>
      <div className="flex items-start space-x-4 animate-pulse">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="bg-gray-200 rounded h-5 w-32 mb-2"></div>
          <div className="bg-gray-200 rounded h-4 w-48 mb-3"></div>
          <div className="bg-gray-200 rounded h-6 w-20"></div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
        <div>
          <div className="bg-gray-200 rounded h-3 w-16 mb-2"></div>
          <div className="bg-gray-200 rounded h-4 w-24"></div>
        </div>
        <div>
          <div className="bg-gray-200 rounded h-3 w-16 mb-2"></div>
          <div className="bg-gray-200 rounded h-4 w-20"></div>
        </div>
      </div>
    </Card>
  );
}
