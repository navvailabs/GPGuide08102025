import { useState } from 'react';
import { Menu, X, BriefcaseMedical } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Features', 'Pricing', 'Testimonials'];

  return (
    <header className="sticky top-0 z-50 bg-medical-blue/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <BriefcaseMedical className="h-8 w-8 text-success-green" />
            <span className="text-2xl font-satoshi font-bold text-white">GPGuide</span>
          </motion.div>

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

          <div className="hidden md:flex items-center space-x-4">
             <motion.button 
              className="px-6 py-2 text-white bg-premium-gold rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Login
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-medical-blue pb-4"
        >
          <nav className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-trust-gray hover:text-premium-gold transition-colors duration-300 py-2" onClick={() => setIsOpen(false)}>
                {item}
              </a>
            ))}
            <button className="w-4/5 px-6 py-3 text-white bg-premium-gold rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">
              Login
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
