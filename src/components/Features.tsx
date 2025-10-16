import { motion } from 'framer-motion';
import { BrainCircuit, BarChart3, Share2, CheckCircle } from 'lucide-react';

const Features = () => {
    const primaryFeatures = [
        {
            icon: BrainCircuit,
            title: "Intelligent Template Generation",
            description: "AI-powered care plan creation based on clinical presentation.",
            points: ["Evidence-based recommendations", "Specialty-specific adaptations", "Continuous learning from medical literature", "No patient data storage required", "Voice-to-text input support"]
        },
        {
            icon: BarChart3,
            title: "Practice Efficiency Analytics",
            description: "Track your productivity gains and optimize workflows.",
            points: ["Time savings metrics & ROI calculations", "Documentation quality insights", "Practice efficiency recommendations", "Team performance tracking (Pro plan)", "Billing opportunity identification"]
        },
        {
            icon: Share2,
            title: "Universal EMR Integration",
            description: "Works with all major Australian EMR systems.",
            points: ["Copy-paste functionality", "Direct export capabilities", "Mobile app synchronization", "Offline template generation", "Multi-device access"]
        }
    ];

    const achievements = [
        { title: "Save Hours of Admin", description: "Spend less time on repetitive paperwork and more on patient care and family." },
        { title: "Learn While You Work", description: "Build clinical and documentation skills with step-by-step guidance." },
        { title: "Guideline-Aligned Plans", description: "Create compliant plans with peace of mind from structured best practices." },
        { title: "Improve Team Collaboration", description: "Standardize documentation across your practice with clear, structured plans." }
    ];

    return (
        <section className="py-20 sm:py-24 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Everything You Need for Practice Excellence</h2>
                    <p className="mt-4 text-lg text-neutral-300">
                        Comprehensive tools designed specifically for Australian GPs.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {primaryFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="glass-card p-8 flex flex-col h-full"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative w-16 h-16 bg-medical-blue/50 border border-white/20 rounded-full flex items-center justify-center mb-6">
                                <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-md animate-pulse"></div>
                                <feature.icon className="relative w-8 h-8 text-cyan-300" />
                            </div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">{feature.title}</h3>
                            <p className="mt-2 text-gray-300 flex-grow">{feature.description}</p>
                            <ul className="mt-6 space-y-4">
                                {feature.points.map(point => (
                                    <li key={point} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Transform Your Practice Starting Today</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((item) => (
                            <div key={item.title} className="glass-card p-6 text-center">
                                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
