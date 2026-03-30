'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import Card from '@/components/ui/Card';
import { Users, Brain, Send, Rocket, TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / 20));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
}

export default function StatsCards() {
  const candidates = useCandidatesStore((s) => s.candidates);

  const totalCandidates = candidates.length;
  const inPipeline = candidates.filter((c) => !['onboarding', 'offer_accepted'].includes(c.stage)).length;
  const reportsGenerated = candidates.filter((c) => c.aiReport).length;
  const offersSent = candidates.filter((c) => ['offer_sent', 'offer_accepted', 'onboarding'].includes(c.stage)).length;

  const stats = [
    { label: 'إجمالي المرشحين', value: totalCandidates, icon: Users, trend: '+٣ هذا الأسبوع', up: true, color: 'bg-hoopoe-orange/10 text-hoopoe-orange' },
    { label: 'في مراحل التوظيف', value: inPipeline, icon: Brain, trend: `${inPipeline} نشط`, up: true, color: 'bg-hoopoe-navy/10 text-hoopoe-navy' },
    { label: 'تقارير الذكاء الاصطناعي', value: reportsGenerated, icon: Brain, trend: '٩٢٪ تحليل تلقائي', up: true, color: 'bg-hoopoe-lt-orange/30 text-hoopoe-brown' },
    { label: 'عروض مرسلة', value: offersSent, icon: Send, trend: '٦٧٪ نسبة القبول', up: true, color: 'bg-hoopoe-success/10 text-hoopoe-success' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} hover className={`card-entrance hover-glow stagger-${i + 1}`} padding="md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-hoopoe-black/50 tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-hoopoe-black mt-1">
                  <AnimatedNumber value={stat.value} />
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.color} transition-transform duration-300 hover:scale-110`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs">
              {stat.up ? <TrendingUp size={12} className="text-hoopoe-success" /> : <TrendingDown size={12} className="text-hoopoe-brown" />}
              <span className="text-hoopoe-black/50 font-bold">{stat.trend}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
