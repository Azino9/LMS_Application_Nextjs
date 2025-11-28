'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SignOutButton from '@/components/auth/SignOutButton';

/**
 * Admin Dashboard Page
 * 
 * Purpose: Protected dashboard for administrators
 * Features: System management, user oversight, analytics, administrative tools
 * Protection: Automatic redirect to login if not authenticated or wrong role
 */

export default function AdminDashboard() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    console.log('Admin Dashboard useEffect - Status:', status, 'Session:', session?.user);
    
    if (status === 'loading') {
      console.log('🔄 Session still loading...');
      return; // Still loading session
    }
    
    // If no session after loading is complete, try to refresh once
    if (!session) {
      console.log('❌ No session found after loading');
      update().then((refreshedSession) => {
        console.log('🔄 Refreshed session:', refreshedSession);
        if (!refreshedSession) {
          console.log('❌ Still no session after refresh, redirecting to login');
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        }
      });
      return;
    }
    
    // Check if user has admin role
    if (session.user?.role && session.user.role !== 'admin') {
      console.log('❌ Access denied: User is not an admin, redirecting to appropriate dashboard');
      // Redirect to appropriate dashboard based on role
      if (session.user?.role === 'student') {
        router.push('/student_dashboard');
      } else if (session.user?.role === 'consumer') {
        router.push('/consumer');
      } else {
        router.push('/login');
      }
      return;
    }
    
    if (session.user?.role === 'admin') {
      console.log('✅ Admin dashboard access granted for:', session.user?.email);
    }
  }, [session, status, router, update]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'courses', name: 'Course Management', icon: '📚' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'System Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Control Panel</h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">
                    {session.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name?.split(' ')[0] || 'Admin'}! 👋
          </h2>
          <p className="text-lg text-gray-600">
            Manage your platform with comprehensive administrative tools and insights.
          </p>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">2,847</p>
                    <p className="text-xs text-green-600 mt-1">↗ +12% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-3xl font-bold text-gray-900">156</p>
                    <p className="text-xs text-green-600 mt-1">↗ +8% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">$89,421</p>
                    <p className="text-xs text-red-600 mt-1">↘ -3% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Load</p>
                    <p className="text-3xl font-bold text-gray-900">23%</p>
                    <p className="text-xs text-green-600 mt-1">Optimal performance</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent System Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { type: 'user', title: 'New user registration: john.doe@university.edu', time: '5 minutes ago', color: 'blue' },
                        { type: 'course', title: 'Course "Advanced Mathematics" updated by Prof. Smith', time: '1 hour ago', color: 'green' },
                        { type: 'system', title: 'Database backup completed successfully', time: '2 hours ago', color: 'purple' },
                        { type: 'alert', title: 'High server load detected and resolved', time: '4 hours ago', color: 'orange' },
                        { type: 'security', title: 'Security scan completed - no issues found', time: '6 hours ago', color: 'green' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.color === 'blue' ? 'bg-blue-500' :
                            activity.color === 'green' ? 'bg-green-500' :
                            activity.color === 'purple' ? 'bg-purple-500' :
                            'bg-orange-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {[
                      { icon: '👥', title: 'Manage Users', description: 'Add, edit, or remove user accounts' },
                      { icon: '📚', title: 'Create Course', description: 'Set up new courses and curriculum' },
                      { icon: '📊', title: 'View Reports', description: 'Generate system and usage reports' },
                      { icon: '🔧', title: 'System Settings', description: 'Configure platform settings' },
                    ].map((action, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{action.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                              {action.title}
                            </p>
                            <p className="text-xs text-gray-500">{action.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { name: 'Database', status: 'Healthy', percentage: 98 },
                      { name: 'API Services', status: 'Healthy', percentage: 95 },
                      { name: 'File Storage', status: 'Healthy', percentage: 87 },
                    ].map((service, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900">{service.name}</span>
                          <span className="text-green-600">{service.status}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content placeholders */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">👥 User Management</h3>
            <p className="text-gray-600 mb-6">Comprehensive user management tools and analytics.</p>
            <div className="text-gray-500">User management interface coming soon...</div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📚 Course Management</h3>
            <p className="text-gray-600 mb-6">Create, edit, and manage course content and structure.</p>
            <div className="text-gray-500">Course management interface coming soon...</div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Analytics</h3>
            <p className="text-gray-600 mb-6">Detailed analytics and performance insights.</p>
            <div className="text-gray-500">Analytics dashboard coming soon...</div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">⚙️ System Settings</h3>
            <p className="text-gray-600 mb-6">Configure system preferences and platform settings.</p>
            <div className="text-gray-500">Settings panel coming soon...</div>
          </div>
        )}
      </main>
    </div>
  );
}