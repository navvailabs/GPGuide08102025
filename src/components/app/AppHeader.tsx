import { Link } from 'react-router-dom';
import { Home, Menu, BriefcaseMedical } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const AppHeader = ({ onMenuClick }: AppHeaderProps) => {
  const { theme } = useTheme();
  return (
    <header className={cn(
        "sticky top-0 z-40 backdrop-blur-md border-b",
        theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-[#16181C]/80 border-gray-800'
    )}>
      <div className="flex items-center justify-between h-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button onClick={onMenuClick} className="text-gray-800 dark:text-white p-2 -ml-2 md:hidden">
                <Menu />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2">
              <BriefcaseMedical className="h-7 w-7 text-premium-gold" />
              <span className="hidden sm:inline text-xl font-satoshi font-bold text-gradient-gold">
                  GPGuide
              </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                "text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-white/10"
              )}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
