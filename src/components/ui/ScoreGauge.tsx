'use client';

import { useEffect, useState } from 'react';
import { cn, getScoreColor } from '@/lib/utils';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function ScoreGauge({ score, size = 'md', showLabel = true, className }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const dimensions = { sm: 56, md: 80, lg: 120 };
  const strokes = { sm: 4, md: 6, lg: 8 };
  const fontSizes = { sm: 'text-sm', md: 'text-xl', lg: 'text-3xl' };

  const d = dimensions[size];
  const stroke = strokes[size];
  const radius = (d - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const strokeColor =
    score >= 80 ? '#22875A' : score >= 60 ? '#D4793A' : score >= 40 ? '#E8994A' : '#B04A1E';

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={d} height={d} className="-rotate-90">
        <circle cx={d / 2} cy={d / 2} r={radius} stroke="#E5E0DD" strokeWidth={stroke} fill="none" />
        <circle
          cx={d / 2}
          cy={d / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-black', fontSizes[size], getScoreColor(score))}>{Math.round(animatedScore)}</span>
        {showLabel && size !== 'sm' && <span className="text-[9px] text-hoopoe-black/50 font-bold tracking-wider uppercase">Score</span>}
      </div>
    </div>
  );
}
