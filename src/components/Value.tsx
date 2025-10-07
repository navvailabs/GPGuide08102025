import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Value = () => {
    return (
        <section className="py-20 sm:py-24 bg-trust-gray text-gray-800">
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
                            <p className="font-semibold">Average GP hourly rate: <span className="font-bold">$150</span></p>
                            <p className="font-semibold">Time saved with GPGuide: <span className="font-bold">5 hours/week</span></p>
                            <hr className="my-3 border-amber-300" />
                            <p className="text-lg font-bold">Weekly value: <span className="text-success-green">$750</span></p>
                            <p className="text-lg font-bold">GPGuide cost: <span className="text-red-500">$14.99 - $22</span></p>
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
                        <h3 className="text-3xl font-bold text-medical-blue">Stay Ahead of the Curve</h3>
                        <p className="mt-2 text-gray-600">Join the 500+ GPs already transforming their practice efficiency.</p>
                        <p className="mt-4 font-semibold">While other GPs struggle with documentation burden:</p>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll finish notes during lunch breaks.</li>
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll have consistent, professional templates.</li>
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll capture every billing opportunity.</li>
                            <li className="flex items-start"><CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" /> You'll go home to your family on time.</li>
                        </ul>
                    </motion.div>
                </div>
                
                <motion.div 
                    className="mt-16 bg-amber-500/10 border border-amber-500/30 p-6 rounded-lg text-amber-900 flex items-start space-x-4 max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <AlertTriangle className="h-8 w-8 flex-shrink-0 mt-1 text-amber-600"/>
                    <div>
                        <h4 className="font-bold">IMPORTANT: Medical Disclaimer</h4>
                        <p className="text-sm mt-1">GPGuide provides educational templates and clinical decision support tools. All generated content is for educational purposes only and must be reviewed by qualified healthcare professionals. Templates are based on general best practices - always apply professional clinical judgment and refer to official guidelines.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Value;
