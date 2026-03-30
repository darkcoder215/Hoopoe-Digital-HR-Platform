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
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/upload', label: 'رفع السيرة الذاتية', icon: Upload },
  { href: '/pipeline', label: 'مراحل التوظيف', icon: GitBranch },
  { href: '/candidates', label: 'المرشحون', icon: Users },
  { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 ease-in-out',
        'bg-gradient-to-b from-hoopoe-navy via-[#1E2230] to-[#1A1E28] text-white',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo Section */}
      <div className={cn(
        'flex items-center gap-3 h-[72px] border-b border-white/[0.06]',
        collapsed ? 'justify-center px-0' : 'px-6'
      )}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-hoopoe-orange to-hoopoe-brown flex items-center justify-center flex-shrink-0 shadow-lg shadow-hoopoe-orange/20">
          <Image src="/logos/hoopoe-digital-logo.jpeg" alt="هوبو" width={24} height={24} className="rounded-lg" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-[15px] font-black tracking-wide">هوبو ديجيتال</h1>
            <p className="text-[10px] text-white/40 font-medium">منصة الموارد البشرية</p>
          </div>
        )}
      </div>

      {/* AI Status Badge */}
      {!collapsed && (
        <div className="mx-4 mt-5 mb-1 animate-fade-in">
          <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-gradient-to-l from-hoopoe-orange/[0.12] to-transparent border border-hoopoe-orange/[0.15]">
            <div className="w-7 h-7 rounded-lg bg-hoopoe-orange/20 flex items-center justify-center">
              <Sparkles size={13} className="text-hoopoe-orange" />
            </div>
            <div>
              <span className="text-[11px] text-hoopoe-lt-orange font-bold block leading-tight">الذكاء الاصطناعي نشط</span>
              <span className="text-[9px] text-white/30 font-medium">فرز تلقائي للسير الذاتية</span>
            </div>
            <div className="mr-auto w-2 h-2 rounded-full bg-hoopoe-success animate-pulse-orange" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-5 space-y-1">
        <p className={cn(
          'text-[9px] text-white/25 font-bold tracking-widest px-3 mb-2',
          collapsed && 'hidden'
        )}>
          القائمة الرئيسية
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-gradient-to-l from-hoopoe-orange to-hoopoe-brown text-white shadow-lg shadow-hoopoe-orange/20'
                  : 'text-white/50 hover:text-white/90 hover:bg-white/[0.05]'
              )}
            >
              <Icon size={18} className={cn('flex-shrink-0', isActive && 'drop-shadow-sm')} />
              {!collapsed && <span className="animate-fade-in">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-white/80" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/[0.06]">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-white/[0.03]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hoopoe-orange to-hoopoe-brown flex items-center justify-center text-[10px] font-black text-white">
              مد
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white/80 truncate">مدير الموارد البشرية</p>
              <p className="text-[9px] text-white/30 font-medium">hr@hoopoe.digital</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {!collapsed && <span className="text-[11px] font-bold">طي القائمة</span>}
        </button>
      </div>
    </aside>
  );
}
