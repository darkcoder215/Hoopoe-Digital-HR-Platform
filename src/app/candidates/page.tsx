'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import Button from '@/components/ui/Button';
import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES } from '@/lib/constants';
import { PipelineStage } from '@/lib/types';
import { getInitials, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import { Search, Filter, Users, ArrowUpDown } from 'lucide-react';

const sortLabels: Record<string, string> = {
  date: 'التاريخ',
  score: 'التقييم',
  name: 'الاسم',
};

export default function CandidatesPage() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<PipelineStage | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date');

  let filtered = candidates.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.position.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === 'all' || c.stage === stageFilter;
    return matchSearch && matchStage;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    if (sortBy === 'score') return (b.aiReport?.overallScore || 0) - (a.aiReport?.overallScore || 0);
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <Topbar title="المرشحون" subtitle={`${candidates.length} مرشح إجمالاً`} />
      <div className="p-8 max-w-[1280px] space-y-6">
        {/* Filters */}
        <Card padding="sm" className="animate-fade-in">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-hoopoe-black/30" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو الوظيفة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9 pl-4 py-2 text-xs font-bold rounded-xl border border-hoopoe-lt-gray bg-hoopoe-surface/50 focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none w-full transition-all"
              />
            </div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as PipelineStage | 'all')}
              className="px-3 py-2 text-xs font-bold border border-hoopoe-lt-gray rounded-xl bg-white focus:border-hoopoe-orange outline-none"
            >
              <option value="all">جميع المراحل</option>
              {PIPELINE_STAGES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 border border-hoopoe-lt-gray rounded-xl overflow-hidden">
              {(['date', 'score', 'name'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-2 text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                    sortBy === s ? 'bg-hoopoe-orange text-white' : 'text-hoopoe-black/50 hover:bg-hoopoe-surface'
                  }`}
                >
                  {sortLabels[s]}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <Link key={c.id} href={`/candidates/${c.id}`}>
              <Card hover className={`h-full card-entrance hover-glow stagger-${Math.min(i + 1, 9)}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-xs font-black flex-shrink-0">
                    {getInitials(c.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-hoopoe-black truncate">{c.name}</h3>
                    <p className="text-[11px] text-hoopoe-black/40 font-bold">{c.position}</p>
                  </div>
                  {c.aiReport && <ScoreGauge score={c.aiReport.overallScore} size="sm" showLabel={false} />}
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="stage" stage={c.stage} />
                  <span className="text-[10px] text-hoopoe-black/30 font-bold">{formatRelativeTime(c.uploadedAt)}</span>
                </div>

                {c.aiReport && (
                  <div className="mt-3 pt-3 border-t border-hoopoe-lt-gray/50">
                    <div className="flex flex-wrap gap-1">
                      {c.aiReport.skills.slice(0, 3).map((s) => (
                        <span key={s.name} className="text-[9px] font-bold px-1.5 py-0.5 rounded-lg bg-hoopoe-surface text-hoopoe-black/50">{s.name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Users size={40} className="mx-auto text-hoopoe-lt-gray mb-3" />
            <p className="text-sm text-hoopoe-black/40 font-bold">لا يوجد مرشحون مطابقون للفلاتر</p>
          </div>
        )}
      </div>
    </>
  );
}
