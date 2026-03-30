'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import ScoreGauge from '@/components/ui/ScoreGauge';
import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES, STAGE_COLORS } from '@/lib/constants';
import { PipelineStage, Candidate } from '@/lib/types';
import { cn, getInitials, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
  ChevronLeft, Search, ArrowLeft, BarChart3,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
};

function CandidateCard({ candidate, onMove }: { candidate: Candidate; onMove: (id: string, stage: PipelineStage) => void }) {
  const stageIndex = PIPELINE_STAGES.findIndex((s) => s.key === candidate.stage);
  const nextStage = PIPELINE_STAGES[stageIndex + 1];

  return (
    <div className="group bg-white rounded-xl border border-hoopoe-lt-gray/50 p-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-scale-in hover-glow">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hoopoe-orange/15 to-hoopoe-orange/5 text-hoopoe-orange flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover:from-hoopoe-orange group-hover:to-hoopoe-brown group-hover:text-white transition-all duration-200">
          {getInitials(candidate.name)}
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/candidates/${candidate.id}`} className="text-[12px] font-bold text-hoopoe-black hover:text-hoopoe-orange transition-colors block truncate">
            {candidate.name}
          </Link>
          <p className="text-[10px] text-hoopoe-black/35 truncate font-semibold">{candidate.position}</p>
        </div>
        {candidate.aiReport && (
          <ScoreGauge score={candidate.aiReport.overallScore} size="sm" showLabel={false} className="flex-shrink-0" />
        )}
      </div>

      {candidate.aiReport && (
        <div className="mt-2 flex flex-wrap gap-1">
          {candidate.aiReport.skills.slice(0, 2).map((s) => (
            <span key={s.name} className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-hoopoe-surface/80 text-hoopoe-black/40">{s.name}</span>
          ))}
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[9px] text-hoopoe-black/25 font-semibold">{formatRelativeTime(candidate.uploadedAt)}</span>
        {nextStage && (
          <button
            onClick={(e) => { e.stopPropagation(); onMove(candidate.id, nextStage.key); }}
            className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 text-[9px] font-bold text-hoopoe-orange hover:text-hoopoe-brown transition-all cursor-pointer"
          >
            {nextStage.label} <ChevronLeft size={10} />
          </button>
        )}
      </div>
    </div>
  );
}

function PipelineColumn({ stage, candidates, onMove, index }: { stage: typeof PIPELINE_STAGES[0]; candidates: Candidate[]; onMove: (id: string, stage: PipelineStage) => void; index: number }) {
  const Icon = iconMap[stage.icon] || FileText;

  return (
    <div className={`flex flex-col min-w-[250px] max-w-[280px] card-entrance stagger-${Math.min(index + 1, 9)}`}>
      {/* Column header */}
      <div className="flex items-center gap-2.5 mb-3 px-1">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${STAGE_COLORS[stage.key]}15` }}
        >
          <Icon size={13} style={{ color: STAGE_COLORS[stage.key] }} />
        </div>
        <span className="text-[12px] font-bold text-hoopoe-black truncate flex-1">{stage.label}</span>
        <span className="text-[11px] font-black bg-hoopoe-surface/80 px-2 py-0.5 rounded-lg" style={{ color: STAGE_COLORS[stage.key] }}>
          {candidates.length}
        </span>
      </div>

      {/* Column body */}
      <div className="flex-1 space-y-2 p-2 min-h-[300px] rounded-2xl bg-hoopoe-surface/30 border border-hoopoe-lt-gray/30">
        {candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-hoopoe-black/15 py-12">
            <Icon size={20} className="mb-2" />
            <span className="text-[10px] font-bold">لا يوجد مرشحون</span>
          </div>
        ) : (
          candidates.map((c) => <CandidateCard key={c.id} candidate={c} onMove={onMove} />)
        )}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const updateStage = useCandidatesStore((s) => s.updateStage);
  const [search, setSearch] = useState('');

  const filtered = search
    ? candidates.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.position.toLowerCase().includes(search.toLowerCase()))
    : candidates;

  const totalInPipeline = filtered.length;
  const avgScore = Math.round(
    filtered.filter((c) => c.aiReport).reduce((sum, c) => sum + (c.aiReport?.overallScore || 0), 0) /
    (filtered.filter((c) => c.aiReport).length || 1)
  );

  return (
    <>
      <Topbar title="لوحة مراحل التوظيف" subtitle="تتبع المرشحين عبر مراحل التوظيف المختلفة" />
      <div className="p-6 space-y-5">
        {/* Summary Bar */}
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-hoopoe-black/25" />
            <input
              type="text"
              placeholder="تصفية المرشحين..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 pl-4 py-2.5 text-[12px] font-semibold rounded-xl border border-hoopoe-lt-gray/70 bg-white focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none w-full transition-all placeholder:text-hoopoe-black/25"
            />
          </div>

          <div className="flex items-center gap-6 mr-auto">
            <div className="flex items-center gap-2">
              <BarChart3 size={14} className="text-hoopoe-black/30" />
              <span className="text-[11px] text-hoopoe-black/40 font-semibold">الإجمالي</span>
              <span className="text-[12px] font-black text-hoopoe-black">{totalInPipeline}</span>
            </div>
            <div className="w-px h-4 bg-hoopoe-lt-gray" />
            <div className="flex items-center gap-2">
              <Brain size={14} className="text-hoopoe-black/30" />
              <span className="text-[11px] text-hoopoe-black/40 font-semibold">متوسط التقييم</span>
              <span className="text-[12px] font-black text-hoopoe-orange">{avgScore}</span>
            </div>
          </div>
        </div>

        {/* Pipeline columns */}
        <div className="flex gap-3 overflow-x-auto pb-6">
          {PIPELINE_STAGES.map((stage, i) => (
            <PipelineColumn
              key={stage.key}
              stage={stage}
              candidates={filtered.filter((c) => c.stage === stage.key)}
              onMove={updateStage}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
