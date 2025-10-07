import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="relative py-20 sm:py-24 bg-primary-gradient text-white">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-satoshi">Ready to Reclaim Your Time?</h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
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
                        START WEEKLY PLAN - $14.99/week
                    </button>
                    <button className="w-full sm:w-auto text-white border-2 border-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-medical-blue transform transition-all duration-300">
                        CHOOSE PRO PLAN - $22/week
                    </button>
                </motion.div>

                <motion.div
                    className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-300 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Start saving in minutes</div>
                    <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>30-day money-back guarantee</div>
                    <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Cancel anytime</div>
                    <div className="flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Australian-based support</div>
                    <div className="flex items-center justify-center col-span-2 lg:col-span-1"><ShieldCheck className="h-4 w-4 mr-2 text-success-green"/>No patient data stored</div>
                </motion.div>

                <motion.div
                    className="mt-12 text-amber-400 font-semibold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    "Don't let another week pass spending hours on documentation that could take minutes."
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
