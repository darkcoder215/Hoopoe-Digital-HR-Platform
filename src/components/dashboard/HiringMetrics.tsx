'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import Card from '@/components/ui/Card';
import { Timer, Target, TrendingUp, Award, BarChart3 } from 'lucide-react';

const departmentData = [
  { name: 'Engineering', count: 5, color: '#D4793A', pct: 42 },
  { name: 'Design', count: 2, color: '#E8994A', pct: 17 },
  { name: 'Product', count: 2, color: '#F7C97D', pct: 17 },
  { name: 'Infrastructure', count: 2, color: '#1E2332', pct: 17 },
  { name: 'Data', count: 1, color: '#22875A', pct: 8 },
];

const weeklyData = [
  { label: 'Mon', value: 5 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 7 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 3 },
];

export default function HiringMetrics() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const avgScore = Math.round(
    candidates.filter((c) => c.aiReport).reduce((sum, c) => sum + (c.aiReport?.overallScore || 0), 0) /
    (candidates.filter((c) => c.aiReport).length || 1)
  );

  return (
    <Card className="card-entrance stagger-6 h-full" padding="md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="section-icon bg-hoopoe-navy/8">
          <BarChart3 size={16} className="text-hoopoe-navy" />
        </div>
        <div>
          <h2 className="text-sm font-black text-hoopoe-black">Hiring Metrics</h2>
          <p className="text-[11px] text-hoopoe-black/35 font-semibold">Weekly performance stats</p>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-hoopoe-surface/60 border border-hoopoe-lt-gray/40">
          <div className="flex items-center gap-2 mb-1.5">
            <Timer size={12} className="text-hoopoe-orange" />
            <span className="text-[10px] text-hoopoe-black/40 font-bold">Avg. Hiring Time</span>
          </div>
          <p className="text-lg font-black text-hoopoe-black">14 <span className="text-xs font-bold text-hoopoe-black/40">days</span></p>
        </div>
        <div className="p-3 rounded-xl bg-hoopoe-surface/60 border border-hoopoe-lt-gray/40">
          <div className="flex items-center gap-2 mb-1.5">
            <Target size={12} className="text-hoopoe-success" />
            <span className="text-[10px] text-hoopoe-black/40 font-bold">Acceptance Rate</span>
          </div>
          <p className="text-lg font-black text-hoopoe-black">67<span className="text-xs font-bold text-hoopoe-black/40">%</span></p>
        </div>
        <div className="p-3 rounded-xl bg-hoopoe-surface/60 border border-hoopoe-lt-gray/40">
          <div className="flex items-center gap-2 mb-1.5">
            <Award size={12} className="text-hoopoe-mid-orange" />
            <span className="text-[10px] text-hoopoe-black/40 font-bold">Avg. Score</span>
          </div>
          <p className="text-lg font-black text-hoopoe-black">{avgScore}<span className="text-xs font-bold text-hoopoe-black/40">/100</span></p>
        </div>
        <div className="p-3 rounded-xl bg-hoopoe-surface/60 border border-hoopoe-lt-gray/40">
          <div className="flex items-center gap-2 mb-1.5">
            <TrendingUp size={12} className="text-hoopoe-brown" />
            <span className="text-[10px] text-hoopoe-black/40 font-bold">Conversion Rate</span>
          </div>
          <p className="text-lg font-black text-hoopoe-black">25<span className="text-xs font-bold text-hoopoe-black/40">%</span></p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="mb-6">
        <p className="text-[10px] text-hoopoe-black/35 font-bold mb-3 uppercase tracking-wide">CVs Received This Week</p>
        <div className="flex items-end gap-2 h-20">
          {weeklyData.map((d) => {
            const height = Math.max(12, (d.value / 7) * 100);
            return (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[9px] font-black text-hoopoe-orange opacity-0 group-hover:opacity-100 transition-opacity">{d.value}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-hoopoe-orange/80 to-hoopoe-mid-orange/60 transition-all duration-500 ease-out group-hover:from-hoopoe-orange group-hover:to-hoopoe-mid-orange"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[9px] text-hoopoe-black/30 font-bold">{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Breakdown */}
      <div>
        <p className="text-[10px] text-hoopoe-black/35 font-bold mb-3 uppercase tracking-wide">By Department</p>
        <div className="space-y-2.5">
          {departmentData.map((dept) => (
            <div key={dept.name} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-hoopoe-black/70">{dept.name}</span>
                <span className="text-[10px] font-black text-hoopoe-black/40">{dept.count}</span>
              </div>
              <div className="h-1.5 bg-hoopoe-lt-gray/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${dept.pct}%`, backgroundColor: dept.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
