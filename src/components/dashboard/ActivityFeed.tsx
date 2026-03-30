'use client';

import Card from '@/components/ui/Card';
import { mockActivities } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';
import { Upload, GitBranch, Brain, MessageSquare, Send, Activity } from 'lucide-react';

const iconMap: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  upload: { icon: Upload, color: 'text-hoopoe-orange', bg: 'bg-hoopoe-orange/10' },
  stage_change: { icon: GitBranch, color: 'text-hoopoe-navy', bg: 'bg-hoopoe-navy/10' },
  report_generated: { icon: Brain, color: 'text-hoopoe-brown', bg: 'bg-hoopoe-brown/10' },
  note_added: { icon: MessageSquare, color: 'text-hoopoe-mid-orange', bg: 'bg-hoopoe-mid-orange/10' },
  offer_sent: { icon: Send, color: 'text-hoopoe-success', bg: 'bg-hoopoe-success/10' },
};

const typeLabels: Record<string, string> = {
  upload: 'رفع سيرة',
  stage_change: 'تغيير مرحلة',
  report_generated: 'تقرير جاهز',
  note_added: 'ملاحظة',
  offer_sent: 'عرض عمل',
};

export default function ActivityFeed() {
  return (
    <Card className="card-entrance stagger-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="section-icon bg-hoopoe-success/8">
          <Activity size={16} className="text-hoopoe-success" />
        </div>
        <div>
          <h2 className="text-sm font-black text-hoopoe-black">آخر النشاطات</h2>
          <p className="text-[11px] text-hoopoe-black/35 font-semibold">أحدث الأحداث في المنصة</p>
        </div>
      </div>

      {/* Activity Items */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute right-[17px] top-4 bottom-4 w-px bg-gradient-to-b from-hoopoe-lt-gray via-hoopoe-lt-gray/50 to-transparent" />

        <div className="space-y-1">
          {mockActivities.map((activity, i) => {
            const { icon: Icon, color, bg } = iconMap[activity.type] || iconMap.upload;
            return (
              <div
                key={activity.id}
                className={`flex gap-3 p-2.5 rounded-xl hover:bg-hoopoe-surface/40 transition-all duration-200 relative slide-in-rtl stagger-${i + 1}`}
              >
                {/* Icon */}
                <div className={`w-[34px] h-[34px] rounded-xl ${bg} flex items-center justify-center flex-shrink-0 z-10 border-2 border-white`}>
                  <Icon size={14} className={color} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-black text-hoopoe-black">{activity.candidateName}</span>
                    <span className="text-[9px] font-bold text-hoopoe-black/25 bg-hoopoe-surface px-1.5 py-0.5 rounded-md">{typeLabels[activity.type]}</span>
                  </div>
                  <p className="text-[11px] text-hoopoe-black/50 font-semibold leading-relaxed line-clamp-1">{activity.description}</p>
                  <p className="text-[10px] text-hoopoe-black/25 mt-1 font-semibold">{formatRelativeTime(activity.timestamp)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
