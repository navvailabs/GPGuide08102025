import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, HeartPulse, BriefcaseMedical, X, Bone, ClipboardList, HardHat, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ActiveView } from '@/pages/CarePlanSuite';
import { useTheme } from '@/contexts/ThemeContext';

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

interface NavItemProps extends React.ComponentProps<'button'> {
    item: { name: string; view: ActiveView; icon: React.ElementType; color: string; };
    isCollapsed: boolean;
    isActive: boolean;
}

const NavItem = ({ item, isCollapsed, isActive, ...props }: NavItemProps) => {
    const { theme } = useTheme();
    return (
        <button
            className={cn(
                "w-full flex items-center p-3 my-0.5 rounded-xl transition-all duration-300 group",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-black",
                isActive
                    ? (theme === 'light'
                        ? 'bg-white text-gray-900 font-semibold shadow-md'
                        : 'bg-[#2A2146]/80 backdrop-blur-sm text-white font-semibold shadow-lg border border-white/10')
                    : (theme === 'light'
                        ? 'text-gray-600 hover:bg-gray-200/60'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'),
                isCollapsed ? 'justify-center' : ''
            )}
            title={isCollapsed ? item.name : ''}
            {...props}
        >
            <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive ? item.color : (theme === 'light' ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-200')
            )} />
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.span
                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                        animate={{ width: 'auto', opacity: 1, marginLeft: '1rem' }}
                        exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="font-normal whitespace-nowrap overflow-hidden"
                    >
                        {item.name}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};

const NavGroup = ({ title, children, isCollapsed }: { title: string; children: React.ReactNode; isCollapsed: boolean }) => {
    return (
        <div>
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.h3
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-3 pt-4 pb-2 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase overflow-hidden"
                    >
                        {title}
                    </motion.h3>
                )}
            </AnimatePresence>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
};


interface SidebarContentProps {
    isCollapsed: boolean;
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
    onLinkClick?: () => void;
}

const SidebarContent = ({ isCollapsed, activeView, setActiveView, onLinkClick }: SidebarContentProps) => (
    <div className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        <NavGroup title="Care Plans" isCollapsed={isCollapsed}>
            {carePlanItems.map(item => (
                <NavItem
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
        </NavGroup>
        <NavGroup title="Tools" isCollapsed={isCollapsed}>
            {toolItems.map(item => (
                <NavItem
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
        </NavGroup>
        <NavGroup title="Forms" isCollapsed={isCollapsed}>
            {formItems.map(item => (
                <NavItem
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
        </NavGroup>
    </div>
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
                className="hidden md:flex flex-col fixed top-0 left-0 h-full z-30"
            >
                <div className="flex flex-col h-full">
                    <div className={cn("flex items-center p-4 border-b border-gray-200/0 dark:border-gray-800/0 h-12 transition-all duration-300", isDesktopCollapsed ? 'justify-center' : 'justify-start px-5')}>
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
