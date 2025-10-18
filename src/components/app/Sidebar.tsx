import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, HeartPulse, BriefcaseMedical, X, Bone, ClipboardList, HardHat, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ActiveView } from '@/pages/CarePlanSuite';

const carePlanItems = [
    { name: 'GP Care Plan', view: 'gp-care-plan' as const, icon: LayoutGrid, color: 'text-sky-500 dark:text-sky-400' },
    { name: 'Mental Health Care Plan', view: 'mental-health-care-plan' as const, icon: HeartPulse, color: 'text-rose-500 dark:text-rose-400' },
];

const toolItems = [
    { name: 'DEXA Scan Interpreter', view: 'dexa-scan-tool' as const, icon: Bone, color: 'text-amber-500 dark:text-amber-400' },
    { name: 'Opioid MEDD Assist Tool', view: 'medd-assist-tool' as const, icon: Calculator, color: 'text-teal-500 dark:text-teal-400' },
];

const formItems = [
    { name: 'Centrelink SU415', view: 'centrelink-form-assist' as const, icon: ClipboardList, color: 'text-green-500 dark:text-green-400' },
    { name: 'Workers Comp', view: 'workers-comp-assist' as const, icon: HardHat, color: 'text-orange-500 dark:text-orange-400' },
];

interface SidebarItemProps extends React.ComponentProps<'button'> {
    item: { name: string; view: ActiveView; icon: React.ElementType; color: string; };
    isCollapsed: boolean;
    isActive: boolean;
}

const SidebarItem = ({ item, isCollapsed, isActive, ...props }: SidebarItemProps) => {
    return (
        <button
            className={cn(
                "w-full flex items-center p-3 my-0.5 rounded-lg transition-colors duration-200",
                isActive
                    ? 'bg-gray-200/70 dark:bg-white/10 text-gray-900 dark:text-white font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-white/5',
                isCollapsed ? 'justify-center' : ''
            )}
            title={isCollapsed ? item.name : ''}
            {...props}
        >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
            {!isCollapsed && <span className="ml-4 font-normal whitespace-nowrap">{item.name}</span>}
        </button>
    );
};


interface SidebarContentProps {
    isCollapsed: boolean;
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
    onLinkClick?: () => void;
}

const SidebarContent = ({ isCollapsed, activeView, setActiveView, onLinkClick }: SidebarContentProps) => (
    <nav className="flex-1 px-3 py-6 space-y-6">
        <div>
            {!isCollapsed && <h3 className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Care Plans</h3>}
            {carePlanItems.map(item => (
                <SidebarItem
                    key={item.name}
                    item={item}
                    isCollapsed={isCollapsed}
                    isActive={activeView === item.view}
                    onClick={() => {
                        setActiveView(item.view);
                        if (onLinkClick) onLinkClick();
                    }}
                />
            ))}
        </div>
        <div>
            {!isCollapsed && <h3 className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Tools</h3>}
            {toolItems.map(item => (
                 <SidebarItem
                    key={item.name}
                    item={item}
                    isCollapsed={isCollapsed}
                    isActive={activeView === item.view}
                    onClick={() => {
                        setActiveView(item.view);
                        if (onLinkClick) onLinkClick();
                    }}
                />
            ))}
        </div>
        <div>
            {!isCollapsed && <h3 className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Forms</h3>}
            {formItems.map(item => (
                 <SidebarItem
                    key={item.name}
                    item={item}
                    isCollapsed={isCollapsed}
                    isActive={activeView === item.view}
                    onClick={() => {
                        setActiveView(item.view);
                        if (onLinkClick) onLinkClick();
                    }}
                />
            ))}
        </div>
    </nav>
);

interface SidebarProps {
    isDesktopCollapsed: boolean;
    setIsDesktopCollapsed: (isCollapsed: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (isOpen: boolean) => void;
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
}

const Sidebar = ({ isDesktopCollapsed, isMobileOpen, setIsMobileOpen, activeView, setActiveView }: SidebarProps) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div
                animate={{ width: isDesktopCollapsed ? '5rem' : '20rem' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="hidden md:flex flex-col fixed top-0 left-0 h-full bg-gray-100/90 dark:bg-[#16181C]/90 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 z-30"
            >
                <div className="flex flex-col h-full">
                    <div className={cn("flex items-center p-4 border-b border-gray-200 dark:border-gray-800 h-12 transition-all duration-300", isDesktopCollapsed ? 'justify-center' : 'justify-start px-5')}>
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
                                    <BriefcaseMedical className="h-7 w-7 text-medical-blue dark:text-success-green" />
                                    <span className="text-xl font-satoshi font-bold text-gray-900 dark:text-white">GPGuide</span>
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
                                    <BriefcaseMedical className="h-7 w-7 text-medical-blue dark:text-success-green" />
                                </Link>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <SidebarContent 
                        isCollapsed={isDesktopCollapsed} 
                        activeView={activeView} 
                        setActiveView={setActiveView} 
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
                            className="fixed top-0 left-0 h-full w-64 bg-gray-100/90 dark:bg-[#16181C]/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col md:hidden"
                        >
                             <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 h-12">
                                <Link to="/" className="flex items-center space-x-2">
                                    <BriefcaseMedical className="h-7 w-7 text-medical-blue dark:text-success-green" />
                                    <span className="text-xl font-satoshi font-bold text-gray-900 dark:text-white">GPGuide</span>
                                </Link>
                                <button onClick={() => setIsMobileOpen(false)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white p-2">
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
