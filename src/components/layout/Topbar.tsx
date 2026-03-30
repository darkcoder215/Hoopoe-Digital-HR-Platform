'use client';

import { Bell, Search, Plus, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const today = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="h-[72px] border-b border-hoopoe-lt-gray/60 bg-white/90 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="animate-fade-in">
        <h1 className="text-xl font-black text-hoopoe-black tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] font-semibold text-hoopoe-black/40 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-hoopoe-black/35 font-semibold">
          <Calendar size={13} />
          {today}
        </div>

        <div className="w-px h-6 bg-hoopoe-lt-gray hidden lg:block" />

        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-hoopoe-black/25" />
          <input
            type="text"
            placeholder="ابحث عن مرشح..."
            className="pr-9 pl-4 py-2.5 text-[12px] font-semibold rounded-xl border border-hoopoe-lt-gray/70 bg-hoopoe-surface/40 focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus focus:bg-white outline-none w-52 transition-all duration-200 placeholder:text-hoopoe-black/25"
          />
        </div>

        {/* Upload CTA */}
        <Link href="/upload">
          <Button size="sm" className="hidden sm:inline-flex shadow-sm shadow-hoopoe-orange/15">
            <Plus size={14} />
            رفع سيرة ذاتية
          </Button>
        </Link>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl text-hoopoe-black/40 hover:bg-hoopoe-surface hover:text-hoopoe-black/60 transition-all duration-200 cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-hoopoe-orange rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
