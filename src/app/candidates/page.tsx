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
      <Topbar title="Candidates" subtitle={`${candidates.length} total candidates`} />
      <div className="p-8 max-w-[1280px] space-y-6">
        {/* Filters */}
        <Card padding="sm" className="animate-fade-in">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-hoopoe-black/30" />
              <input
                type="text"
                placeholder="Search by name or position..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-lg border border-hoopoe-lt-gray bg-hoopoe-surface/50 focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none w-full transition-all"
              />
            </div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as PipelineStage | 'all')}
              className="px-3 py-2 text-xs border border-hoopoe-lt-gray rounded-lg bg-white focus:border-hoopoe-orange outline-none"
            >
              <option value="all">All Stages</option>
              {PIPELINE_STAGES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 border border-hoopoe-lt-gray rounded-lg overflow-hidden">
              {(['date', 'score', 'name'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-2 text-[10px] font-medium transition-colors cursor-pointer ${
                    sortBy === s ? 'bg-hoopoe-orange text-white' : 'text-hoopoe-black/50 hover:bg-hoopoe-surface'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <Link key={c.id} href={`/candidates/${c.id}`}>
              <Card hover className={`h-full animate-slide-up stagger-${Math.min(i + 1, 9)}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {getInitials(c.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-hoopoe-black truncate">{c.name}</h3>
                    <p className="text-[11px] text-hoopoe-black/40">{c.position}</p>
                  </div>
                  {c.aiReport && <ScoreGauge score={c.aiReport.overallScore} size="sm" showLabel={false} />}
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="stage" stage={c.stage} />
                  <span className="text-[10px] text-hoopoe-black/30">{formatRelativeTime(c.uploadedAt)}</span>
                </div>

                {c.aiReport && (
                  <div className="mt-3 pt-3 border-t border-hoopoe-lt-gray/50">
                    <div className="flex flex-wrap gap-1">
                      {c.aiReport.skills.slice(0, 3).map((s) => (
                        <span key={s.name} className="text-[9px] px-1.5 py-0.5 rounded bg-hoopoe-surface text-hoopoe-black/50">{s.name}</span>
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
            <p className="text-sm text-hoopoe-black/40">No candidates match your filters</p>
          </div>
        )}
      </div>
    </>
  );
}
