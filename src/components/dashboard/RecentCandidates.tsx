'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import Link from 'next/link';
import { getInitials, formatRelativeTime } from '@/lib/utils';
import { ArrowLeft, Users } from 'lucide-react';

export default function RecentCandidates() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const recent = [...candidates].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, 6);

  return (
    <Card className="card-entrance stagger-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="section-icon bg-hoopoe-mid-orange/10">
            <Users size={16} className="text-hoopoe-mid-orange" />
          </div>
          <div>
            <h2 className="text-sm font-black text-hoopoe-black">أحدث المرشحين</h2>
            <p className="text-[11px] text-hoopoe-black/35 font-semibold">آخر السير الذاتية المقدمة</p>
          </div>
        </div>
        <Link href="/candidates" className="flex items-center gap-1 text-[11px] font-bold text-hoopoe-orange hover:text-hoopoe-brown transition-colors">
          عرض الكل
          <ArrowLeft size={12} />
        </Link>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-3">
        {recent.map((c, i) => (
          <Link
            key={c.id}
            href={`/candidates/${c.id}`}
            className={`flex items-center gap-4 p-3.5 rounded-xl border border-transparent hover:border-hoopoe-lt-gray/60 hover:bg-hoopoe-surface/40 transition-all duration-200 group slide-in-rtl stagger-${Math.min(i + 1, 9)}`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hoopoe-orange/15 to-hoopoe-orange/5 text-hoopoe-orange flex items-center justify-center text-xs font-black flex-shrink-0 group-hover:from-hoopoe-orange group-hover:to-hoopoe-brown group-hover:text-white transition-all duration-300">
              {getInitials(c.name)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-bold text-hoopoe-black group-hover:text-hoopoe-orange transition-colors truncate">{c.name}</p>
                <Badge variant="stage" stage={c.stage} className="!text-[9px] !px-2 !py-0" />
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-[11px] text-hoopoe-black/35 font-semibold truncate">{c.position}</p>
                <span className="text-[10px] text-hoopoe-black/25 font-semibold">{formatRelativeTime(c.uploadedAt)}</span>
              </div>
            </div>

            {/* Score */}
            <div className="flex-shrink-0">
              {c.aiReport ? (
                <ScoreGauge score={c.aiReport.overallScore} size="sm" showLabel={false} />
              ) : (
                <div className="w-[56px] h-[56px] rounded-full border-2 border-dashed border-hoopoe-lt-gray flex items-center justify-center">
                  <span className="text-[8px] text-hoopoe-black/25 font-bold text-center leading-tight">قيد<br/>التحليل</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
