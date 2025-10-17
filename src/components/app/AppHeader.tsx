import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import BrightnessControl from '@/components/BrightnessControl';
import ThemeToggle from '@/components/ThemeToggle';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const AppHeader = ({ onMenuClick }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 bg-white/50 dark:bg-black/30 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-end h-16">
          <div className="md:hidden">
            {onMenuClick && (
              <button onClick={onMenuClick} className="text-gray-800 dark:text-white p-2 -ml-2">
                  <Menu />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <BrightnessControl />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-white border border-gray-400/50 dark:border-white/20 rounded-full font-semibold hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300 text-sm"
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
