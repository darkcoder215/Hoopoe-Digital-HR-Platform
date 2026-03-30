import { cn } from '@/lib/utils';
import { PipelineStage } from '@/lib/types';
import { PIPELINE_STAGES } from '@/lib/constants';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'neutral' | 'stage';
  stage?: PipelineStage;
  children?: React.ReactNode;
  className?: string;
}

const stageVariantMap: Record<PipelineStage, string> = {
  cv_received: 'bg-hoopoe-lt-gray/60 text-hoopoe-black',
  ai_analysis: 'bg-hoopoe-lt-orange/40 text-hoopoe-brown',
  screening: 'bg-hoopoe-mid-orange/20 text-hoopoe-brown',
  interview: 'bg-hoopoe-orange/15 text-hoopoe-brown',
  ceo_interview: 'bg-hoopoe-brown/15 text-hoopoe-brown',
  technical_task: 'bg-hoopoe-navy/10 text-hoopoe-navy',
  offer_sent: 'bg-hoopoe-orange/20 text-hoopoe-orange',
  offer_accepted: 'bg-hoopoe-success/15 text-hoopoe-success',
  onboarding: 'bg-hoopoe-success/20 text-hoopoe-success',
};

export default function Badge({ variant = 'neutral', stage, children, className }: BadgeProps) {
  const stageInfo = stage ? PIPELINE_STAGES.find((s) => s.key === stage) : null;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium tracking-wide rounded-full whitespace-nowrap',
        variant === 'stage' && stage ? stageVariantMap[stage] : '',
        variant === 'primary' && 'bg-hoopoe-orange/15 text-hoopoe-brown',
        variant === 'success' && 'bg-hoopoe-success/15 text-hoopoe-success',
        variant === 'warning' && 'bg-hoopoe-lt-orange/40 text-hoopoe-brown',
        variant === 'neutral' && 'bg-hoopoe-black/[0.06] text-hoopoe-black',
        className
      )}
    >
      {variant === 'stage' && stageInfo ? stageInfo.label : children}
    </span>
  );
}
