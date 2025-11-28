'use client';

import { ReactNode } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

/**
 * RoleCard Component Props
 */
interface RoleCardProps {
  /** Role name (admin, author, consumer) */
  role: string;
  /** Role description */
  description?: string;
  /** Array of permission strings */
  permissions?: string[];
  /** Icon component or emoji */
  icon?: ReactNode;
}

/**
 * RoleCard Component
 * 
 * Display role information with permissions and capabilities.
 * Used to show role-specific features and access levels.
 */
export default function RoleCard({ role, description, permissions = [], icon }: RoleCardProps) {
  const getRoleColor = (roleName: string): 'blue' | 'purple' | 'green' | 'gray' => {
    const colors: Record<string, 'blue' | 'purple' | 'green'> = {
      admin: 'blue',
      author: 'purple',
      consumer: 'green',
    };
    return colors[roleName?.toLowerCase()] || 'gray';
  };

  const roleColor = getRoleColor(role);

  return (
    <Card interactive>
      <div className="flex items-start space-x-4">
        {/* Icon */}
        {icon && (
          <div
            className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
              roleColor === 'blue'
                ? 'bg-blue-50'
                : roleColor === 'purple'
                ? 'bg-purple-50'
                : roleColor === 'green'
                ? 'bg-green-50'
                : 'bg-gray-50'
            }`}
          >
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{role}</h3>
            <Badge variant={roleColor} size="sm">
              Current Role
            </Badge>
          </div>

          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}

          {/* Permissions List */}
          {permissions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2">
                Permissions
              </h4>
              <ul className="space-y-2">
                {permissions.map((permission, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * RoleCardGrid Component Props
 */
interface RoleData {
  role: string;
  icon?: ReactNode;
  description: string;
  permissions: string[];
}

interface RoleCardGridProps {
  /** Array of role objects */
  roles?: RoleData[];
}

/**
 * RoleCardGrid Component
 * Display multiple role cards in a responsive grid.
 */
export function RoleCardGrid({ roles = [] }: RoleCardGridProps) {
  const defaultRoles: RoleData[] = [
    {
      role: 'admin',
      icon: '👑',
      description: 'Full system access with all administrative privileges',
      permissions: [
        'Manage all users and roles',
        'Access admin dashboard',
        'Configure system settings',
        'View all analytics and reports',
        'Manage content and permissions',
      ],
    },
    {
      role: 'author',
      icon: '✍️',
      description: 'Create and manage content with publishing capabilities',
      permissions: [
        'Create and edit content',
        'Publish articles',
        'Manage own profile',
        'View author analytics',
        'Collaborate with other authors',
      ],
    },
    {
      role: 'consumer',
      icon: '👤',
      description: 'Standard user access with content viewing capabilities',
      permissions: [
        'View published content',
        'Manage personal profile',
        'Save favorite items',
        'Access consumer dashboard',
        'Receive notifications',
      ],
    },
  ];

  const rolesToDisplay = roles.length > 0 ? roles : defaultRoles;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {rolesToDisplay.map((roleData, index) => (
        <RoleCard key={index} {...roleData} />
      ))}
    </div>
  );
}
