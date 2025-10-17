import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface InspiredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const InspiredCard = ({ className, children, ...props }: InspiredCardProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        theme === 'light'
          ? 'bg-white border border-gray-200/75 shadow-inspired-light'
          : 'bg-[#1A1B1E]/85 backdrop-blur-lg border border-white/10 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default InspiredCard;
