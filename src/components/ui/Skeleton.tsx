import { cn } from '@/lib/utils';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded bg-gradient-to-r from-hoopoe-lt-gray via-hoopoe-surface to-hoopoe-lt-gray bg-[length:200%_100%] animate-shimmer',
        className
      )}
    />
  );
}
