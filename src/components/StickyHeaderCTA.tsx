import { motion } from 'framer-motion';

const StickyHeaderCTA = () => {
    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-40 bg-medical-blue/90 backdrop-blur-md shadow-lg"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <p className="text-white font-semibold hidden md:block">
                    Ready to save <span className="text-premium-gold">5+ hours</span> weekly?
                </p>
                <p className="text-white font-semibold md:hidden">
                    Save <span className="text-premium-gold">5+ hours</span> weekly
                </p>
                <div className="flex items-center space-x-3">
                    <button className="bg-premium-gold text-white font-bold py-2 px-4 rounded-full text-sm hover:scale-105 transition-transform">
                        Start Weekly Plan
                    </button>
                    <button className="border-2 border-white text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-white hover:text-medical-blue transition-colors">
                        Choose Pro Plan
                    </button>
                    <span className="text-xs text-gray-300 hidden sm:block">30-day guarantee</span>
                </div>
            </div>
        </motion.div>
    );
};

export default StickyHeaderCTA;
