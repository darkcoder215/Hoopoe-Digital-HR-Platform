'use client';

import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 mr-[260px] transition-all duration-300 min-h-screen bg-hoopoe-surface/30">
        {children}
      </main>
    </div>
  );
}
