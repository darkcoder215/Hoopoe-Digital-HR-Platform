'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import Link from 'next/link';
import { getInitials, formatRelativeTime } from '@/lib/utils';

export default function RecentCandidates() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const recent = [...candidates].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, 8);

  return (
    <Card className="card-entrance stagger-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-black text-hoopoe-black">أحدث المرشحين</h2>
          <p className="text-xs text-hoopoe-black/40 mt-0.5 font-bold">آخر السير الذاتية المقدمة</p>
        </div>
        <Link href="/candidates" className="text-xs font-bold text-hoopoe-orange hover:text-hoopoe-brown transition-colors">
          عرض الكل ←
        </Link>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-hoopoe-lt-gray">
              <th className="text-right text-[10px] font-black text-hoopoe-black/50 tracking-wider px-6 py-2.5">المرشح</th>
              <th className="text-right text-[10px] font-black text-hoopoe-black/50 tracking-wider px-4 py-2.5">الوظيفة</th>
              <th className="text-right text-[10px] font-black text-hoopoe-black/50 tracking-wider px-4 py-2.5">المرحلة</th>
              <th className="text-center text-[10px] font-black text-hoopoe-black/50 tracking-wider px-4 py-2.5">تقييم الذكاء</th>
              <th className="text-left text-[10px] font-black text-hoopoe-black/50 tracking-wider px-6 py-2.5">تاريخ الرفع</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((c) => (
              <tr key={c.id} className="border-b border-hoopoe-lt-gray/60 hover:bg-hoopoe-lt-orange/[0.04] transition-colors group">
                <td className="px-6 py-3">
                  <Link href={`/candidates/${c.id}`} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-xs font-black flex-shrink-0 group-hover:bg-hoopoe-orange group-hover:text-white transition-all duration-200">
                      {getInitials(c.name)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-hoopoe-black group-hover:text-hoopoe-orange transition-colors">{c.name}</p>
                      <p className="text-[11px] text-hoopoe-black/40 font-bold">{c.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-xs text-hoopoe-black/70 font-bold">{c.position}</td>
                <td className="px-4 py-3">
                  <Badge variant="stage" stage={c.stage} />
                </td>
                <td className="px-4 py-3 text-center">
                  {c.aiReport ? (
                    <ScoreGauge score={c.aiReport.overallScore} size="sm" showLabel={false} />
                  ) : (
                    <span className="text-[10px] text-hoopoe-black/30 italic font-bold">قيد الانتظار</span>
                  )}
                </td>
                <td className="px-6 py-3 text-left text-xs text-hoopoe-black/40 font-bold">{formatRelativeTime(c.uploadedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
