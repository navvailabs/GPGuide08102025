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
        'rounded-[20px] p-6 transition-all duration-300',
        theme === 'light'
          ? 'bg-gray-100 shadow-clay-light'
          : 'bg-[#1A1B1E]/85 backdrop-blur-lg border border-white/10 shadow-clay-dark',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default InspiredCard;
