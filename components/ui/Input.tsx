'use client';

import React, { InputHTMLAttributes } from 'react';

/**
 * Input Component Props
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number';
}

/**
 * Input Component
 * 
 * A reusable input field component with label, error handling, and validation states.
 * Supports various input types and displays error messages with visual feedback.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={emailError}
 * />
 * ```
 */
export default function Input({
  label,
  error,
  type = 'text',
  className = '',
  required = false,
  disabled = false,
  ...props
}: InputProps) {
  const inputClasses = `
    w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:bg-gray-100 disabled:cursor-not-allowed
    transition-colors duration-200
    ${error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && (
        <div className="mt-1.5 flex items-center space-x-1">
          <svg
            className="w-4 h-4 text-red-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
