"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '../layout/main-layout';
import Sidebar from '../layout/sidebar';
import Navbar from '../layout/navbar';

const StudentDashboardPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
  <MainLayout sidebar={<Sidebar role="student" />} navbar={<Navbar />}>
    <div className="min-h-screen bg-white px-8 py-12 max-w-7xl mx-auto">
      
      {/* Minimal Header */}
      <div className="mb-16 flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Dashboard</p>
          <h1 className="text-5xl font-extralight text-black tracking-tight">Mohit Samal</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 text-sm text-black border border-gray-200 hover:bg-gray-50 transition-colors font-light"
        >
          Logout
        </button>
      </div>

      {/* Stats - Ultra Minimal */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 mb-16 border border-gray-200">
        <div className="bg-white p-10">
          <p className="text-sm text-gray-400 mb-2">Enrolled</p>
          <p className="text-4xl font-extralight text-black">5</p>
        </div>
        <div className="bg-white p-10">
          <p className="text-sm text-gray-400 mb-2">Active</p>
          <p className="text-4xl font-extralight text-black">3</p>
        </div>
        <div className="bg-white p-10">
          <p className="text-sm text-gray-400 mb-2">Completed</p>
          <p className="text-4xl font-extralight text-black">2</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-16">
        
        {/* Left - Grades */}
        <div className="col-span-2">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8">Recent Performance</h2>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between py-6 border-b border-gray-100">
              <div>
                <p className="text-lg text-black mb-1">Mathematics</p>
                <p className="text-sm text-gray-400">Final Examination</p>
              </div>
              <p className="text-3xl font-extralight text-black">A</p>
            </div>

            <div className="flex items-center justify-between py-6 border-b border-gray-100">
              <div>
                <p className="text-lg text-black mb-1">Physics</p>
                <p className="text-sm text-gray-400">Laboratory Report</p>
              </div>
              <p className="text-3xl font-extralight text-black">A+</p>
            </div>

            <div className="flex items-center justify-between py-6 border-b border-gray-100">
              <div>
                <p className="text-lg text-black mb-1">Chemistry</p>
                <p className="text-sm text-gray-400">Midterm Examination</p>
              </div>
              <p className="text-3xl font-extralight text-black">A−</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8">Course Progress</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <p className="text-sm text-black">Advanced Mathematics</p>
                  <p className="text-sm text-gray-400">75%</p>
                </div>
                <div className="h-px bg-gray-100">
                  <div className="h-px bg-black" style={{width: '75%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <p className="text-sm text-black">Physics Laboratory</p>
                  <p className="text-sm text-gray-400">60%</p>
                </div>
                <div className="h-px bg-gray-100">
                  <div className="h-px bg-black" style={{width: '60%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <p className="text-sm text-black">Organic Chemistry</p>
                  <p className="text-sm text-gray-400">85%</p>
                </div>
                <div className="h-px bg-gray-100">
                  <div className="h-px bg-black" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Sidebar */}
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8">Upcoming</h2>
          
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-black mb-2">Math Assignment</p>
              <p className="text-xs text-gray-400">Nov 25</p>
            </div>

            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-black mb-2">Physics Lab Report</p>
              <p className="text-xs text-gray-400">Nov 28</p>
            </div>

            <div className="pb-6 border-b border-gray-100">
              <p className="text-sm text-black mb-2">Chemistry Quiz</p>
              <p className="text-xs text-gray-400">Dec 1</p>
            </div>
          </div>

          {/* Academic Info */}
          <div className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8">Overview</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between pb-6 border-b border-gray-100">
                <p className="text-sm text-gray-400">GPA</p>
                <p className="text-sm text-black">3.8</p>
              </div>

              <div className="flex justify-between pb-6 border-b border-gray-100">
                <p className="text-sm text-gray-400">Credits</p>
                <p className="text-sm text-black">45</p>
              </div>

              <div className="flex justify-between pb-6 border-b border-gray-100">
                <p className="text-sm text-gray-400">Rank</p>
                <p className="text-sm text-black">12/150</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </MainLayout>
  );
};

export default StudentDashboardPage;
