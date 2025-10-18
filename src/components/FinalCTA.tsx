import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import InspiredCard from './ui/InspiredCard';

const FinalCTA = () => {
    return (
        <section className="relative overflow-hidden py-20 sm:py-24 bg-gray-50 dark:bg-medical-blue">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <InspiredCard className="p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-satoshi text-gray-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400">Ready to Reclaim Your Time?</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto">
                            Join 500+ Australian GPs who've already transformed their practice efficiency. Every day without GPGuide is another day lost to unnecessary admin work.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <button className="w-full sm:w-auto text-white bg-gold-gradient font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
                            START ESSENTIAL PLAN - $7.99/week
                        </button>
                        <button className="w-full sm:w-auto text-medical-blue dark:text-white border-2 border-medical-blue dark:border-white font-bold py-4 px-8 rounded-full text-lg hover:bg-medical-blue hover:text-white dark:hover:bg-white dark:hover:text-medical-blue transform transition-all duration-300">
                            CHOOSE PROFESSIONAL PLAN - $14.99/week
                        </button>
                    </motion.div>

                    <motion.div
                        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Start saving in minutes</div>
                        <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Cancel anytime</div>
                        <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Australian-based support</div>
                        <div className="flex items-center justify-center"><ShieldCheck className="h-4 w-4 mr-2 text-success-green"/>No patient data stored</div>
                    </motion.div>

                    <motion.div
                        className="mt-12 text-premium-gold font-semibold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        "Don't let another week pass spending hours on documentation that could take minutes."
                    </motion.div>
                </InspiredCard>
            </div>
        </section>
    );
};

export default FinalCTA;
