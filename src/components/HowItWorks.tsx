import { motion } from 'framer-motion';
import { FileText, Zap, FileCheck2, Download, Clock, Sparkles } from 'lucide-react';
import InspiredCard from './ui/InspiredCard';

const steps = [
    {
        num: '01',
        icon: FileText,
        title: "Enter Clinical Details",
        description: "Input symptoms and conditions. No patient identifiers required."
    },
    {
        num: '02',
        icon: Zap,
        title: "Generate Template Instantly",
        description: "AI creates a comprehensive, evidence-based plan in seconds."
    },
    {
        num: '03',
        icon: FileCheck2,
        title: "Review & Customise",
        description: "Apply your clinical judgment with built-in quality prompts."
    },
    {
        num: '04',
        icon: Download,
        title: "Copy or Export",
        description: "One-click export to all major EMR systems."
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
};

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden py-20 sm:py-24 bg-gray-50 dark:bg-medical-blue">
            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={itemVariants}>
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-gray-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400">From Consultation to Care Plan in Minutes</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-neutral-300 font-body">
                        Professional care plan automation for modern GPs — fast, accurate, guideline-aligned.
                    </p>
                </motion.div>

                <motion.div className="relative mb-20" variants={itemVariants}>
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                        <div className="w-full h-full bg-[repeating-linear-gradient(to_right,theme(colors.cyan.400),theme(colors.cyan.400)_2px,transparent_2px,transparent_10px)] opacity-20 dark:opacity-100"></div>
                        <div className="absolute inset-0 bg-cyan-400/20 blur-sm opacity-20 dark:opacity-100"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <InspiredCard
                                key={step.title}
                                className="relative text-center flex flex-col items-center"
                            >
                                <span className="absolute top-4 left-4 text-lg font-bold text-gray-300 dark:text-white/20">{step.num}</span>
                                <div className="relative mb-4">
                                    <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
                                    <div className="relative w-16 h-16 bg-medical-blue/10 dark:bg-medical-blue/50 border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center">
                                        <step.icon className="w-8 h-8 text-medical-blue dark:text-cyan-300" />
                                    </div>
                                </div>
                                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400">{step.title}</h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm flex-grow">{step.description}</p>
                            </InspiredCard>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={itemVariants}
                >
                    <InspiredCard className="p-8">
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            {/* Traditional Method */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Clock className="w-8 h-8 text-gray-400" />
                                    <h4 className="text-2xl font-bold text-gray-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400">Traditional Method</h4>
                                </div>
                                <p className="text-5xl font-bold text-gray-400">45+ <span className="text-2xl font-medium align-baseline">mins</span></p>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">Manual research, writing, and formatting.</p>
                            </div>

                            {/* GPGuide Method */}
                            <div className="text-center md:border-l border-gray-200 dark:border-white/20 md:pl-8">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Sparkles className="w-8 h-8 text-cyan-400" />
                                    <h4 className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">GPGuide Method</h4>
                                </div>
                                <p className="text-5xl font-bold text-cyan-500 dark:text-cyan-400">6 <span className="text-2xl font-medium align-baseline">mins</span></p>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">Instant generation, quick review, and export.</p>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 text-center">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                Time Saved: <span className="text-gradient-gold">~39 minutes per complex care plan</span>
                            </p>
                        </div>
                    </InspiredCard>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HowItWorks;
