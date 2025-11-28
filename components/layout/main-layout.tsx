"use client"
import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
}

const MainLayout = ({ children, sidebar, navbar, footer }: MainLayoutProps) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <header>
      {navbar}
    </header>
    <div className="flex flex-1 w-full">
      <aside>
        {sidebar}
      </aside>
      <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
    <footer>
      {footer}
    </footer>
  </div>
);

export default MainLayout;
