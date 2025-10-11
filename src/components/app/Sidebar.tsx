import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, HeartPulse, BriefcaseMedical, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ActiveView } from '@/pages/CarePlanSuite';

const navItems = [
    { name: 'GP Care Plan', view: 'gp-care-plan', icon: LayoutGrid, color: 'text-sky-400', glowColor: 'bg-sky-400/30' },
    { name: 'Mental Health Care Plan', view: 'mental-health-care-plan', icon: HeartPulse, color: 'text-rose-400', glowColor: 'bg-rose-400/30' },
];

interface SidebarContentProps {
    isCollapsed: boolean;
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
    onLinkClick?: () => void;
}

const SidebarContent = ({ isCollapsed, activeView, setActiveView, onLinkClick }: SidebarContentProps) => (
    <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
            <button
                key={item.name}
                onClick={() => {
                    setActiveView(item.view as ActiveView);
                    if (onLinkClick) onLinkClick();
                }}
                className={cn(
                    "w-full relative flex items-center p-3 rounded-lg transition-colors duration-200",
                    activeView === item.view ? 'text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                    isCollapsed ? 'justify-center' : ''
                )}
                title={isCollapsed ? item.name : ''}
            >
                {activeView === item.view && (
                    <motion.div
                        layoutId="active-sidebar-item-bg"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
                
                <div className="relative">
                    <item.icon className={cn("relative z-10 h-5 w-5 flex-shrink-0 transition-colors", item.color)} />
                    {activeView === item.view && (
                         <div className={cn("absolute -inset-2 rounded-full blur-lg", item.glowColor)} />
                    )}
                </div>

                {!isCollapsed && <span className="ml-4 font-medium relative z-10 whitespace-nowrap">{item.name}</span>}
            </button>
        ))}
    </nav>
);

interface SidebarProps {
    isDesktopCollapsed: boolean;
    setIsDesktopCollapsed: (isCollapsed: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (isOpen: boolean) => void;
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
    onDesktopItemClick: () => void;
}

const Sidebar = ({ isDesktopCollapsed, isMobileOpen, setIsMobileOpen, activeView, setActiveView, onDesktopItemClick }: SidebarProps) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div
                animate={{ width: isDesktopCollapsed ? '5rem' : '20rem' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hidden md:flex flex-col fixed top-0 left-0 h-full bg-black/20 backdrop-blur-lg border-r border-white/10 z-30"
            >
                <div className="flex flex-col h-full">
                    <div className={cn("flex items-center p-4 border-b border-white/10 h-16 transition-all duration-300", isDesktopCollapsed ? 'justify-center' : 'justify-start px-5')}>
                        <AnimatePresence>
                        {!isDesktopCollapsed ? (
                            <motion.div
                                key="full-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link to="/" className="flex items-center space-x-2">
                                    <BriefcaseMedical className="h-7 w-7 text-success-green" />
                                    <span className="text-xl font-satoshi font-bold text-white">GPGuide</span>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="icon-logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link to="/">
                                    <BriefcaseMedical className="h-7 w-7 text-success-green" />
                                </Link>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <SidebarContent 
                        isCollapsed={isDesktopCollapsed} 
                        activeView={activeView} 
                        setActiveView={setActiveView} 
                        onLinkClick={onDesktopItemClick} 
                    />
                </div>
            </motion.div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <Fragment>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 left-0 h-full w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col md:hidden"
                        >
                             <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
                                <Link to="/" className="flex items-center space-x-2">
                                    <BriefcaseMedical className="h-7 w-7 text-success-green" />
                                    <span className="text-xl font-satoshi font-bold text-white">GPGuide</span>
                                </Link>
                                <button onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-white p-2">
                                    <X />
                                </button>
                            </div>
                            <SidebarContent 
                                isCollapsed={false} 
                                activeView={activeView} 
                                setActiveView={setActiveView} 
                                onLinkClick={() => setIsMobileOpen(false)} 
                            />
                        </motion.div>
                    </Fragment>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
