'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES, STAGE_COLORS } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText, Brain, Filter, Users, Crown, Code, Send, CheckCircle, Rocket,
};

export default function PipelineOverview() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const total = candidates.length || 1;

  return (
    <Card className="animate-slide-up stagger-5" padding="md">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-hoopoe-black">Recruitment Pipeline</h2>
          <p className="text-xs text-hoopoe-black/40 mt-0.5">Candidate distribution across stages</p>
        </div>
        <Link href="/pipeline" className="text-xs font-medium text-hoopoe-orange hover:text-hoopoe-brown transition-colors">
          View Board →
        </Link>
      </div>

      {/* Pipeline stages */}
      <div className="flex items-end gap-1 h-16 mb-3">
        {PIPELINE_STAGES.map((stage) => {
          const count = candidates.filter((c) => c.stage === stage.key).length;
          const pct = Math.max(8, (count / total) * 100);
          return (
            <div key={stage.key} className="flex-1 flex flex-col items-center group">
              <div
                className="w-full rounded-t-md transition-all duration-500 ease-out group-hover:opacity-80"
                style={{
                  height: `${pct}%`,
                  backgroundColor: STAGE_COLORS[stage.key],
                  minHeight: '6px',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex gap-1">
        {PIPELINE_STAGES.map((stage) => {
          const count = candidates.filter((c) => c.stage === stage.key).length;
          const Icon = iconMap[stage.icon] || FileText;
          return (
            <Link
              key={stage.key}
              href="/pipeline"
              className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg hover:bg-hoopoe-surface transition-colors group"
            >
              <Icon size={14} className="text-hoopoe-black/40 group-hover:text-hoopoe-orange transition-colors" />
              <span className="text-[10px] text-hoopoe-black/50 text-center leading-tight">{stage.label}</span>
              <span
                className="text-xs font-bold"
                style={{ color: count > 0 ? STAGE_COLORS[stage.key] : '#E8E3E1' }}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
