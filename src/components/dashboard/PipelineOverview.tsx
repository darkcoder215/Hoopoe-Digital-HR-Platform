'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES, STAGE_COLORS } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
  ArrowRight, GitBranch,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
};

export default function PipelineOverview() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const total = candidates.length || 1;

  const stageCounts = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    count: candidates.filter((c) => c.stage === stage.key).length,
  }));

  return (
    <Card className="card-entrance stagger-5 h-full" padding="md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="section-icon bg-hoopoe-orange/8">
            <GitBranch size={16} className="text-hoopoe-orange" />
          </div>
          <div>
            <h2 className="text-sm font-black text-hoopoe-black">Hiring Pipeline</h2>
            <p className="text-[11px] text-hoopoe-black/35 font-semibold">Candidate distribution across stages</p>
          </div>
        </div>
        <Link href="/pipeline" className="flex items-center gap-1 text-[11px] font-bold text-hoopoe-orange hover:text-hoopoe-brown transition-colors">
          View Board
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Funnel Visualization */}
      <div className="flex items-end gap-1.5 h-24 mb-2 px-1">
        {stageCounts.map((stage) => {
          const pct = Math.max(10, (stage.count / total) * 100);
          return (
            <div key={stage.key} className="flex-1 flex flex-col items-center group cursor-pointer">
              <div className="text-[9px] font-black text-hoopoe-black/40 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {stage.count}
              </div>
              <div
                className="w-full rounded-lg transition-all duration-700 ease-out group-hover:opacity-90"
                style={{
                  height: `${pct}%`,
                  backgroundColor: STAGE_COLORS[stage.key],
                  minHeight: '8px',
                  boxShadow: stage.count > 0 ? `0 2px 8px ${STAGE_COLORS[stage.key]}30` : 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Stage Labels & Counts */}
      <div className="grid grid-cols-9 gap-1 pt-3 border-t border-hoopoe-lt-gray/30">
        {stageCounts.map((stage) => {
          const Icon = iconMap[stage.icon] || FileText;
          return (
            <Link
              key={stage.key}
              href="/pipeline"
              className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-hoopoe-surface/60 transition-all duration-200 group"
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200"
                   style={{ backgroundColor: `${STAGE_COLORS[stage.key]}15` }}>
                <Icon size={11} style={{ color: STAGE_COLORS[stage.key] }} className="group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[8px] text-hoopoe-black/40 text-center leading-tight font-bold line-clamp-2">{stage.label}</span>
              <span
                className="text-[11px] font-black"
                style={{ color: stage.count > 0 ? STAGE_COLORS[stage.key] : '#D4D0CE' }}
              >
                {stage.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Conversion Rate */}
      <div className="mt-4 p-3 rounded-xl bg-hoopoe-surface/50 border border-hoopoe-lt-gray/30">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-hoopoe-black/40">Overall conversion rate (Received → Onboarding)</span>
          <span className="font-black text-hoopoe-success">25%</span>
        </div>
        <div className="mt-2 h-1 bg-hoopoe-lt-gray/40 rounded-full overflow-hidden">
          <div className="h-full w-[25%] bg-gradient-to-r from-hoopoe-success/60 to-hoopoe-success rounded-full" />
        </div>
      </div>
    </Card>
  );
}
