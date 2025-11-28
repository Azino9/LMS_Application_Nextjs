'use client';

import React, { ReactNode } from 'react';

/**
 * Badge Component Props
 */
interface BadgeProps {
  /** Badge color variant */
  variant?: 'blue' | 'green' | 'purple' | 'gray' | 'red' | 'yellow' | 'emerald';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Badge Component
 * 
 * A reusable badge/pill component for displaying status, roles, or labels.
 * Supports multiple color variants and sizes for different use cases.
 * 
 * @example
 * ```tsx
 * <Badge variant="blue" size="md">Admin</Badge>
 * <Badge variant="green" size="sm">Active</Badge>
 * ```
 */
export default function Badge({
  variant = 'gray',
  size = 'md',
  children,
  className = '',
}: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-full whitespace-nowrap';

  // Variant styles (background and text color)
  const variants = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    emerald: 'bg-emerald-100 text-emerald-800',
  };

  // Size styles
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const badgeClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return <span className={badgeClasses}>{children}</span>;
}

/**
 * RoleBadge Component Props
 */
interface RoleBadgeProps {
  /** User role */
  role: 'admin' | 'author' | 'consumer' | string;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * RoleBadge Component
 * Pre-configured badge for user roles with role-specific colors
 */
export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const roleConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    admin: { variant: 'blue', label: 'Admin' },
    author: { variant: 'purple', label: 'Author' },
    consumer: { variant: 'green', label: 'Consumer' },
  };

  const config = roleConfig[role?.toLowerCase()] || { variant: 'gray', label: role };

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
}

/**
 * StatusBadge Component Props
 */
interface StatusBadgeProps {
  /** Status type */
  status: 'active' | 'inactive' | 'pending' | 'error' | string;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * StatusBadge Component
 * Pre-configured badge for status indicators
 */
export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    active: { variant: 'green', label: 'Active' },
    inactive: { variant: 'gray', label: 'Inactive' },
    pending: { variant: 'yellow', label: 'Pending' },
    error: { variant: 'red', label: 'Error' },
  };

  const config = statusConfig[status?.toLowerCase()] || { variant: 'gray', label: status };

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
}
