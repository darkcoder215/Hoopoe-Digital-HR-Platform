'use client';

import { useCandidatesStore } from '@/stores/candidates-store';
import Card from '@/components/ui/Card';
import { Users, Brain, TrendingUp, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / 25));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [value]);
  return <><span>{display}</span>{suffix && <span className="text-sm font-bold text-hoopoe-black/30 ml-0.5">{suffix}</span>}</>;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 20 - (v / max) * 18;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="22" className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatsCards() {
  const candidates = useCandidatesStore((s) => s.candidates);

  const totalCandidates = candidates.length;
  const inPipeline = candidates.filter((c) => !['onboarding', 'offer_accepted'].includes(c.stage)).length;
  const reportsGenerated = candidates.filter((c) => c.aiReport).length;
  const offersSent = candidates.filter((c) => ['offer_sent', 'offer_accepted', 'onboarding'].includes(c.stage)).length;

  const stats = [
    {
      label: 'Total Candidates',
      value: totalCandidates,
      icon: Users,
      change: '+3',
      changeLabel: 'this week',
      up: true,
      color: 'text-hoopoe-orange',
      bg: 'bg-hoopoe-orange/8',
      iconBg: 'bg-gradient-to-br from-hoopoe-orange/15 to-hoopoe-orange/5',
      sparkData: [2, 4, 3, 6, 5, 8, 12],
      sparkColor: '#D4793A',
    },
    {
      label: 'In Pipeline',
      value: inPipeline,
      icon: Clock,
      change: `${inPipeline}`,
      changeLabel: 'active now',
      up: true,
      color: 'text-hoopoe-navy',
      bg: 'bg-hoopoe-navy/6',
      iconBg: 'bg-gradient-to-br from-hoopoe-navy/12 to-hoopoe-navy/4',
      sparkData: [5, 6, 4, 8, 7, 9, 10],
      sparkColor: '#1E2332',
    },
    {
      label: 'AI Reports',
      value: reportsGenerated,
      icon: Brain,
      change: '92%',
      changeLabel: 'automated',
      up: true,
      color: 'text-hoopoe-brown',
      bg: 'bg-hoopoe-lt-orange/20',
      iconBg: 'bg-gradient-to-br from-hoopoe-lt-orange/30 to-hoopoe-lt-orange/10',
      sparkData: [3, 5, 4, 7, 6, 9, 10],
      sparkColor: '#B04A1E',
    },
    {
      label: 'Offers Accepted',
      value: offersSent,
      icon: CheckCircle2,
      change: '67%',
      changeLabel: 'acceptance rate',
      up: true,
      color: 'text-hoopoe-success',
      bg: 'bg-hoopoe-success/6',
      iconBg: 'bg-gradient-to-br from-hoopoe-success/12 to-hoopoe-success/4',
      sparkData: [1, 2, 1, 3, 2, 3, 4],
      sparkColor: '#22875A',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            hover
            className={`card-entrance hover-lift metric-accent stagger-${i + 1}`}
            padding="md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                <Icon size={18} className={stat.color} />
              </div>
              <MiniSparkline data={stat.sparkData} color={stat.sparkColor} />
            </div>

            <p className="text-[11px] font-bold text-hoopoe-black/40 uppercase tracking-wide mb-1">{stat.label}</p>
            <p className="text-[28px] font-black text-hoopoe-black leading-none mb-3">
              <AnimatedNumber value={stat.value} />
            </p>

            <div className="flex items-center gap-1.5 pt-3 border-t border-hoopoe-lt-gray/40">
              <div className="flex items-center gap-0.5">
                {stat.up ? (
                  <ArrowUpRight size={11} className="text-hoopoe-success" />
                ) : (
                  <TrendingUp size={11} className="text-hoopoe-brown rotate-180" />
                )}
                <span className="text-[11px] font-black text-hoopoe-success">{stat.change}</span>
              </div>
              <span className="text-[10px] text-hoopoe-black/35 font-semibold">{stat.changeLabel}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
