import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-gray-200/50 dark:bg-black/30 backdrop-blur-md border border-gray-300/50 dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-white hover:bg-gray-300/50 dark:hover:bg-black/50 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Change theme"
      title="Change theme"
    >
      <Palette className="w-5 h-5" />
    </motion.button>
  );
};

export default ThemeToggle;
