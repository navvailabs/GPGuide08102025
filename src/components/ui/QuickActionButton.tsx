import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface QuickActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const QuickActionButton = React.forwardRef<HTMLButtonElement, QuickActionButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center', // Removed justify-center and text-center for flexibility
          'px-3 py-1.5 rounded-full',
          'text-xs font-medium leading-tight',
          'transition-all duration-200',
          'border',
          theme === 'light'
            ? 'bg-gray-100 text-gray-800 border-transparent hover:bg-gray-200 shadow-[0_0.7px_0.7px_-0.67px_rgba(0,0,0,0.08),0_1.8px_1.8px_-1.33px_rgba(0,0,0,0.08),0_3.6px_3.6px_-2px_rgba(0,0,0,0.07),0_6.9px_6.9px_-2.67px_rgba(0,0,0,0.07),0_13.6px_13.6px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_1px_0px_0_rgb(255,255,255)]'
            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10 shadow-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 dark:focus-visible:ring-blue-400/70',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

QuickActionButton.displayName = 'QuickActionButton';

export { QuickActionButton };
