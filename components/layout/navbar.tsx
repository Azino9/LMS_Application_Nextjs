"use client"
import React, { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => (
  <nav className="w-full bg-blue-700 text-white px-4 py-3 flex items-center justify-between shadow">
    <div className="font-bold text-lg">LMS</div>
    {children}
  </nav>
);

export default Navbar;
