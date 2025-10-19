import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import RadialGradientBackground from '@/components/ui/RadialGradientBackground';
import AppHeader from './AppHeader';
import type { ActiveView } from '@/pages/CarePlanSuite';

interface CarePlanLayoutProps {
  children: React.ReactNode;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const CarePlanLayout = ({ children, activeView, setActiveView }: CarePlanLayoutProps) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="font-display text-gray-800 dark:text-foreground-dark min-h-screen">
            <RadialGradientBackground />
            <AppHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
            <div className="relative flex">
                <Sidebar
                    isMobileOpen={isMobileSidebarOpen}
                    setIsMobileOpen={setIsMobileSidebarOpen}
                    activeView={activeView}
                    setActiveView={setActiveView}
                />
                <main 
                    className={cn(
                        "flex-1 w-full pt-12", // pt-12 for header height
                        "md:ml-80" // margin for sidebar
                    )}
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeView}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CarePlanLayout;
