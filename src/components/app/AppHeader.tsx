import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
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
        "sticky top-0 z-20 backdrop-blur-md border-b",
        theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-[#16181C]/80 border-gray-800'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-end h-12">
          <div className="md:hidden">
            {onMenuClick && (
              <button onClick={onMenuClick} className="text-gray-800 dark:text-white p-2 -ml-2">
                  <Menu />
              </button>
            )}
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
      </div>
    </header>
  );
};

export default AppHeader;
