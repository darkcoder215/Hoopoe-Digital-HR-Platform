'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded transition-all duration-150 ease-in-out cursor-pointer',
          'focus:outline-none focus:ring-3 focus:ring-hoopoe-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-hoopoe-orange text-white hover:bg-hoopoe-brown active:bg-hoopoe-brown/90': variant === 'primary',
            'border-2 border-hoopoe-orange text-hoopoe-orange bg-transparent hover:bg-hoopoe-orange/10': variant === 'secondary',
            'text-hoopoe-black bg-transparent hover:bg-hoopoe-lt-gray/50': variant === 'ghost',
            'bg-hoopoe-brown text-white hover:bg-hoopoe-brown/90': variant === 'danger',
          },
          {
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-7 py-3.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
