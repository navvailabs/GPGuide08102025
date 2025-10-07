import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

const messages = [
  "Dr. Sarah from Melbourne just subscribed to GPGuide Pro",
  "Dr. Michael from Sydney saved 6 hours this week",
  "Brisbane GP practice increased billing by $2,000/month",
  "500+ GPs can't be wrong - join GPGuide today",
];

const SocialProofPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setIsVisible(true);

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(hideTimeout);
    }, 10000); // Show every 10 seconds

    return () => clearInterval(showInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs w-full"
        >
          <div className="flex items-start space-x-3">
            <div className="bg-success-green/10 p-2 rounded-full">
                <Info className="h-5 w-5 text-success-green" />
            </div>
            <p className="text-sm text-gray-700 flex-1">{messages[messageIndex]}</p>
            <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofPopup;
