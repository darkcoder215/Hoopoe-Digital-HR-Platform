'use client';

import Card from '@/components/ui/Card';
import { mockActivities } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';
import { Upload, GitBranch, Brain, MessageSquare, Send } from 'lucide-react';

const iconMap: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  upload: { icon: Upload, color: 'text-hoopoe-orange', bg: 'bg-hoopoe-orange/10' },
  stage_change: { icon: GitBranch, color: 'text-hoopoe-navy', bg: 'bg-hoopoe-navy/10' },
  report_generated: { icon: Brain, color: 'text-hoopoe-brown', bg: 'bg-hoopoe-brown/10' },
  note_added: { icon: MessageSquare, color: 'text-hoopoe-mid-orange', bg: 'bg-hoopoe-mid-orange/10' },
  offer_sent: { icon: Send, color: 'text-hoopoe-success', bg: 'bg-hoopoe-success/10' },
};

export default function ActivityFeed() {
  return (
    <Card className="animate-slide-up stagger-7">
      <h2 className="text-sm font-bold text-hoopoe-black mb-1">Recent Activity</h2>
      <p className="text-xs text-hoopoe-black/40 mb-5">Latest pipeline events</p>

      <div className="space-y-0 relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-hoopoe-lt-gray" />

        {mockActivities.map((activity, i) => {
          const { icon: Icon, color, bg } = iconMap[activity.type] || iconMap.upload;
          return (
            <div key={activity.id} className={`flex gap-3 py-3 relative animate-fade-in stagger-${i + 1}`}>
              <div className={`w-[30px] h-[30px] rounded-lg ${bg} flex items-center justify-center flex-shrink-0 z-10`}>
                <Icon size={14} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-hoopoe-black leading-relaxed">
                  <span className="font-semibold">{activity.candidateName}</span>
                  {' — '}
                  {activity.description}
                </p>
                <p className="text-[10px] text-hoopoe-black/30 mt-0.5">{formatRelativeTime(activity.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
