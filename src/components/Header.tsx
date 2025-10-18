import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BriefcaseMedical, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import BrightnessControl from './BrightnessControl';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

const Header = ({ variant: propVariant }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  // Determine variant: use prop, or decide based on theme and route
  const isLightModeActive = theme === 'light' && location.pathname === '/';
  const variant = propVariant || (isLightModeActive ? 'light' : 'default');

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Care Suite', href: '/gp-care-plan-generator' },
  ];

  const headerClasses = cn(
    "sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300",
    {
      'bg-black/30 border-white/10': variant === 'default',
      'bg-transparent border-white/10': variant === 'transparent',
      'bg-white/80 border-gray-200/60': variant === 'light',
    }
  );

  const isHomePage = location.pathname === '/';

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <BriefcaseMedical className={cn("h-8 w-8", variant === 'light' ? 'text-medical-blue' : 'text-success-green')} />
              <span className={cn("text-2xl font-satoshi font-bold", variant === 'light' ? 'text-gray-900' : 'text-white')}>GPGuide</span>
            </Link>
          </motion.div>

          {(variant === 'default' || variant === 'light') && (
            <>
              <nav className="hidden md:flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <a href={item.href} className={cn(
                      "px-4 py-2 text-sm rounded-lg transition-colors duration-200",
                      variant === 'light' 
                        ? 'font-medium text-gray-700 hover:bg-black/5 hover:text-black'
                        : 'text-trust-gray hover:text-premium-gold'
                    )}>
                      {item.name}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <div className="hidden md:flex items-center space-x-4 ml-4">
                <ThemeToggle />
                <BrightnessControl />
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    to="/login"
                    className={cn(
                      "inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap",
                      variant === 'light'
                        ? 'text-white bg-gray-900 shadow-md hover:bg-black'
                        : 'bg-premium-gold text-white hover:bg-opacity-90'
                    )}
                  >
                    Login
                  </Link>
                </motion.div>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <button onClick={() => setIsOpen(!isOpen)} className={cn(variant === 'light' ? 'text-gray-800' : 'text-white')}>
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </>
          )}
          
          {variant === 'transparent' && (
             <div className="flex items-center space-x-4">
              <ThemeToggle />
              <BrightnessControl />
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
        {isOpen && (variant === 'default' || variant === 'light') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn("md:hidden pb-4", variant === 'light' ? 'bg-white/95' : 'bg-black/80')}
          >
            <nav className="flex flex-col items-center space-y-2 pt-4 px-4">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className={cn(
                  "w-full text-center py-3 text-base rounded-lg transition-colors duration-200", 
                  variant === 'light' 
                    ? 'font-medium text-gray-700 hover:bg-black/5 hover:text-black' 
                    : 'text-trust-gray hover:text-premium-gold'
                )} onClick={() => setIsOpen(false)}>
                  {item.name}
                </a>
              ))}
              <Link to="/login" className={cn(
                "w-full text-center mt-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300", 
                variant === 'light' 
                  ? 'bg-gray-900 text-white hover:bg-black' 
                  : 'bg-premium-gold text-white hover:bg-opacity-90'
              )} onClick={() => setIsOpen(false)}>
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
