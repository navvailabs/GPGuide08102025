import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BriefcaseMedical, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Features', 'Pricing', 'Testimonials'];

  const headerClasses = cn(
    "sticky top-0 z-50 backdrop-blur-xl border-b",
    variant === 'default' ? "bg-medical-blue/80 border-white/10" : "bg-black/30 border-white/10"
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <BriefcaseMedical className="h-8 w-8 text-success-green" />
              <span className="text-2xl font-satoshi font-bold text-white">GPGuide</span>
            </Link>
          </motion.div>

          {variant === 'default' && (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-trust-gray hover:text-premium-gold transition-colors duration-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <div className="hidden md:flex items-center space-x-4 ml-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2 text-white bg-premium-gold rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
                  >
                    Login
                  </Link>
                </motion.div>
              </div>

              <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </>
          )}
          
          {variant === 'transparent' && (
             <div className="flex items-center space-x-4">
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
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && variant === 'default' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-medical-blue pb-4"
          >
            <nav className="flex flex-col items-center space-y-4 pt-4">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-trust-gray hover:text-premium-gold transition-colors duration-300 py-2" onClick={() => setIsOpen(false)}>
                  {item}
                </a>
              ))}
              <Link to="/login" className="w-4/5 text-center px-6 py-3 text-white bg-premium-gold rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
