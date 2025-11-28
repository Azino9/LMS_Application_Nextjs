'use client';

import { ReactNode } from 'react';

/**
 * StatsCard Component Props
 */
interface StatsCardProps {
  /** Card title (e.g., "Total Users") */
  title: string;
  /** Main statistic value */
  value: string | number;
  /** Icon component */
  icon?: ReactNode;
  /** Trend indicator (e.g., "+12.5%") */
  trend?: string;
  /** Whether trend is positive (green) or negative (red) */
  trendUp?: boolean;
  /** Background color class */
  bgColor?: string;
  /** Icon color class */
  iconColor?: string;
}

/**
 * StatsCard Component
 * 
 * Display statistical data with icon, title, value, and optional trend.
 * Used in dashboard overview sections.
 */
export default function StatsCard({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  bgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className={`${bgColor} rounded-lg p-3`}>
          <div className={`${iconColor} w-6 h-6`}>
            {icon || (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Trend Badge (optional) */}
        {trend && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trendUp
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {trendUp ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              )}
            </svg>
            <span>{trend}</span>
          </div>
        )}
      </div>

      {/* Stats Content */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
    </div>
  );
}

/**
 * StatsCardSkeleton Component
 * Loading skeleton for StatsCard
 */
export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="bg-gray-200 rounded-lg p-3 w-12 h-12"></div>
        <div className="bg-gray-200 rounded-full w-16 h-6"></div>
      </div>
      <div className="mt-4">
        <div className="bg-gray-200 rounded h-4 w-24 mb-3"></div>
        <div className="bg-gray-200 rounded h-8 w-32"></div>
      </div>
    </div>
  );
}
