import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Value = () => {
    return (
        <section className="py-20 sm:py-24 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold text-medical-blue">The Cost of Waiting</h3>
                        <p className="mt-2 text-gray-600">Every day without GPGuide equals hours of unnecessary admin work.</p>
                        <div className="mt-6 bg-amber-100/50 border border-amber-300 rounded-lg p-6">
                            <p className="font-semibold text-gray-800">Average GP hourly rate: <span className="font-bold">$150</span></p>
                            <p className="font-semibold text-gray-800">Time saved with GPGuide: <span className="font-bold">5 hours/week</span></p>
                            <hr className="my-3 border-amber-300" />
                            <p className="text-lg font-bold text-gray-800">Weekly value: <span className="text-success-green">$750</span></p>
                            <p className="text-lg font-bold text-gray-800">GPGuide cost: <span className="text-red-500">$14.99 - $22</span></p>
                            <div className="mt-4 text-center bg-medical-blue text-white py-3 rounded-lg">
                                <p className="text-2xl font-bold">3,400%+ ROI</p>
                                <p className="text-sm">Return on Investment</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-center text-gray-500">Start saving time immediately - no setup required.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Stay Ahead of the Curve</h3>
                        <p className="mt-2 text-neutral-300">Join the 500+ GPs already transforming their practice efficiency.</p>
                        <p className="mt-4 font-semibold text-neutral-300">While other GPs struggle with documentation burden:</p>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll finish notes during lunch breaks.</li>
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll have consistent, professional templates.</li>
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll capture every billing opportunity.</li>
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll go home to your family on time.</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Value;
