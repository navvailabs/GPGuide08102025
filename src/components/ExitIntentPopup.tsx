import { motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface ExitIntentPopupProps {
  onClose: () => void;
}

const ExitIntentPopup = ({ onClose }: ExitIntentPopupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>
        
        <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-medical-blue font-satoshi">Wait! Before You Go...</h2>
        <p className="mt-2 text-gray-600">Are you sure you want to continue spending hours on documentation?</p>
        
        <div className="mt-6 bg-amber-100/50 border border-amber-300 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-medical-blue">Special Offer</h3>
            <p className="text-gray-700">Get your first week of GPGuide for just <span className="text-premium-gold font-bold text-2xl">$9.99</span></p>
            <p className="text-sm text-gray-600">(Save $5 on Weekly Plan or $12 on Pro Plan)</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="w-full text-white bg-gold-gradient font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
                Try Weekly for $9.99
            </button>
            <button className="w-full text-medical-blue border-2 border-medical-blue font-bold py-3 px-6 rounded-full text-lg hover:bg-medical-blue hover:text-white transform transition-all duration-300">
                Try Pro for $9.99
            </button>
        </div>
        <p className="mt-4 text-xs text-gray-500">Regular pricing applies after first week. Offer valid for new subscribers only. Cancel anytime.</p>
      </motion.div>
    </motion.div>
  );
};

export default ExitIntentPopup;
