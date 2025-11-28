'use client';

import React, { ReactNode } from 'react';

/**
 * Card Component Props
 */
interface CardProps {
  /** Card header content */
  header?: ReactNode;
  /** Card footer content */
  footer?: ReactNode;
  /** Enable interactive/clickable state */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Card content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card Component
 * 
 * A versatile container component for grouping related content.
 * Supports optional header and footer sections, and interactive (clickable) mode.
 * 
 * @example
 * ```tsx
 * <Card header="Card Title" footer={<Button>Action</Button>}>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export default function Card({
  header,
  footer,
  interactive = false,
  onClick,
  children,
  className = '',
}: CardProps) {
  const baseStyles = 'bg-white rounded-xl border border-gray-200 overflow-hidden';
  const interactiveStyles = interactive
    ? 'cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-200'
    : '';

  const cardClasses = `${baseStyles} ${interactiveStyles} ${className}`;

  const handleClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  return (
    <div className={cardClasses} onClick={handleClick} role={interactive ? 'button' : undefined}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {typeof header === 'string' ? (
            <h3 className="text-lg font-semibold text-gray-900">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>
      )}
    </div>
  );
}

/**
 * CardHeader Component
 * Standalone header component for more control
 */
export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardBody Component
 * Standalone body component for more control
 */
export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
