import React from 'react';
import AppHeader from './AppHeader';
import RadialGradientBackground from '@/components/ui/RadialGradientBackground';
import { cn } from '@/lib/utils';

const AppLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("font-display text-foreground-dark", className)}>
      <RadialGradientBackground />
      <div className="relative flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
