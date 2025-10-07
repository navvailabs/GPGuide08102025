import { motion } from 'framer-motion';
import { Stethoscope, Zap, Edit, Download } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        { icon: Stethoscope, title: "Enter Clinical Details", duration: "30 seconds", description: "Input clinical presentation - no patient identifiers required. Secure, HIPAA-compliant platform with voice-to-text support.", timeSaved: "Eliminates 10 minutes of research" },
        { icon: Zap, title: "Generate Template Instantly", duration: "Under 2 minutes", description: "AI creates a comprehensive template based on best practices, referencing current literature and clinical guidelines.", timeSaved: "25 minutes of manual writing eliminated" },
        { icon: Edit, title: "Review & Customize", duration: "3-5 minutes", description: "Apply your professional clinical judgment. Built-in prompts ensure comprehensive coverage.", timeSaved: "15 minutes of formatting and structuring" },
        { icon: Download, title: "Copy or Export", duration: "30 seconds", description: "One-click export to major EMR systems. Professional templates ready for immediate use.", timeSaved: "5 minutes of formatting and copying" },
    ];

    return (
        <section className="py-20 sm:py-24 bg-trust-gray text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-medical-blue">From Consultation to Care Plan in Minutes</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Professional templates without the time burden.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2"></div>
                    <div className="grid md:grid-cols-4 gap-8 md:gap-0">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                className="relative flex flex-col items-center text-center p-4"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-white border-4 border-medical-blue rounded-full shadow-lg">
                                    <step.icon className="w-10 h-10 text-medical-blue" />
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-medical-blue">{step.title}</h3>
                                <span className="text-sm font-semibold text-premium-gold">{step.duration}</span>
                                <p className="mt-2 text-gray-600 text-sm flex-grow">{step.description}</p>
                                <div className="mt-3 text-xs font-semibold text-success-green bg-success-green/10 px-2 py-1 rounded-md">{step.timeSaved}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div 
                    className="mt-20 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-center text-medical-blue">Total Time Savings</h3>
                    <div className="mt-6 grid grid-cols-2 gap-6 items-center">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-red-600">Traditional Method</p>
                            <p className="text-4xl font-bold text-red-500">45+ <span className="text-xl">mins</span></p>
                            <p className="text-sm text-gray-500">❌</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-success-green">GPGuide Method</p>
                            <p className="text-4xl font-bold text-success-green">6 <span className="text-xl">mins</span></p>
                            <p className="text-sm text-gray-500">✅</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center bg-medical-blue text-white p-4 rounded-lg">
                        <p className="font-bold text-lg">Time Saved: 39 minutes per complex care plan</p>
                        <p className="mt-1">Weekly Savings: <strong>5+ hours</strong> for typical GP workload</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
