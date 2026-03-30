import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ className, highlighted, hover = false, padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-hoopoe-lt-gray/60 rounded-2xl shadow-sm',
        'transition-all duration-300',
        highlighted && 'border-r-[3px] border-r-hoopoe-orange',
        hover && 'hover:shadow-md hover:-translate-y-0.5',
        {
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
