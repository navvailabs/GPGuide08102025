import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import RadialGradientBackground from '@/components/ui/RadialGradientBackground';
import AppHeader from './AppHeader';
import type { ActiveView } from '@/pages/CarePlanSuite';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface CarePlanLayoutProps {
  children: React.ReactNode;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const CarePlanLayout = ({ children, activeView, setActiveView }: CarePlanLayoutProps) => {
    const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleContentClick = () => {
        // Only collapse on desktop if it's currently open
        if (!isDesktopSidebarCollapsed) {
            setIsDesktopSidebarCollapsed(true);
        }
    };

    const handleDesktopItemClick = () => {
        if (!isDesktopSidebarCollapsed) {
            setIsDesktopSidebarCollapsed(true);
        }
    };

    return (
        <div className="font-display text-foreground-dark bg-transparent min-h-screen">
            <RadialGradientBackground />
            <div className="relative flex min-h-screen">
                <Sidebar
                    isDesktopCollapsed={isDesktopSidebarCollapsed}
                    setIsDesktopCollapsed={setIsDesktopSidebarCollapsed}
                    isMobileOpen={isMobileSidebarOpen}
                    setIsMobileOpen={setIsMobileSidebarOpen}
                    activeView={activeView}
                    setActiveView={setActiveView}
                    onDesktopItemClick={handleDesktopItemClick}
                />
                <div 
                    className={cn(
                        "flex-1 flex flex-col w-full transition-all duration-300 ease-in-out",
                        isDesktopSidebarCollapsed ? "md:ml-20" : "md:ml-80"
                    )}
                    onClick={handleContentClick}
                >
                    <AppHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
                    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
                    </main>
                </div>
                
                {/* Floating Toggle Button for Desktop */}
                <div className="hidden md:block">
                    <motion.button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the main content click handler from firing
                            setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
                        }} 
                        className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 fixed top-5 z-40"
                        aria-label={isDesktopSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        initial={false}
                        animate={{ left: isDesktopSidebarCollapsed ? '4.125rem' : '19.125rem' }}
                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.7)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isDesktopSidebarCollapsed ? 'right' : 'left'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isDesktopSidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default CarePlanLayout;
