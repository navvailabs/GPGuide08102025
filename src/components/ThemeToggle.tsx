import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 40,
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
        "bg-gray-200/50 dark:bg-black/30 backdrop-blur-md border border-gray-300/50 dark:border-white/10"
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <div className={cn(
        "w-full h-full flex items-center",
        isDark ? "justify-end" : "justify-start"
      )}>
        <motion.div
          layout
          transition={spring}
          className="h-6 w-6 rounded-full bg-white dark:bg-slate-700 shadow-lg flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? "moon" : "sun"}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-slate-300" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </button>
  );
};

export default ThemeToggle;
