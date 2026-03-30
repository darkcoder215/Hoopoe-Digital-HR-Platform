'use client';

import { Bell, Search, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { getInitials } from '@/lib/utils';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="h-16 border-b border-hoopoe-lt-gray bg-white/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="animate-fade-in">
        <h1 className="text-lg font-bold text-hoopoe-black tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-hoopoe-black/50">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-hoopoe-black/30" />
          <input
            type="text"
            placeholder="Search candidates..."
            className="pl-9 pr-4 py-2 text-xs rounded-lg border border-hoopoe-lt-gray bg-hoopoe-surface/50 focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none w-56 transition-all duration-150"
          />
        </div>

        {/* Upload CTA */}
        <Link href="/upload">
          <Button size="sm" className="hidden sm:inline-flex">
            <Plus size={14} />
            Upload CV
          </Button>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-hoopoe-black/50 hover:bg-hoopoe-surface transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-hoopoe-orange rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-hoopoe-orange flex items-center justify-center text-white text-xs font-bold">
          {getInitials('HR Admin')}
        </div>
      </div>
    </header>
  );
}
