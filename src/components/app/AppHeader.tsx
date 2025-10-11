import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-white border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-sm"
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
