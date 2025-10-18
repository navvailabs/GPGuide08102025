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

  const variant = propVariant || (theme === 'light' && location.pathname === '/' ? 'light' : 'default');

  const navItems = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Care Suite', href: '/gp-care-plan-generator' },
  ];

  const headerClasses = cn(
    "sticky top-0 z-50 backdrop-blur-xl border-b",
    {
      'bg-black/30 border-white/10': variant === 'default',
      'bg-transparent border-white/10': variant === 'transparent',
      'bg-white/80 border-gray-200': variant === 'light',
    }
  );
  
  const isHomePage = location.pathname === '/';

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
              <BriefcaseMedical className={cn("h-8 w-8", variant === 'light' ? 'text-medical-blue' : 'text-success-green')} />
              <span className={cn("text-2xl font-satoshi font-bold", variant === 'light' ? 'text-gray-900' : 'text-white')}>GPGuide</span>
            </Link>
          </motion.div>

          {(variant === 'default' || variant === 'light') && (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {item.href.startsWith('/') ? (
                      <Link to={item.href} className={cn("transition-colors duration-300", variant === 'light' ? 'text-gray-600 hover:text-medical-blue' : 'text-trust-gray hover:text-premium-gold')}>
                        {item.name}
                      </Link>
                    ) : (
                      <a href={item.href} className={cn("transition-colors duration-300", variant === 'light' ? 'text-gray-600 hover:text-medical-blue' : 'text-trust-gray hover:text-premium-gold')}>
                        {item.name}
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="hidden md:flex items-center space-x-4 ml-8">
                <ThemeToggle />
                <BrightnessControl />
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    to="/login"
                    className={cn("px-6 py-2 rounded-full font-semibold transition-all duration-300", variant === 'light' ? 'bg-medical-blue text-white hover:bg-opacity-90' : 'bg-premium-gold text-white hover:bg-opacity-90')}
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
            <nav className="flex flex-col items-center space-y-4 pt-4">
              {navItems.map((item) => (
                 item.href.startsWith('/') ? (
                  <Link key={item.name} to={item.href} className={cn("py-2 transition-colors duration-300", variant === 'light' ? 'text-gray-600 hover:text-medical-blue' : 'text-trust-gray hover:text-premium-gold')} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                ) : (
                  <a key={item.name} href={item.href} className={cn("py-2 transition-colors duration-300", variant === 'light' ? 'text-gray-600 hover:text-medical-blue' : 'text-trust-gray hover:text-premium-gold')} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </a>
                )
              ))}
              <Link to="/login" className={cn("w-4/5 text-center px-6 py-3 rounded-full font-semibold transition-all duration-300", variant === 'light' ? 'bg-medical-blue text-white hover:bg-opacity-90' : 'bg-premium-gold text-white hover:bg-opacity-90')} onClick={() => setIsOpen(false)}>
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
