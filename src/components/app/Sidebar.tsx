import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, HeartPulse, X, Bone, ClipboardList, HardHat, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActiveView } from '@/pages/CarePlanSuite';
import { useTheme } from '@/contexts/ThemeContext';

const carePlanItems = [
    { name: 'GP Care Plan', view: 'gp-care-plan' as const, icon: LayoutGrid, color: 'text-sky-400' },
    { name: 'Mental Health Care Plan', view: 'mental-health-care-plan' as const, icon: HeartPulse, color: 'text-rose-400' },
];

const toolItems = [
    { name: 'DEXA Scan Interpreter', view: 'dexa-scan-tool' as const, icon: Bone, color: 'text-amber-400' },
    { name: 'Opioid MEDD Assist Tool', view: 'medd-assist-tool' as const, icon: Calculator, color: 'text-teal-400' },
];

const formItems = [
    { name: 'Centrelink SU415', view: 'centrelink-form-assist' as const, icon: ClipboardList, color: 'text-green-400' },
    { name: 'Workers Comp', view: 'workers-comp-assist' as const, icon: HardHat, color: 'text-orange-400' },
];

interface SidebarItemProps extends React.ComponentProps<'button'> {
    item: { name: string; view: ActiveView; icon: React.ElementType; color: string; };
    isActive: boolean;
}

const SidebarItem = ({ item, isActive, ...props }: SidebarItemProps) => {
    const { theme } = useTheme();
    return (
        <motion.button
            layout
            className={cn(
                "w-full flex items-center p-3 rounded-lg transition-all duration-200 text-sm",
                isActive
                    ? theme === 'light'
                        ? 'bg-gray-100 text-gray-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] border border-black/5'
                        : 'bg-black/30 dark:bg-white/10 text-white border border-white/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]'
                    : theme === 'light'
                        ? 'text-gray-700 hover:bg-gray-100/60 hover:text-gray-900'
                        : 'text-gray-400 hover:bg-black/10 dark:hover:bg-white/5 hover:text-white',
            )}
            {...props}
        >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
            <span className={cn(
                "whitespace-nowrap ml-3",
                isActive ? "font-bold" : "font-medium"
            )}>
                {item.name}
            </span>
        </motion.button>
    );
};


interface SidebarContentProps {
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
    onLinkClick?: () => void;
}

const SidebarContent = ({ activeView, setActiveView, onLinkClick }: SidebarContentProps) => {
    const { theme } = useTheme();

    const renderItems = (items: typeof carePlanItems) => items.map(item => (
        <SidebarItem
            key={item.name}
            item={item}
            isActive={activeView === item.view}
            onClick={() => {
                setActiveView(item.view);
                if (onLinkClick) onLinkClick();
            }}
        />
    ));

    return (
        <nav className="flex-1 flex flex-col space-y-6 overflow-y-auto pr-1">
            <div>
                <h3 className={cn(
                    "px-2 mb-2 text-xs font-semibold uppercase tracking-wider",
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                )}>Care Plans</h3>
                <div className={cn(
                    "rounded-2xl p-2 space-y-1",
                    theme === 'light' 
                        ? 'bg-white border border-gray-200/80 shadow-sm' 
                        : 'bg-black/10 dark:bg-black/20'
                )}>
                    {renderItems(carePlanItems)}
                </div>
            </div>
            <div>
                <h3 className={cn(
                    "px-2 mb-2 text-xs font-semibold uppercase tracking-wider",
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                )}>Tools</h3>
                <div className={cn(
                    "rounded-2xl p-2 space-y-1",
                    theme === 'light' 
                        ? 'bg-white border border-gray-200/80 shadow-sm' 
                        : 'bg-black/10 dark:bg-black/20'
                )}>
                    {renderItems(toolItems)}
                </div>
            </div>
            <div>
                <h3 className={cn(
                    "px-2 mb-2 text-xs font-semibold uppercase tracking-wider",
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                )}>Forms</h3>
                <div className={cn(
                    "rounded-2xl p-2 space-y-1",
                    theme === 'light' 
                        ? 'bg-white border border-gray-200/80 shadow-sm' 
                        : 'bg-black/10 dark:bg-black/20'
                )}>
                    {renderItems(formItems)}
                </div>
            </div>
        </nav>
    );
};

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (isOpen: boolean) => void;
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
}

const Sidebar = ({ isMobileOpen, setIsMobileOpen, activeView, setActiveView }: SidebarProps) => {
    const { theme } = useTheme();
    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className="hidden md:flex flex-col fixed top-[9.5rem] left-0 h-[calc(100vh-9.5rem)] z-30 w-80 p-4"
            >
                <SidebarContent 
                    activeView={activeView} 
                    setActiveView={setActiveView} 
                />
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <Fragment>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 left-0 h-full w-80 bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-r border-gray-200 dark:border-white/10 z-50 flex flex-col md:hidden p-4"
                        >
                             <div className={cn(
                                 "flex items-center justify-end border-b pb-4 mb-4 h-12",
                                 theme === 'light' ? 'border-gray-200' : 'border-white/10'
                             )}>
                                <button onClick={() => setIsMobileOpen(false)} className={cn("p-2", theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white')}>
                                    <X />
                                </button>
                            </div>
                            <SidebarContent 
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
