import React, { ReactNode } from 'react';
import SignOutButton from '@/components/auth/SignOutButton';

interface SidebarProps {
  role: 'admin' | 'student' | string;
  children?: ReactNode;
}

const Sidebar = ({ role, children }: SidebarProps) => {
  let links: ReactNode = null;

  if (role === 'admin') {
    links = (
      <>
        <a href="/admin_dashboard" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Dashboard
        </a>
        <a href="/edit-lesson" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Edit Lessons
        </a>
        <a href="/manage-students" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Manage Users
        </a>
        <a href="/settings" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Settings
        </a>
      </>
    );
  } else if (role === 'student') {
    links = (
      <>
        <a href="/student_dashboard" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-black transition-all">
          Dashboard
        </a>
        <a href="/courses" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          My Courses
        </a>
        <a href="/grades" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Grades
        </a>
        <a href="/assignments" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Assignments
        </a>
        <a href="/profile" className="py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 border-l-2 border-transparent hover:border-black transition-all">
          Profile
        </a>
      </>
    );
  }

  if (!links) return null;

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200 hidden md:block">
      <div className="p-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Navigation</p>
        <nav className="flex flex-col">
          {links}
        </nav>
        
        {/* Logout Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="px-4">
            <SignOutButton />
          </div>
        </div>
      </div>
      {children}
    </aside>
  );
};

export default Sidebar;
