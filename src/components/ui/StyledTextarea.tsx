import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export interface StyledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const StyledTextarea = React.forwardRef<HTMLTextAreaElement, StyledTextareaProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <div
        className={cn(
          'group flex w-full rounded-2xl px-5 py-3.5 transition-all duration-300',
          'focus-within:ring-2 focus-within:ring-blue-500/70 dark:focus-within:ring-blue-400/70',
          theme === 'light'
            ? 'bg-[#f5f5f5] shadow-[0_0.7px_0.7px_-0.67px_rgba(0,0,0,0.08),0_1.8px_1.8px_-1.33px_rgba(0,0,0,0.08),0_3.6px_3.6px_-2px_rgba(0,0,0,0.07),0_6.9px_6.9px_-2.67px_rgba(0,0,0,0.07),0_13.6px_13.6px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)]'
            : 'bg-black/20 border border-white/10 shadow-lg',
          className
        )}
      >
        <textarea
          ref={ref}
          {...props}
          className={cn(
            'w-full bg-transparent outline-none border-none focus:ring-0 focus-visible:outline-none text-base leading-6 resize-none',
            'text-black placeholder:text-black/40',
            'dark:text-white dark:placeholder:text-gray-400'
          )}
        />
      </div>
    );
  }
);

StyledTextarea.displayName = 'StyledTextarea';

export { StyledTextarea };
