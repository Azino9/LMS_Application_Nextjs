'use client';

import React from 'react';

/**
 * Avatar Component Props
 */
interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** User name (used for initials fallback) */
  name?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Alt text for image */
  alt?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Avatar Component
 * 
 * A reusable avatar component for displaying user profile pictures or initials.
 * Falls back to user initials when no image is provided.
 * 
 * @example
 * ```tsx
 * <Avatar name="John Doe" size="md" />
 * <Avatar src="/images/user.jpg" name="John Doe" size="lg" />
 * ```
 */
export default function Avatar({
  src,
  name,
  size = 'md',
  alt,
  className = '',
}: AvatarProps) {
  // Size styles
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const sizeClasses = sizes[size];

  // Get initials from name
  const getInitials = (name?: string): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  const baseStyles = 'rounded-full flex items-center justify-center font-semibold';
  const bgColors = 'bg-linear-to-br from-blue-500 to-blue-700 text-white';

  if (src) {
    return (
      <div className={`${baseStyles} ${sizeClasses} overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || name || 'User avatar'}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${baseStyles} ${bgColors} ${sizeClasses} ${className}`}>
      <span>{initials}</span>
    </div>
  );
}

/**
 * AvatarGroup Component Props
 */
interface User {
  /** User name */
  name: string;
  /** User image URL */
  image?: string;
}

interface AvatarGroupProps {
  /** Array of users */
  users: User[];
  /** Maximum avatars to display */
  max?: number;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

/**
 * AvatarGroup Component
 * Display multiple avatars in a group with overlap
 */
export function AvatarGroup({ users, max = 3, size = 'md', className = '' }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayUsers.map((user, index) => (
        <div key={index} className="ring-2 ring-white">
          <Avatar src={user.image} name={user.name} size={size} alt={user.name} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold ring-2 ring-white`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
