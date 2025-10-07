import { motion } from 'framer-motion';
import { BrainCircuit, BarChart3, Share2, Zap, Smartphone, Lock, GraduationCap, CheckCircle } from 'lucide-react';

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
        <section className="py-20 sm:py-24 bg-trust-gray text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-medical-blue">Everything You Need for Practice Excellence</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Comprehensive tools designed specifically for Australian GPs.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {primaryFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <feature.icon className="h-12 w-12 text-medical-blue mb-4" />
                            <h3 className="text-2xl font-bold text-medical-blue">{feature.title}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                            <ul className="mt-6 space-y-3">
                                {feature.points.map(point => (
                                    <li key={point} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-success-green mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{point}</span>
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
                    <h3 className="text-3xl font-bold text-medical-blue mb-8">Transform Your Practice Starting Today</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((item, index) => (
                            <div key={item.title} className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="font-bold text-medical-blue">{item.title}</h4>
                                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
