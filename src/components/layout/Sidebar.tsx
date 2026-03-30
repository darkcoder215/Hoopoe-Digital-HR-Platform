'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Upload,
  GitBranch,
  Users,
  Settings,
  Brain,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload', label: 'Upload CV', icon: Upload },
  { href: '/pipeline', label: 'Pipeline', icon: GitBranch },
  { href: '/candidates', label: 'Candidates', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-hoopoe-navy text-white z-40 flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-5 h-16 border-b border-white/10', collapsed && 'justify-center px-0')}>
        <div className="w-8 h-8 rounded-lg bg-hoopoe-orange flex items-center justify-center flex-shrink-0">
          <Image src="/logos/hoopoe-digital-logo.jpeg" alt="Hoopoe" width={24} height={24} className="rounded" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-bold tracking-wide">HOOPOE</h1>
            <p className="text-[10px] text-white/50 tracking-widest uppercase">Digital HR</p>
          </div>
        )}
      </div>

      {/* AI Badge */}
      {!collapsed && (
        <div className="mx-4 mt-5 mb-2 animate-fade-in">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-hoopoe-orange/15 border border-hoopoe-orange/20">
            <Brain size={14} className="text-hoopoe-orange" />
            <span className="text-[11px] text-hoopoe-lt-orange font-medium">AI-Powered Screening</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-hoopoe-orange text-white shadow-md shadow-hoopoe-orange/20'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="animate-fade-in">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-150 cursor-pointer"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
