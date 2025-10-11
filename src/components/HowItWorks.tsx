import { motion } from 'framer-motion';
import { FileText, Zap, FileCheck2, Download, Clock, CheckCircle, Sparkles } from 'lucide-react';
import SectionGradientBackground from './ui/SectionGradientBackground';

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
        <section className="relative overflow-hidden py-20 sm:py-24">
            <SectionGradientBackground />
            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={itemVariants}>
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-white">From Consultation to Care Plan in Minutes</h2>
                    <p className="mt-4 text-lg text-gray-300 font-body">
                        Professional care plan automation for modern GPs — fast, accurate, guideline-aligned.
                    </p>
                </motion.div>

                <motion.div className="relative mb-20" variants={itemVariants}>
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                        <div className="w-full h-full bg-[repeating-linear-gradient(to_right,theme(colors.cyan.400),theme(colors.cyan.400)_2px,transparent_2px,transparent_10px)]"></div>
                        <div className="absolute inset-0 bg-cyan-400/20 blur-sm"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                className="relative glass-card p-6 text-center flex flex-col items-center"
                                whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                            >
                                <span className="absolute top-4 left-4 text-lg font-bold text-white/20">{step.num}</span>
                                <div className="relative mb-4">
                                    <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
                                    <div className="relative w-16 h-16 bg-medical-blue/50 border border-white/20 rounded-full flex items-center justify-center">
                                        <step.icon className="w-8 h-8 text-cyan-300" />
                                    </div>
                                </div>
                                <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
                                <p className="mt-2 text-gray-400 text-sm flex-grow">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto glass-card p-6 sm:p-8"
                    variants={itemVariants}
                >
                    <div className="grid sm:grid-cols-2 gap-6 items-center">
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-3">
                                <Clock className="w-7 h-7 text-pain-red" />
                                <h4 className="text-xl font-bold text-white">Traditional Method</h4>
                            </div>
                            <p className="text-4xl sm:text-5xl font-bold text-pain-red my-2">45+ <span className="text-2xl font-medium">mins</span></p>
                            <p className="text-gray-400">Manual research, writing, and formatting.</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-3">
                                <Sparkles className="w-7 h-7 text-success-green" />
                                <h4 className="text-xl font-bold text-white">GPGuide Method</h4>
                            </div>
                            <p className="text-4xl sm:text-5xl font-bold text-success-green my-2">6 <span className="text-2xl font-medium">mins</span></p>
                            <p className="text-gray-400">Instant generation, quick review, and export.</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-2xl font-bold text-white">
                            Time Saved: <span className="text-gradient-gold">~39 minutes per complex care plan</span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HowItWorks;
