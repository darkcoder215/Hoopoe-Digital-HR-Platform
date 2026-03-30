'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import Button from '@/components/ui/Button';
import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES, STAGE_COLORS } from '@/lib/constants';
import { PipelineStage, Candidate } from '@/lib/types';
import { cn, getInitials, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
  ChevronLeft, GripVertical, Search,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
};

function CandidateCard({ candidate, onMove }: { candidate: Candidate; onMove: (id: string, stage: PipelineStage) => void }) {
  const stageIndex = PIPELINE_STAGES.findIndex((s) => s.key === candidate.stage);
  const nextStage = PIPELINE_STAGES[stageIndex + 1];

  return (
    <div className="group bg-white rounded-xl border border-hoopoe-lt-gray p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-scale-in hover-glow">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-full bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-[10px] font-black flex-shrink-0">
          {getInitials(candidate.name)}
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/candidates/${candidate.id}`} className="text-xs font-bold text-hoopoe-black hover:text-hoopoe-orange transition-colors block truncate">
            {candidate.name}
          </Link>
          <p className="text-[10px] text-hoopoe-black/40 truncate font-bold">{candidate.position}</p>
        </div>
        {candidate.aiReport && (
          <ScoreGauge score={candidate.aiReport.overallScore} size="sm" showLabel={false} className="flex-shrink-0" />
        )}
      </div>

      {candidate.aiReport && (
        <div className="mt-2 flex flex-wrap gap-1">
          {candidate.aiReport.skills.slice(0, 2).map((s) => (
            <span key={s.name} className="text-[9px] font-bold px-1.5 py-0.5 rounded-lg bg-hoopoe-surface text-hoopoe-black/50">{s.name}</span>
          ))}
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[9px] text-hoopoe-black/30 font-bold">{formatRelativeTime(candidate.uploadedAt)}</span>
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

function PipelineColumn({ stage, candidates, onMove }: { stage: typeof PIPELINE_STAGES[0]; candidates: Candidate[]; onMove: (id: string, stage: PipelineStage) => void }) {
  const Icon = iconMap[stage.icon] || FileText;

  return (
    <div className="flex flex-col min-w-[240px] max-w-[280px] animate-fade-in">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: STAGE_COLORS[stage.key] }}
        />
        <Icon size={13} className="text-hoopoe-black/40 flex-shrink-0" />
        <span className="text-xs font-bold text-hoopoe-black truncate">{stage.label}</span>
        <span className="mr-auto text-[10px] font-black text-hoopoe-black/30 bg-hoopoe-surface px-1.5 py-0.5 rounded-md">
          {candidates.length}
        </span>
      </div>

      {/* Column body */}
      <div className="flex-1 space-y-2 p-1 min-h-[200px] rounded-xl bg-hoopoe-surface/40 border border-dashed border-hoopoe-lt-gray/50">
        {candidates.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[10px] text-hoopoe-black/20 italic font-bold py-12">
            لا يوجد مرشحون
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

  return (
    <>
      <Topbar title="لوحة مراحل التوظيف" subtitle="تتبع المرشحين عبر مراحل التوظيف المختلفة" />
      <div className="p-6">
        {/* Search bar */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-hoopoe-black/30" />
            <input
              type="text"
              placeholder="تصفية المرشحين..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 pl-4 py-2 text-xs font-bold rounded-xl border border-hoopoe-lt-gray bg-white focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none w-full transition-all"
            />
          </div>
          <div className="flex items-center gap-1 text-[10px] text-hoopoe-black/40 font-bold">
            <GripVertical size={12} />
            مرر فوق البطاقة واضغط السهم لنقل المرشح للمرحلة التالية
          </div>
        </div>

        {/* Pipeline columns */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-thin">
          {PIPELINE_STAGES.map((stage) => (
            <PipelineColumn
              key={stage.key}
              stage={stage}
              candidates={filtered.filter((c) => c.stage === stage.key)}
              onMove={updateStage}
            />
          ))}
        </div>
      </div>
    </>
  );
}
