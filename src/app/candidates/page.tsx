'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES } from '@/lib/constants';
import { PipelineStage } from '@/lib/types';
import { getInitials, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import { Search, Users, Brain, TrendingUp, CheckCircle2 } from 'lucide-react';

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

  const avgScore = Math.round(
    candidates.filter((c) => c.aiReport).reduce((sum, c) => sum + (c.aiReport?.overallScore || 0), 0) /
    (candidates.filter((c) => c.aiReport).length || 1)
  );
  const withOffers = candidates.filter((c) => ['offer_sent', 'offer_accepted', 'onboarding'].includes(c.stage)).length;

  return (
    <>
      <Topbar title="المرشحون" subtitle={`${candidates.length} مرشح إجمالاً`} />
      <div className="p-8 max-w-[1400px] space-y-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-4 gap-4 card-entrance">
          {[
            { label: 'إجمالي المرشحين', value: candidates.length, icon: Users, color: 'text-hoopoe-orange', bg: 'bg-hoopoe-orange/8' },
            { label: 'متوسط التقييم', value: avgScore, icon: Brain, color: 'text-hoopoe-brown', bg: 'bg-hoopoe-brown/8', suffix: '/١٠٠' },
            { label: 'في مراحل نشطة', value: candidates.filter((c) => !['onboarding', 'offer_accepted'].includes(c.stage)).length, icon: TrendingUp, color: 'text-hoopoe-navy', bg: 'bg-hoopoe-navy/6' },
            { label: 'عروض مقدمة', value: withOffers, icon: CheckCircle2, color: 'text-hoopoe-success', bg: 'bg-hoopoe-success/8' },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-hoopoe-lt-gray/50 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center`}>
                <m.icon size={18} className={m.color} />
              </div>
              <div>
                <p className="text-[10px] text-hoopoe-black/35 font-bold">{m.label}</p>
                <p className="text-lg font-black text-hoopoe-black leading-tight">{m.value}{m.suffix && <span className="text-[10px] font-bold text-hoopoe-black/30">{m.suffix}</span>}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <Card padding="sm" className="card-entrance stagger-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-hoopoe-black/25" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو الوظيفة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9 pl-4 py-2.5 text-[12px] font-semibold rounded-xl border border-hoopoe-lt-gray/70 bg-hoopoe-surface/40 focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none w-full transition-all placeholder:text-hoopoe-black/25"
              />
            </div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as PipelineStage | 'all')}
              className="px-3 py-2.5 text-[12px] font-semibold border border-hoopoe-lt-gray/70 rounded-xl bg-white focus:border-hoopoe-orange outline-none"
            >
              <option value="all">جميع المراحل</option>
              {PIPELINE_STAGES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-0.5 border border-hoopoe-lt-gray/70 rounded-xl overflow-hidden">
              {(['date', 'score', 'name'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3.5 py-2.5 text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                    sortBy === s ? 'bg-hoopoe-orange text-white' : 'text-hoopoe-black/40 hover:bg-hoopoe-surface/60'
                  }`}
                >
                  {sortLabels[s]}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c, i) => (
            <Link key={c.id} href={`/candidates/${c.id}`}>
              <Card hover className={`h-full card-entrance hover-lift stagger-${Math.min(i + 1, 9)}`}>
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-hoopoe-orange/15 to-hoopoe-orange/5 text-hoopoe-orange flex items-center justify-center text-xs font-black flex-shrink-0">
                    {getInitials(c.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-bold text-hoopoe-black truncate">{c.name}</h3>
                    <p className="text-[11px] text-hoopoe-black/35 font-semibold">{c.position}</p>
                  </div>
                  {c.aiReport && <ScoreGauge score={c.aiReport.overallScore} size="sm" showLabel={false} />}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Badge variant="stage" stage={c.stage} />
                  <span className="text-[10px] text-hoopoe-black/25 font-semibold">{formatRelativeTime(c.uploadedAt)}</span>
                </div>

                {c.aiReport && (
                  <div className="pt-3 border-t border-hoopoe-lt-gray/30">
                    <div className="flex flex-wrap gap-1.5">
                      {c.aiReport.skills.slice(0, 3).map((s) => (
                        <span key={s.name} className="text-[9px] font-semibold px-2 py-0.5 rounded-lg bg-hoopoe-surface/70 text-hoopoe-black/40">{s.name}</span>
                      ))}
                    </div>
                    {c.aiReport.strengths.length > 0 && (
                      <p className="text-[10px] text-hoopoe-success font-semibold mt-2 flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        {c.aiReport.strengths[0]}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Users size={48} className="mx-auto text-hoopoe-lt-gray mb-4" />
            <p className="text-sm text-hoopoe-black/35 font-bold">لا يوجد مرشحون مطابقون للفلاتر</p>
          </div>
        )}
      </div>
    </>
  );
}
